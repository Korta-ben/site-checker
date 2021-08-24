import { createApp } from 'vue';
import App from './App.vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/tailwind.css';

const app = createApp(App);
app.use(VueLoading, {
  lockScroll: true,
  color: 'green',
});
app.mount('#app');
