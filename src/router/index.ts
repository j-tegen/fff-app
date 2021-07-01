import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Start from '../views/Start.vue';
import GameView from '@/views/GameView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/game/:id',
    name: 'GameView',
    component: GameView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
