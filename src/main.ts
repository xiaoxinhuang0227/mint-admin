import { createApp } from 'vue';
import App from '@/App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import './permission.ts';
import '@/styles/index.scss';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
  
// 本地SVG图标
import "virtual:svg-icons-register";

import "uno.css";
const setupAll = async () => {
  const app = createApp(App);

  setupRouter(app);
  setupStore(app);
  app.mount('#app');
}

setupAll();
