import { createRouter, createWebHistory } from 'vue-router'
// import TokenService from '../helper'
import ViewLogin from '@/modules/login/router';
import ViewHome from '@/modules/home/router';
import ViewDemo from '@/modules/demo/router';
import ViewCounter from '@/modules/counter/router';

const routes = [
  { path: "/:pathMatch(.*)", redirect: "/" },
  ...ViewLogin,
  ...ViewHome,
  ...ViewDemo,
  ...ViewCounter
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // const metaAuth = to.meta.auth
  // const token = TokenService.getToken()

  // if (metaAuth && !token) {
  //   return next({ name: 'login' })
  // }

  // if (to.name === 'login' && token) {
  //   return next({ name: 'demo' })
  // }

  return next()
})

router.afterEach((to) => {
  document.title = to.meta.title;
});
export default router;
