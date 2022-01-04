/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '../components/home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
