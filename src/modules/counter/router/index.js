export default [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/layouts/MainLayout.vue"),
    children: [
      {
        path: "/counter",
        name: "counter",
        meta: { title: "counter", auth: true },
        component: () =>
          import(/* webpackChunkName: "Counter" */ "@/modules/counter/ViewCounter.vue"),
      },
    ],
  },
];