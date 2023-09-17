export default [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/demo",
        name: "demo",
        meta: { title: "demo", auth: true },
        component: () =>
          import(/* webpackChunkName: "ViewDemo" */ "@/modules/demo/ViewDemo.vue"),
      },
    ],
  },
];