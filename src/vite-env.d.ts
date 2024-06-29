/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_PASSPORT_CONTRACT_ADDRESS: string;
  readonly APP_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
