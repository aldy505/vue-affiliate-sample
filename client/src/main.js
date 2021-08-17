import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import 'virtual:windi.css';
import '@fontsource/atkinson-hyperlegible';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: () => import('./pages/index.vue')},
    {path: '/register', component: () => import('./pages/register.vue')},
    {path: '/users', component: () => import('./pages/users.vue')},
  ],
});

createApp(App).use(router).mount('#app');
