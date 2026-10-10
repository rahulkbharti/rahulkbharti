import type { LayerId } from '../../data/layers';
import { TRACE, TRACE_DONE, TRACE_ROUTE } from './trace';

/*
 * The hero backdrop: a small production system drawn in 3D on a 2D canvas.
 * No WebGL — a few hundred projected points a frame, so it stays cheap on any device.
 *
 * World space: y is up, the system's vertical axis is the origin. Tiers run the way a
 * request travels — clients → gateway → services → data stores → workers.
 */

type Vec3 = [number, number, number];
type Kind = 'client' | 'gateway' | 'service' | 'store' | 'worker';

interface GraphNode {
    id: string;
    tech: string;
    kind: Kind;
    layer: LayerId;
    pos: Vec3;
}

const onRing = (radius: number, y: number, degrees: number): Vec3 => {
    const a = (degrees * Math.PI) / 180;
    return [Math.cos(a) * radius, y, Math.sin(a) * radius];
};

const NODES: GraphNode[] = [
    { id: 'web', tech: 'React · Next.js', kind: 'client', layer: 'ui', pos: [-66, 165, 0] },
    { id: 'mobile', tech: 'Android', kind: 'client', layer: 'ui', pos: [66, 165, 0] },
    { id: 'gateway', tech: 'Express · rate limits', kind: 'gateway', layer: 'api', pos: [0, 90, 0] },
    { id: 'auth', tech: 'JWT · RBAC', kind: 'service', layer: 'api', pos: onRing(200, 0, -30) },
    { id: 'seats', tech: 'Node · Prisma', kind: 'service', layer: 'api', pos: onRing(200, 0, 40) },
    { id: 'notify', tech: 'Socket.io', kind: 'service', layer: 'realtime', pos: onRing(200, 0, 110) },
    { id: 'media', tech: 'FFmpeg · HLS', kind: 'service', layer: 'realtime', pos: onRing(200, 0, 185) },
    { id: 'agent', tech: 'LangGraph · Gemini', kind: 'service', layer: 'ai', pos: onRing(200, 0, 260) },
    { id: 'postgres', tech: 'PostgreSQL', kind: 'store', layer: 'data', pos: onRing(135, -85, 20) },
    { id: 'redis', tech: 'cache · pub/sub', kind: 'store', layer: 'data', pos: onRing(135, -85, 85) },
    { id: 'queue', tech: 'BullMQ', kind: 'store', layer: 'api', pos: onRing(135, -85, 170) },
    { id: 'cdn', tech: 'object store · CDN', kind: 'store', layer: 'infra', pos: onRing(135, -85, 250) },
    { id: 'transcode', tech: 'Docker worker', kind: 'worker', layer: 'infra', pos: onRing(90, -160, 130) },
    { id: 'mailer', tech: 'Docker worker', kind: 'worker', layer: 'infra', pos: onRing(90, -160, 310) },
];

const LINKS: [string, string][] = [
    ['web', 'gateway'],
    ['mobile', 'gateway'],
    ['gateway', 'auth'],
    ['gateway', 'seats'],
    ['gateway', 'notify'],
    ['gateway', 'media'],
    ['gateway', 'agent'],
    ['auth', 'redis'],
    ['seats', 'postgres'],
    ['seats', 'redis'],
    ['seats', 'queue'],
    ['notify', 'redis'],
    ['media', 'queue'],
    ['media', 'cdn'],
    ['agent', 'postgres'],
    ['queue', 'transcode'],
    ['queue', 'mailer'],
    ['transcode', 'cdn'],
];

const TOKENS = [
    'GET /v1/seats',
    '201 Created',
    'SELECT … FOR UPDATE',
    'BEGIN',
    'COMMIT',
    'Bearer eyJhbGciOi…',
    'redis.del()',
    "emit('seat.booked')",
    '{ tenantId }',
    'await tx.seat.update()',
    'queue.add()',
    'docker compose up',
    'prisma.$transaction',
    '304 Not Modified',
    'Idempotency-Key',
    '429 Too Many Requests',
    'EXPLAIN ANALYZE',
    'CREATE INDEX',
    'JOIN tenants',
    'res.status(201)',
    'cache hit',
    'z.object({ … })',
    'ON CONFLICT DO NOTHING',
    'ffmpeg -i input.mp4',
    'X-Request-Id',
    'HLS · 1080p',
];

/* Meshes ------------------------------------------------------------------- */

interface MeshEdge {
    a: number;
    b: number;
    faces: number[];
    /** Between two curved side faces: drawn only where it forms the silhouette. */
    seam: boolean;
}

