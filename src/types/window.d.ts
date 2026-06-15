declare global {
  interface Window {
    __BACKEND_URL__?: string | undefined;
  }
}

export {};
