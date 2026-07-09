import { NextRequest, NextResponse } from 'next/server';
import { createMessageTable, getMessages, insertMessage, Env } from '../../../lib/database';

export const runtime = 'edge';

export async function GET(request: NextRequest, { env }: { env: Env }) {
  try {
    await createMessageTable(env.DB);
    const messages = await getMessages(env.DB);
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { env }: { env: Env }) {
  try {
    await createMessageTable(env.DB);
    const { content } = await request.json();
    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }
    const newMessage = await insertMessage(env.DB, content);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}