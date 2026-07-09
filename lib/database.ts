
export interface Env {
  DB: D1Database;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
}

export async function createMessageTable(db: D1Database) {
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    )`
  ).run();
}

export async function insertMessage(db: D1Database, content: string): Promise<Message> {
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  await db.prepare("INSERT INTO messages (id, content, timestamp) VALUES (?, ?, ?)")
    .bind(id, content, timestamp)
    .run();
  return { id, content, timestamp };
}

export async function getMessages(db: D1Database): Promise<Message[]> {
  const { results } = await db.prepare("SELECT * FROM messages ORDER BY timestamp ASC").all<Message>();
  return results || [];
}
