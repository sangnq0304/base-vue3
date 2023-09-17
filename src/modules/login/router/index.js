export default [
  {
    path: "/login",
    name: "login",
    meta: { title: "Login", auth: false },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/modules/login/ViewLogin.vue"),
  }
];