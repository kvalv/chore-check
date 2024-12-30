/// <reference types="vite/client" />

interface ImportMetaEnv {
  // postgres database for direct connections
  readonly ZERO_UPSTREAM_DB: string;

  // jwt token creation (in functions)
  readonly ZERO_AUTH_SECRET: string;

  // endpoint to get user information given a JWT from cloudflare.
  readonly CF_USER_IDENTITY_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