interface Mesh {
    verts: Vec3[];
    faces: number[][];
    edges: MeshEdge[];
    /** Draw a ring halfway up the curved sides — the platter line of a database drum. */
    platter: boolean;
    /** How far the shape reaches from its centre on screen, for labels and hit tests. */
    reach: number;
}

function createMesh(verts: Vec3[], faces: number[][], curved: boolean[] = [], reach = 14): Mesh {
    const byKey = new Map<string, MeshEdge>();
    faces.forEach((face, f) => {
        face.forEach((a, i) => {
            const b = face[(i + 1) % face.length];
            const key = a < b ? `${a}-${b}` : `${b}-${a}`;
            const edge = byKey.get(key) ?? { a, b, faces: [], seam: false };
            edge.faces.push(f);
            byKey.set(key, edge);
        });
    });
    const edges = [...byKey.values()];
    for (const edge of edges) edge.seam = edge.faces.every((f) => curved[f]);
    return { verts, faces, edges, platter: curved.length > 0, reach };
}

function box(hx: number, hy: number, hz: number, reach: number) {
    const verts: Vec3[] = [];
    for (let i = 0; i < 8; i++) verts.push([i & 1 ? hx : -hx, i & 2 ? hy : -hy, i & 4 ? hz : -hz]);
    const faces = [
        [1, 3, 7, 5],
        [0, 2, 6, 4],
        [2, 3, 7, 6],
        [0, 1, 5, 4],
        [4, 5, 7, 6],
        [0, 1, 3, 2],
    ];
    return createMesh(verts, faces, [], reach);
}

function octahedron(r: number) {
    const verts: Vec3[] = [
        [r, 0, 0],
        [-r, 0, 0],
        [0, r, 0],
        [0, -r, 0],
        [0, 0, r],
        [0, 0, -r],
    ];
    const faces: number[][] = [];
    for (const x of [0, 1]) for (const y of [2, 3]) for (const z of [4, 5]) faces.push([x, y, z]);
    return createMesh(verts, faces, [], r);
}

function drum(r: number, h: number, sides: number) {
    const verts: Vec3[] = [];
    for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        verts.push([Math.cos(a) * r, -h, Math.sin(a) * r]);
    }
    for (let i = 0; i < sides; i++) verts.push([verts[i][0], h, verts[i][2]]);

    const faces: number[][] = [];
    for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides;
        faces.push([i, j, sides + j, sides + i]);
    }
    const ring = Array.from({ length: sides }, (_, i) => i);
    faces.push(ring.map((i) => sides + i), ring);
    return createMesh(verts, faces, faces.map((_, f) => f < sides), r + 2);
}

const MESHES: Record<Kind, Mesh> = {
    client: box(13, 9, 2.5, 13),
    gateway: octahedron(22),
    service: box(13, 13, 13, 17),
    store: drum(14, 12, 14),
    worker: box(8, 8, 8, 11),
};

const MAX_VERTS = Math.max(...Object.values(MESHES).map((mesh) => mesh.verts.length));
const MAX_FACES = Math.max(...Object.values(MESHES).map((mesh) => mesh.faces.length));

/* Graph lookups ------------------------------------------------------------ */

function indexOf(id: string) {
    const index = NODES.findIndex((node) => node.id === id);
    if (index < 0) throw new Error(`Unknown node "${id}"`);
    return index;
}

const EDGES = LINKS.map(([a, b]) => [indexOf(a), indexOf(b)] as const);
const EDGE_LENGTH = EDGES.map(([a, b]) => Math.hypot(...NODES[a].pos.map((v, i) => v - NODES[b].pos[i])));
const ADJACENT = NODES.map((_, n) => EDGES.flatMap(([a, b], e) => (a === n || b === n ? [e] : [])));

function edgeBetween(a: number, b: number) {
    const index = EDGES.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));
    if (index < 0) throw new Error(`No link between "${NODES[a].id}" and "${NODES[b].id}"`);
    return index;
}

const ROUTE = TRACE_ROUTE.map(indexOf);
const ROUTE_EDGES = ROUTE.slice(1).map((node, i) => edgeBetween(ROUTE[i], node));
/** Which trace span opens when the featured packet reaches a node. */
const SPAN_AT = new Map(TRACE.map((span, row) => [indexOf(span.node), row]));

/* Camera & timing ---------------------------------------------------------- */

