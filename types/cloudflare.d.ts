interface D1Database extends Omit<D1Database, 'batch'> {
  batch: <T = unknown>(statements: D1PreparedStatement[]) => Promise<Array<D1Result<T>>>;
}

declare global {
  interface Env {
    DB: D1Database;
  }

  var D1Database: { // eslint-disable-line no-var
    prototype: D1Database;
    new(): D1Database;
  };
}