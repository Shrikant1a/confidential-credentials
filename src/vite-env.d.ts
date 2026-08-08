/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK_ID?: string;
  readonly VITE_CONTRACT_ADDRESS?: string;
  readonly VITE_RPC_URL?: string;
  readonly VITE_INDEXER_URL?: string;
  readonly VITE_PROVING_SERVER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
