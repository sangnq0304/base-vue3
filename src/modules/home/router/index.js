export default [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: { title: "Home", auth: true },
        component: () =>
          import(/* webpackChunkName: "ViewHome" */ "@/modules/home/ViewHome.vue"),
      },
    ],
  },
];