import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80
  },
  prodServer: {
    port: 80
  },
  plugins: [
    vueJsx(),
    Vue(), Pages(), Layouts(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@service': fileURLToPath(new URL('./src/service', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),

    }
  }
})
