import { NextRequest, NextResponse } from 'next/server';
import { createMessageTable, getMessages, insertMessage } from '../../../lib/database';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = 'edge';

export async function GET() {
  const { env } = getCloudflareContext() as unknown as { env: { DB_BINDING: D1Database } };
  const db = env.DB_BINDING;

  try {
    await createMessageTable(db);
    const messages = await getMessages(db);
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { env } = getCloudflareContext() as unknown as { env: { DB_BINDING: D1Database } };
  const db = env.DB_BINDING;

  try {
    await createMessageTable(db);
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }
    const newMessage = await insertMessage(db, content);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create message:", error);
    return NextResponse.json({ error: error.message || "Failed to create message" }, { status: 500 });
  }
}