export type LayerId = 'ui' | 'api' | 'data' | 'realtime' | 'ai' | 'infra';

export interface Layer {
    id: LayerId;
    /** Short label used on chips, bars and plates. */
    short: string;
    name: string;
    /** What I actually do at this layer. */
    role: string;
    tools: string[];
    /** One step of the seat-booking walkthrough. */
    step: string;
    file: string;
    lang: 'ts' | 'yaml';
    code: string;
}

/** Ordered the way a request travels: click → API → database → broadcast → agent → container. */
export const LAYERS: Layer[] = [
    {
        id: 'ui',
        short: 'UI',
        name: 'Interface',
        role: 'Component systems, responsive layouts and optimistic UI that feels instant. I care about the pixel, the loading state and the keyboard user.',
        tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HLS.js', 'Video.js'],
        step: 'A student taps a free seat. The UI updates optimistically and rolls back if the server says no.',
        file: 'web/components/SeatPicker.tsx',
        lang: 'ts',
        code: `export function SeatPicker({ seats }: { seats: Seat[] }) {
  const book = useBookSeat(); // optimistic mutation + rollback

  return (
    <div className="grid grid-cols-8 gap-2">
      {seats.map((seat) => (
        <button
          key={seat.id}
          disabled={seat.status !== "FREE" || book.isPending}
          onClick={() => book.mutate(seat.id)}
          className={seatStyles[seat.status]}
        >
          {seat.label}
        </button>
      ))}
    </div>
  );
}`,
    },
    {
        id: 'api',
        short: 'API',
        name: 'API & Services',
        role: 'REST APIs with real auth, RBAC and validation at the edge. Clear service boundaries, background jobs for anything slow.',
        tools: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'JWT', 'BullMQ', 'Zod'],
        step: 'The request is authenticated, role-checked and scoped to the student’s library before any logic runs.',
        file: 'api/routes/seats.routes.ts',
        lang: 'ts',
        code: `router.post(
  "/seats/:seatId/book",
  requireAuth,              // verify the JWT
  requireRole("student"),   // RBAC
  withTenant,               // scope every query to this library
  async (req, res) => {
    const { seatId } = SeatParams.parse(req.params);
    const booking = await seats.book(req.tenant.id, req.user.id, seatId);

    res.status(201).json(booking);
  },
);`,
    },
    {
        id: 'data',
        short: 'Data',
        name: 'Data',
        role: 'Relational models that match the business, tenant isolation, indexes that earn their keep and transactions where money or seats are involved.',
        tools: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'MariaDB'],
        step: 'One conditional update inside a transaction — two students can never grab the same seat.',
        file: 'api/services/seats.service.ts',
        lang: 'ts',
        code: `export async function book(tenantId: string, userId: string, seatId: string) {
  const booking = await prisma.$transaction(async (tx) => {
    // conditional update: safe even under concurrent requests
    const { count } = await tx.seat.updateMany({
      where: { id: seatId, tenantId, status: "FREE" },
      data: { status: "BOOKED" },
    });
    if (count === 0) throw new ConflictError("Seat already taken");

    return tx.booking.create({ data: { seatId, userId, tenantId } });
  });

  events.emit("seat.booked", { tenantId, seatId }); // only after commit
  return booking;
}`,
    },
    {
        id: 'realtime',
        short: 'Realtime',
        name: 'Realtime & Media',
        role: 'WebSockets, WebRTC and video pipelines — the parts of a product that have to feel live. Signalling, rooms, transcoding and adaptive streaming.',
        tools: ['Socket.io', 'WebRTC', 'FFmpeg', 'HLS', 'SRS'],
        step: 'Every open seat map in that library updates instantly — no refresh, no polling.',
        file: 'api/realtime/seats.gateway.ts',
        lang: 'ts',
        code: `io.on("connection", (socket) => {
  const { tenantId } = socket.data.user;
  socket.join(\`library:\${tenantId}\`);
});

events.on("seat.booked", ({ tenantId, seatId }) => {
  // push the change to everyone looking at this library
  io.to(\`library:\${tenantId}\`).emit("seat:update", {
    seatId,
    status: "BOOKED",
  });
});`,
    },
    {
        id: 'ai',
        short: 'AI',
        name: 'AI Features',
        role: 'LLM features that do real work: tool calling, structured output and agents that go through the same business rules as everyone else.',
        tools: ['Gemini API', 'LangChain', 'LangGraph', 'PyTorch', 'Tool calling'],
        step: 'The library assistant can book a seat too — it calls the same service, so the same rules and RBAC apply.',
        file: 'api/agent/tools.ts',
        lang: 'ts',
        code: `export const bookSeatTool = {
  name: "book_seat",
  description: "Book a free study seat for the current student.",
  parameters: {
    type: "object",
    properties: { seatId: { type: "string" } },
    required: ["seatId"],
  },
};

// the agent reuses the real service — no shortcuts around the rules
export async function runTool(call: ToolCall, ctx: AgentContext) {
  if (call.name === "book_seat") {
    return seats.book(ctx.tenantId, ctx.userId, call.args.seatId);
  }
}`,
    },
    {
        id: 'infra',
        short: 'Infra',
        name: 'Infra & Delivery',
        role: 'Containers, CI pipelines, VPS deploys and CDNs — with an eye on the cloud bill. If I build it, I can also ship and run it.',
        tools: ['Docker', 'GitHub Actions', 'Linux / VPS', 'Bunny.net CDN', 'AWS · GCP · Azure'],
        step: 'Web, API, Postgres and Redis ship together as containers through a CI pipeline.',
        file: 'docker-compose.yml',
        lang: 'yaml',
        code: `services:
  web:
    build: ./web
    ports: ["3000:3000"]
  api:
    build: ./api
    env_file: .env
    depends_on: [postgres, redis]
    ports: ["4000:4000"]
  postgres:
    image: postgres:16
    volumes: ["pgdata:/var/lib/postgresql/data"]
  redis:
    image: redis:7-alpine

volumes:
  pgdata:`,
    },
];

export const LAYER_BY_ID = Object.fromEntries(LAYERS.map((layer) => [layer.id, layer])) as Record<LayerId, Layer>;