/** Camera distance, and the focal length — so one world unit is one pixel at the origin. */
const CAM = 1000;
/** Turns the seat-booking path (auth → seats → postgres → redis → notify) toward the viewer. */
const BASE_YAW = -2.27;
const BASE_PITCH = 0.28;
/** Labels sit on the outer side of each node (as seen from the resting camera), so they rarely cross a link. */
const LABEL_SIDE = NODES.map(({ pos: [x, , z] }) => (x * Math.cos(BASE_YAW) - z * Math.sin(BASE_YAW) < -10 ? -1 : 1));
/** Room the graph needs, labels included, at scale 1. */
const SCENE_W = 600;
const SCENE_H = 390;
const SEGMENT_S = 0.55;
const HOLD_S = 2.6;
const CYCLE_S = ROUTE_EDGES.length * SEGMENT_S + HOLD_S;
const FIRST_DELAY_S = 1.3;
const PULSE_S = 0.9;

const LIGHT: Vec3 = (() => {
    const v: Vec3 = [-0.45, 0.8, -0.5];
    const length = Math.hypot(...v);
    return [v[0] / length, v[1] / length, v[2] / length];
})();

const GRID_Y = -205;
const GRID_HALF = 378;
const GRID_STEP = 54;
const GRID_DIV = 12;
const GRID_LEVELS = 6;

/** Floor-grid segments grouped by brightness; the grid fades out radially from the centre. */
const GRID: number[][] = (() => {
    const levels: number[][] = Array.from({ length: GRID_LEVELS }, () => []);
    const step = (GRID_HALF * 2) / GRID_DIV;
    for (let line = -GRID_HALF; line <= GRID_HALF; line += GRID_STEP) {
        for (let i = 0; i < GRID_DIV; i++) {
            const from = -GRID_HALF + i * step;
            const to = from + step;
            const r = Math.hypot(line, from + step / 2) / GRID_HALF;
            if (r >= 1) continue;
            const level = Math.floor((1 - r) ** 1.4 * GRID_LEVELS);
            if (level === 0) continue;
            // Each segment is stored twice: once along x, once along z.
            levels[level].push(from, line, to, line, line, from, line, to);
        }
    }
    return levels;
})();

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const depthFade = (cz: number) => 1 - 0.55 * clamp01((cz + 200) / 400);

/* Scene -------------------------------------------------------------------- */

export interface SceneOptions {
    canvas: HTMLCanvasElement;
    /** The empty box in the layout the system is centred on; it also takes hover and clicks. */
    stage: HTMLElement;
    reducedMotion: boolean;
    getScroll: () => number;
    getFocus: () => string | null;
    onFocus: (id: string | null) => void;
    onStep: (step: number) => void;
    onPick: (layer: LayerId) => void;
}

export interface SystemScene {
    refreshTheme: () => void;
    invalidate: () => void;
    destroy: () => void;
}

interface Packet {
    edge: number;
    t: number;
    dir: 1 | -1;
    speed: number;
}

interface Token {
    x: number;
    y: number;
    depth: number;
    text: string;
    font: string;
}

