import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/github-copilot-for-msa/',
  plugins: [react()]
});
