/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({ eslintOptions: { cache: false } }),
    tsconfigPaths(),
  ],
});
