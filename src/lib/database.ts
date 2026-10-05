export type D1Result<T> = { results: T[]; success: boolean; meta?: Record<string, unknown> };

export interface D1DatabaseLike {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T>(): Promise<D1Result<T>>;
      first<T>(): Promise<T | null>;
      run(): Promise<{ success: boolean; meta?: Record<string, unknown> }>;
    };
    all<T>(): Promise<D1Result<T>>;
    first<T>(): Promise<T | null>;
    run(): Promise<{ success: boolean; meta?: Record<string, unknown> }>;
  };
}

export type AppEnv = { DB?: D1DatabaseLike };

export function requireDatabase(env: AppEnv): D1DatabaseLike {
  if (!env.DB) {
    throw new Error(
      "Banco D1 não configurado. Crie o banco no Cloudflare e configure o binding DB.",
    );
  }
  return env.DB;
}
