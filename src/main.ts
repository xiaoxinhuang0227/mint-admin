import { createApp } from 'vue';
import App from '@/App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import './permission.ts';
import '@/styles/index.scss';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
  
// 本地SVG图标
import "virtual:svg-icons-register";

import "uno.css";
const setupAll = async () => {
  const app = createApp(App);
  app.use(ElementPlus, {
    locale: zhCn,
  })
  setupRouter(app);
  setupStore(app);
  app.mount('#app');
}

setupAll();
