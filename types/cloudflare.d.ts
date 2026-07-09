interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: any;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

declare global {
  interface Env {
    DB_BINDING: D1Database;
  }

  interface CloudflareEnv {
    DB_BINDING: D1Database;
  }
}