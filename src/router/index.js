import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo from '@/test/Demo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'demo',
    component: Demo,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
