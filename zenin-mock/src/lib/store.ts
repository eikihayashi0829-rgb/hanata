/**
 * Live store of repair cases received via LINE webhook.
 *
 * MVP-α: in-memory module-scoped Map. Survives within a single Node
 * process. On Vercel serverless this means each function instance has
 * its own copy — sufficient for demos and small-scale pitches but NOT
 * for production. Upgrade path: Vercel KV / Upstash Redis / Postgres.
 */

export type LiveRepair = {
  id: string;
  source: "line";
  userId: string;
  userName?: string;
  receivedAt: string;
  initialMessage?: string;
  hasPhoto: boolean;
  diagnosis?: {
    device: string;
    symptom: string;
    urgency: "高" | "中" | "低";
    cause: string;
  };
  status: "受付" | "AI判定中" | "判定完了" | "業者調整中" | "承認待ち";
  conversation: {
    from: "tenant" | "ai";
    kind: "text" | "image" | "card";
    text?: string;
    at: string;
  }[];
};

declare global {
  // eslint-disable-next-line no-var
  var __zeninStore: Map<string, LiveRepair> | undefined;
}

const store: Map<string, LiveRepair> = globalThis.__zeninStore ?? new Map();
if (process.env.NODE_ENV !== "production") {
  globalThis.__zeninStore = store;
}

export function upsertRepair(r: LiveRepair) {
  store.set(r.id, r);
}

export function getRepair(id: string) {
  return store.get(id);
}

export function listRepairs(): LiveRepair[] {
  return Array.from(store.values()).sort((a, b) => (a.receivedAt < b.receivedAt ? 1 : -1));
}

export function appendConversation(
  id: string,
  msg: LiveRepair["conversation"][number],
) {
  const r = store.get(id);
  if (!r) return;
  r.conversation.push(msg);
  store.set(id, r);
}
