import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from '@/store';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Login.vue'),
    beforeEnter(to, from, next) {
      if (store.state.token) {
        next('/app');
      }

      next();
    }
  },
  {
    path: '/app',
    component: () => import('@/views/Tasks.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      store.commit('LOGOUT');
      next('/');
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
