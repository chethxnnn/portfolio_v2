import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': fileURLToPath(new URL('./src/mock-lucide.jsx', import.meta.url))
    }
  }
});
