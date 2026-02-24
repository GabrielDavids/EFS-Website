import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// Temporary script to fetch logo base64 during build
async function getLogo() {
  const fileId = '1gZB4JHxdY5-5EvFY1qO9a3pk35NSAfjj';
  const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      console.log('---LOGO_START---');
      console.log(`data:${res.headers.get('content-type') || 'image/png'};base64,${base64}`);
      console.log('---LOGO_END---');
    } else {
      console.log('---LOGO_FAILED---', res.status);
    }
  } catch (e) {
    console.log('---LOGO_ERROR---', e);
  }
}
getLogo();

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
