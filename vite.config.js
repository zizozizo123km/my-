import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup path alias for absolute imports starting with @/
      // This is crucial for maintaining clean imports in a large e-commerce project.
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    // Standard port for development server
    port: 3000,
    // Automatically open the browser on server start
    open: true,
    // Enable strict host checking (good practice)
    host: true,
  },
  build: {
    // Ensure modern JS features are utilized
    target: 'es2020',
    // Generate source maps for easier debugging in production builds
    sourcemap: true,
    // Configure chunking strategy for better performance (optional, but good practice)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group large dependencies like React and ReactDOM separately
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor_react';
            }
            // Group other node modules into a general vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
});