export function createSystemScene(options: SceneOptions): SystemScene {
    const { canvas, stage, reducedMotion } = options;
    const context = canvas.getContext('2d');
    if (!context) return { refreshTheme() {}, invalidate() {}, destroy() {} };
    const ctx = context;

    // Layout, in CSS pixels.
    let width = 0;
    let height = 0;
    let dpr = 1;
    let ox = 0;
    let oy = 0;
    let baseScale = 1;
    let scale = 1;

    // Camera.
    let cosY = 1;
    let sinY = 0;
    let cosP = 1;
    let sinP = 0;

    // Theme.
    let ink = '#141414';
    let dark = false;
    const colors = {} as Record<LayerId, string>;

    // Time & input.
    let time = 0;
    let lastFrame = 0;
    let raf = 0;
    let visible = true;
    let destroyed = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let local: { x: number; y: number } | null = null;
    let hovered = -1;
    let focusDim = 0;

    // Per-node state.
    const world = new Float64Array(NODES.length * 3);
    const proj = new Float64Array(NODES.length * 6);
    const lift = new Float64Array(NODES.length);
    const order = NODES.map((_, i) => i);
    const labelShown = new Float64Array(NODES.length).fill(1);
    const labelWidth: number[] = [];
    const placed: number[] = [];
    const verts = new Float64Array(MAX_VERTS * 6);
    const faceVisible = new Uint8Array(MAX_FACES);
    const scratch = new Float64Array(6);

    // Traffic.
    const compact = () => width < 640;
    let packets: Packet[] = [];
    let tokens: Token[] = [];
    const pulses: { node: number; at: number }[] = [];
    const featured = { cycle: -1, arrived: 0, segment: -1, u: 0 };
    let step = -1;

    function setStep(next: number) {
        if (next === step) return;
        step = next;
        options.onStep(next);
    }

    /** World → camera space → screen. Writes cx, cy, cz, sx, sy, k into `out` at `o`. */
    function project(x: number, y: number, z: number, out: Float64Array, o: number) {
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const cy = y * cosP + z1 * sinP;
        const cz = -y * sinP + z1 * cosP;
        const k = CAM / (cz + CAM);
        out[o] = x1;
        out[o + 1] = cy;
        out[o + 2] = cz;
        out[o + 3] = ox + x1 * k * scale;
        out[o + 4] = oy - cy * k * scale;
        out[o + 5] = k;
    }

    function randomToken(y: number): Token {
        const depth = Math.random();
        return {
            x: Math.random() * width,
            y,
            depth,
            text: TOKENS[Math.floor(Math.random() * TOKENS.length)],
            font: `${(10 + depth * 3).toFixed(1)}px "Geist Mono", ui-monospace, monospace`,
        };
    }

    function seedTraffic() {
        packets = Array.from({ length: compact() ? 8 : 13 }, () => ({
            edge: Math.floor(Math.random() * EDGES.length),
            t: Math.random(),
            dir: Math.random() < 0.5 ? 1 : -1,
            speed: 85 + Math.random() * 70,
        }));
        tokens = Array.from({ length: compact() ? 11 : 22 }, () => randomToken(Math.random() * height));
    }

    function measure() {
        if (destroyed) return;
        const box = canvas.getBoundingClientRect();
        const target = stage.getBoundingClientRect();
        if (!box.width || !box.height) return;
        const resized = Math.abs(box.width - width) > 1 || Math.abs(box.height - height) > 1;

        width = box.width;
        height = box.height;
        dpr = Math.min(window.devicePixelRatio || 1, compact() ? 1.5 : 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ox = target.left - box.left + target.width / 2;
        oy = target.top - box.top + target.height / 2;
        // Labels may spill a little past the stage, but never off the canvas.
        const room = Math.min(width - 24, target.width + 80);
        baseScale = Math.min(Math.max(Math.min(room / SCENE_W, target.height / SCENE_H), 0.45), 1.3);

        labelWidth.length = 0; // fonts may have loaded since the last measure
        if (resized || !tokens.length) seedTraffic();
        invalidate();
    }

    function refreshTheme() {
        const style = getComputedStyle(document.documentElement);
        const read = (name: string) => style.getPropertyValue(name).trim();
        ink = read('--ink') || ink;
        dark = document.documentElement.dataset.theme === 'dark';
        for (const id of ['ui', 'api', 'data', 'realtime', 'ai', 'infra'] as LayerId[]) colors[id] = read(`--l-${id}`);
        invalidate();
    }

    /* Simulation ------------------------------------------------------------ */

    function advancePackets(dt: number) {
        for (const packet of packets) {
            packet.t += (packet.dir * packet.speed * dt) / EDGE_LENGTH[packet.edge];
            if (packet.t >= 0 && packet.t <= 1) continue;

            const [a, b] = EDGES[packet.edge];
            const node = packet.dir > 0 ? b : a;
            const exits = ADJACENT[node].filter((e) => e !== packet.edge);
            const next = exits.length ? exits[Math.floor(Math.random() * exits.length)] : packet.edge;
            packet.edge = next;
            packet.dir = EDGES[next][0] === node ? 1 : -1;
            packet.t = packet.dir > 0 ? 0 : 1;
        }
    }

    function advanceFeatured() {
        const elapsed = time - FIRST_DELAY_S;
        if (elapsed < 0) return;

        const cycle = Math.floor(elapsed / CYCLE_S);
        const t = elapsed - cycle * CYCLE_S;
        if (cycle !== featured.cycle) {
            featured.cycle = cycle;
            featured.arrived = 0;
            setStep(0);
        }

        const segment = Math.floor(t / SEGMENT_S);
        const arrived = Math.min(segment, ROUTE_EDGES.length) + 1;
        for (let i = featured.arrived; i < arrived; i++) {
            const node = ROUTE[i];
            if (i > 0) pulses.push({ node, at: time });
            const row = SPAN_AT.get(node);
            if (row !== undefined && row + 1 > step) setStep(row + 1);
            if (i === ROUTE.length - 1) setStep(TRACE_DONE);
        }
        featured.arrived = arrived;
        featured.segment = segment < ROUTE_EDGES.length ? segment : -1;
        featured.u = ease(clamp01(t / SEGMENT_S - segment));
    }

    /* Drawing --------------------------------------------------------------- */

    function drawGrid() {
        const peak = dark ? 0.11 : 0.13;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1;
        for (let level = 1; level < GRID_LEVELS; level++) {
            const segments = GRID[level];
            if (!segments.length) continue;
            ctx.globalAlpha = (peak * level) / (GRID_LEVELS - 1);
            ctx.beginPath();
            for (let i = 0; i < segments.length; i += 4) {
                project(segments[i], GRID_Y, segments[i + 1], scratch, 0);
                if (scratch[5] <= 0) continue;
                ctx.moveTo(scratch[3], scratch[4]);
                project(segments[i + 2], GRID_Y, segments[i + 3], scratch, 0);
                ctx.lineTo(scratch[3], scratch[4]);
            }
            ctx.stroke();
        }
    }

    function drawTokens(dt: number, scroll: number) {
        ctx.fillStyle = ink;
        ctx.textBaseline = 'middle';
        for (const token of tokens) {
            token.y -= (5 + token.depth * 14) * dt;
            if (token.y < -24) Object.assign(token, randomToken(height + 24));

            const x = token.x + pointer.x * (4 + token.depth * 22);
            const y = token.y + pointer.y * (3 + token.depth * 12) - scroll * height * (0.12 + token.depth * 0.4);
            // Quiet inside the graph (so labels stay legible) and over the copy; brightest in a band around it.
            const d = Math.hypot((x - ox) / (SCENE_W * 0.5 * scale), (y - oy) / (SCENE_H * 0.5 * scale));
            const spotlight = d < 1.05 ? 0.2 + 0.8 * clamp01((d - 0.8) / 0.25) : 0.1 + 0.9 * clamp01(1 - (d - 1.25) / 0.85);
            const edgeFade = clamp01(token.y / 80) * clamp01((height - token.y) / 80);
            ctx.globalAlpha = (0.06 + token.depth * (dark ? 0.18 : 0.22)) * spotlight * edgeFade;
            ctx.font = token.font;
            ctx.fillText(token.text, x, y);
        }
    }

    function isLit(node: number, focus: number) {
        return focus < 0 || node === focus || ADJACENT[focus].some((e) => EDGES[e][0] === node || EDGES[e][1] === node);
    }

    function drawEdges(focus: number) {
        const base = dark ? 0.2 : 0.17;
        ctx.lineWidth = 1;
        ctx.strokeStyle = ink;
        for (let e = 0; e < EDGES.length; e++) {
            const [a, b] = EDGES[e];
            const fade = (depthFade(proj[a * 6 + 2]) + depthFade(proj[b * 6 + 2])) / 2;
            const lit = focus >= 0 && (a === focus || b === focus);
            ctx.globalAlpha = base * fade * (lit ? 0 : 1 - focusDim * 0.6);
            ctx.beginPath();
            ctx.moveTo(proj[a * 6 + 3], proj[a * 6 + 4]);
            ctx.lineTo(proj[b * 6 + 3], proj[b * 6 + 4]);
            ctx.stroke();
        }

        // Links of the focused node carry a moving dash, like data on the wire.
        if (focus < 0) return;
        ctx.save();
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 5]);
        ctx.lineDashOffset = -time * 24;
        ctx.strokeStyle = colors[NODES[focus].layer];
        for (const e of ADJACENT[focus]) {
            const [a, b] = EDGES[e];
            const [from, to] = a === focus ? [a, b] : [b, a];
            ctx.globalAlpha = 0.75 * focusDim * depthFade(proj[to * 6 + 2]);
            ctx.beginPath();
            ctx.moveTo(proj[from * 6 + 3], proj[from * 6 + 4]);
            ctx.lineTo(proj[to * 6 + 3], proj[to * 6 + 4]);
            ctx.stroke();
        }
        ctx.restore();
    }

    /** Projects a point part-way along an edge (between the nodes' current positions) into `scratch`. */
    function along(edge: number, t: number) {
        const [a, b] = EDGES[edge];
        const ax = world[a * 3];
        const ay = world[a * 3 + 1];
        const az = world[a * 3 + 2];
        project(
            ax + (world[b * 3] - ax) * t,
            ay + (world[b * 3 + 1] - ay) * t,
            az + (world[b * 3 + 2] - az) * t,
            scratch,
            0,
        );
    }

    function drawPacket(edge: number, t: number, dir: number, color: string, size: number, trail: number, alpha: number) {
        const tail = clamp01(t - dir * trail);
        along(edge, tail);
        const tx = scratch[3];
        const ty = scratch[4];
        along(edge, t);
        const fade = depthFade(scratch[2]) * alpha;
        const r = size * scratch[5] * scale;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = r * 0.9;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.35 * fade;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(scratch[3], scratch[4]);
        ctx.stroke();

        ctx.globalAlpha = fade;
        ctx.beginPath();
        ctx.arc(scratch[3], scratch[4], r, 0, Math.PI * 2);
        ctx.fill();
        return fade;
    }

    function drawTraffic(focus: number) {
        for (const packet of packets) {
            const [a, b] = EDGES[packet.edge];
            const target = packet.dir > 0 ? b : a;
            const dim = isLit(a, focus) && isLit(b, focus) ? 1 : 1 - focusDim * 0.7;
            drawPacket(packet.edge, clamp01(packet.t), packet.dir, colors[NODES[target].layer], 1.7, 0.2, 0.85 * dim);
        }

        if (featured.segment < 0) return;
        const edge = ROUTE_EDGES[featured.segment];
        const from = ROUTE[featured.segment];
        const to = ROUTE[featured.segment + 1];
        const dir = EDGES[edge][0] === from ? 1 : -1;
        const t = dir > 0 ? featured.u : 1 - featured.u;
        const color = colors[NODES[to].layer];

        // Light up the wire the request is on.
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.moveTo(proj[from * 6 + 3], proj[from * 6 + 4]);
        ctx.lineTo(proj[to * 6 + 3], proj[to * 6 + 4]);
        ctx.stroke();

        const fade = drawPacket(edge, t, dir, color, 3.4, 0.38, 1);
        ctx.globalAlpha = 0.18 * fade;
        ctx.beginPath();
        ctx.arc(scratch[3], scratch[4], 10 * scratch[5] * scale, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawPulses() {
        for (let i = pulses.length - 1; i >= 0; i--) {
            const p = (time - pulses[i].at) / PULSE_S;
            if (p >= 1) {
                pulses.splice(i, 1);
                continue;
            }
            const node = pulses[i].node;
            const k = proj[node * 6 + 5] * scale;
            ctx.strokeStyle = colors[NODES[node].layer];
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = (1 - p) * 0.6;
            ctx.beginPath();
            ctx.arc(proj[node * 6 + 3], proj[node * 6 + 4], (MESHES[NODES[node].kind].reach + 4 + p * 26) * k, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function drawNode(n: number, focus: number) {
        const node = NODES[n];
        const mesh = MESHES[node.kind];
        const color = colors[node.layer];
        const pop = 1 + lift[n] * 0.2;
        const spin = node.kind === 'gateway' ? time * 0.45 : 0;
        const cs = Math.cos(spin);
        const sn = Math.sin(spin);
        const wx = world[n * 3];
        const wy = world[n * 3 + 1];
        const wz = world[n * 3 + 2];
        const ccx = proj[n * 6];
        const ccy = proj[n * 6 + 1];
        const ccz = proj[n * 6 + 2];
        const fade = depthFade(ccz) * (isLit(n, focus) ? 1 : 1 - focusDim * 0.55);

        for (let v = 0; v < mesh.verts.length; v++) {
            const [lx, ly, lz] = mesh.verts[v];
            project(wx + (lx * cs - lz * sn) * pop, wy + ly * pop, wz + (lx * sn + lz * cs) * pop, verts, v * 6);
        }

        // Halo behind a focused node.
        if (lift[n] > 0.01) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.14 * lift[n];
            ctx.beginPath();
            ctx.arc(proj[n * 6 + 3], proj[n * 6 + 4], (mesh.reach + 16) * proj[n * 6 + 5] * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        // Faces: back-face culled (the shapes are convex), shaded by a fixed light.
        ctx.fillStyle = color;
        for (let f = 0; f < mesh.faces.length; f++) {
            const face = mesh.faces[f];
            let cx = 0;
            let cy = 0;
            let cz = 0;
            for (const v of face) {
                cx += verts[v * 6];
                cy += verts[v * 6 + 1];
                cz += verts[v * 6 + 2];
            }
            cx /= face.length;
            cy /= face.length;
            cz /= face.length;
            const nx = cx - ccx;
            const ny = cy - ccy;
            const nz = cz - ccz;
            const facing = nx * cx + ny * cy + nz * (cz + CAM) < 0;
            faceVisible[f] = facing ? 1 : 0;
            if (!facing) continue;

            const light = Math.max(0, (nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]) / (Math.hypot(nx, ny, nz) || 1));
            ctx.globalAlpha = fade * ((dark ? 0.12 : 0.1) + light * (dark ? 0.26 : 0.22) + lift[n] * 0.12);
            ctx.beginPath();
            ctx.moveTo(verts[face[0] * 6 + 3], verts[face[0] * 6 + 4]);
            for (let i = 1; i < face.length; i++) ctx.lineTo(verts[face[i] * 6 + 3], verts[face[i] * 6 + 4]);
            ctx.closePath();
            ctx.fill();
        }

        // Edges of visible faces; curved seams only on the silhouette.
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 + lift[n] * 0.6;
        ctx.lineJoin = 'round';
        ctx.globalAlpha = fade * (0.72 + lift[n] * 0.28);
        ctx.beginPath();
        for (const edge of mesh.edges) {
            let shown = 0;
            for (const f of edge.faces) shown += faceVisible[f];
            if (edge.seam ? shown !== 1 : shown === 0) continue;
            ctx.moveTo(verts[edge.a * 6 + 3], verts[edge.a * 6 + 4]);
            ctx.lineTo(verts[edge.b * 6 + 3], verts[edge.b * 6 + 4]);
        }
        if (mesh.platter) {
            const half = mesh.verts.length / 2;
            for (let f = 0; f < half; f++) {
                if (!faceVisible[f]) continue;
                const [a, b, c, d] = mesh.faces[f];
                ctx.moveTo((verts[a * 6 + 3] + verts[d * 6 + 3]) / 2, (verts[a * 6 + 4] + verts[d * 6 + 4]) / 2);
                ctx.lineTo((verts[b * 6 + 3] + verts[c * 6 + 3]) / 2, (verts[b * 6 + 4] + verts[c * 6 + 4]) / 2);
            }
        }
        ctx.stroke();
    }

    /**
     * Node names; the focused node also shows what it runs. Labels are placed front to back
     * and any that would overlap one already placed fades out until there is room again.
     */
    function drawLabels(focus: number, settle: number) {
        const labelX = (n: number) =>
            proj[n * 6 + 3] + LABEL_SIDE[n] * (MESHES[NODES[n].kind].reach + 7) * proj[n * 6 + 5] * scale;
        ctx.textBaseline = 'middle';
        ctx.font = '500 11px "Geist Mono", ui-monospace, monospace';
        ctx.fillStyle = ink;
        if (!labelWidth.length) for (const node of NODES) labelWidth.push(ctx.measureText(node.id).width);

        placed.length = 0;
        for (let i = -1; i < NODES.length; i++) {
            // The focused node claims its spot first; the rest go nearest first.
            const n = i < 0 ? focus : order[NODES.length - 1 - i];
            if (n < 0 || (i >= 0 && n === focus)) continue;

            const x = labelX(n);
            const y = proj[n * 6 + 4];
            const left = LABEL_SIDE[n] < 0 ? x - labelWidth[n] : x;
            const right = LABEL_SIDE[n] < 0 ? x : x + labelWidth[n];
            const bottom = y + (n === focus ? 16 : 7);
            let clear = true;
            for (let b = 0; b < placed.length && clear; b += 4) {
                clear = right + 4 < placed[b] || left - 4 > placed[b + 2] || bottom < placed[b + 1] || y - 8 > placed[b + 3];
            }
            if (clear) placed.push(left, y - 8, right, bottom);
            labelShown[n] += ((clear ? 1 : 0) - labelShown[n]) * settle;

            const fade = depthFade(proj[n * 6 + 2]) * (isLit(n, focus) ? 1 : 1 - focusDim * 0.6);
            ctx.textAlign = LABEL_SIDE[n] < 0 ? 'right' : 'left';
            ctx.globalAlpha = fade * (0.62 + lift[n] * 0.38) * labelShown[n];
            ctx.fillText(NODES[n].id, x, y - lift[n] * 6);
        }

        ctx.font = '10.5px "Geist Mono", ui-monospace, monospace';
        for (let n = 0; n < NODES.length; n++) {
            if (lift[n] < 0.01) continue;
            ctx.textAlign = LABEL_SIDE[n] < 0 ? 'right' : 'left';
            ctx.fillStyle = colors[NODES[n].layer];
            ctx.globalAlpha = lift[n];
            ctx.fillText(NODES[n].tech, labelX(n), proj[n * 6 + 4] + 8);
        }
        ctx.textAlign = 'left';
    }

    function hitTest(x: number, y: number) {
        let best = -1;
        let bestDistance = Infinity;
        for (let n = 0; n < NODES.length; n++) {
            const k = proj[n * 6 + 5] * scale;
            const distance = Math.hypot(x - proj[n * 6 + 3], y - proj[n * 6 + 4]);
            if (distance < (MESHES[NODES[n].kind].reach + 12) * k && distance < bestDistance) {
                best = n;
                bestDistance = distance;
            }
        }
        return best;
    }

    function render(dt: number) {
        const scroll = reducedMotion ? 0 : options.getScroll();
        const follow = Math.min(1, dt * 2.5);
        pointer.x += (pointer.tx - pointer.x) * follow;
        pointer.y += (pointer.ty - pointer.y) * follow;

        const yaw = BASE_YAW + (reducedMotion ? 0 : Math.sin(time * 0.11) * 0.38 + pointer.x * 0.28);
        const pitch = BASE_PITCH + (reducedMotion ? 0 : pointer.y * 0.08 + scroll * 0.4);
        cosY = Math.cos(yaw);
        sinY = Math.sin(yaw);
        cosP = Math.cos(pitch);
        sinP = Math.sin(pitch);
        scale = baseScale * (1 + scroll * 0.12);

        if (!reducedMotion) {
            advancePackets(dt);
            advanceFeatured();
        }

        for (let n = 0; n < NODES.length; n++) {
            const [x, y, z] = NODES[n].pos;
            world[n * 3] = x;
            world[n * 3 + 1] = y + (reducedMotion ? 0 : Math.sin(time * 0.9 + n * 1.7) * 3);
            world[n * 3 + 2] = z;
            project(x, world[n * 3 + 1], z, proj, n * 6);
        }

        // Hover comes from the canvas itself or from the trace card; both write the shared focus.
        if (local) {
            const hit = hitTest(local.x, local.y);
            if (hit !== hovered) {
                hovered = hit;
                stage.style.cursor = hit >= 0 ? 'pointer' : '';
                options.onFocus(hit >= 0 ? NODES[hit].id : null);
            }
        }
        const focusId = options.getFocus();
        const focus = focusId ? NODES.findIndex((node) => node.id === focusId) : -1;
        const settle = reducedMotion ? 1 : Math.min(1, dt * 10);
        focusDim += ((focus >= 0 ? 1 : 0) - focusDim) * settle;
        for (let n = 0; n < NODES.length; n++) lift[n] += ((n === focus ? 1 : 0) - lift[n]) * settle;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        drawGrid();
        drawTokens(reducedMotion ? 0 : dt, scroll);
        drawEdges(focus);
        drawTraffic(focus);
        order.sort((a, b) => proj[b * 6 + 2] - proj[a * 6 + 2]);
        for (const n of order) drawNode(n, focus);
        drawPulses();
        drawLabels(focus, reducedMotion ? 1 : Math.min(1, dt * 6));
        ctx.globalAlpha = 1;
    }

    /* Loop & events --------------------------------------------------------- */

    function frame(now: number) {
        raf = 0;
        const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
        lastFrame = now;
        if (!reducedMotion) time += dt;
        render(dt);
        if (!reducedMotion && visible) raf = requestAnimationFrame(frame);
    }

    function invalidate() {
        if (!raf && !destroyed && (visible || reducedMotion)) {
            lastFrame = 0;
            raf = requestAnimationFrame(frame);
        }
    }

    const toLocal = (event: PointerEvent | MouseEvent) => {
        const box = canvas.getBoundingClientRect();
        return { x: event.clientX - box.left, y: event.clientY - box.top };
    };

    const onWindowPointer = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onStagePointer = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        local = toLocal(event);
        invalidate();
    };
    const onStageLeave = () => {
        local = null;
        if (hovered >= 0) {
            hovered = -1;
            stage.style.cursor = '';
            options.onFocus(null);
        }
        invalidate();
    };
    const onStageClick = (event: MouseEvent) => {
        const { x, y } = toLocal(event);
        const hit = hitTest(x, y);
        if (hit >= 0) options.onPick(NODES[hit].layer);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(canvas);
    resizeObserver.observe(stage);
    const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) invalidate();
    });
    visibility.observe(canvas);
    if (!reducedMotion) window.addEventListener('pointermove', onWindowPointer, { passive: true });
    stage.addEventListener('pointermove', onStagePointer);
    stage.addEventListener('pointerleave', onStageLeave);
    stage.addEventListener('click', onStageClick);
    document.fonts?.ready.then(measure);

    refreshTheme();
    measure();
    if (reducedMotion) setStep(TRACE_DONE);

    return {
        refreshTheme,
        invalidate,
        destroy() {
            destroyed = true;
            cancelAnimationFrame(raf);
            raf = 0;
            resizeObserver.disconnect();
            visibility.disconnect();
            window.removeEventListener('pointermove', onWindowPointer);
            stage.removeEventListener('pointermove', onStagePointer);
            stage.removeEventListener('pointerleave', onStageLeave);
            stage.removeEventListener('click', onStageClick);
            stage.style.cursor = '';
        },
    };
}
