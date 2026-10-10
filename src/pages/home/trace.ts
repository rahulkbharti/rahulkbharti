import type { LayerId } from '../../data/layers';

/**
 * The seat-booking request the hero follows: one span per hop, timed like a real trace.
 * `node` names the node in the system graph the packet visits to open that span.
 */
export interface TraceSpan {
    node: string;
    service: string;
    op: string;
    layer: LayerId;
    /** Offset from the start of the request, in ms. */
    start: number;
    ms: number;
}

export const TRACE_TOTAL_MS = 24;

export const TRACE: TraceSpan[] = [
    { node: 'gateway', service: 'gateway', op: 'route · rate limit', layer: 'api', start: 0, ms: 24 },
    { node: 'auth', service: 'auth', op: 'verify JWT · RBAC', layer: 'api', start: 1.2, ms: 2.4 },
    { node: 'seats', service: 'seats', op: 'seats.book()', layer: 'api', start: 3.8, ms: 16.6 },
    { node: 'postgres', service: 'postgres', op: 'UPDATE seat · COMMIT', layer: 'data', start: 4.6, ms: 9.8 },
    { node: 'redis', service: 'redis', op: 'DEL seatmap:{tenant}', layer: 'data', start: 14.8, ms: 1.1 },
    { node: 'notify', service: 'notify', op: 'emit seat.booked', layer: 'realtime', start: 16.4, ms: 3.2 },
];

/** The packet's route through the graph: down to the database and back out to the client. */
export const TRACE_ROUTE = ['web', 'gateway', 'auth', 'gateway', 'seats', 'postgres', 'seats', 'redis', 'notify', 'gateway', 'web'];

/**
 * Progress through the trace: 0 while the request is on its way in, n once span n has opened,
 * TRACE_DONE once the response is back at the client.
 */
export const TRACE_DONE = TRACE.length + 1;
