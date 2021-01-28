import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueClickAway from "vue3-click-away";
import './index.css';

createApp(App)
   .use(router)
   .use(store)
   .use(VueClickAway)
   .mount('#app');
