export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: (resolve: any) => require(['../views/index/index.vue'], resolve),
    name: 'index',
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/screen',
    component: (resolve: any) => require(['../views/screen/screen.vue'], resolve),
    name: 'screen',
    meta: {
      keepAlive: false,
    },
  },
  {
    path: '/preview',
    component: (resolve: any) => require(['../views/preview/preview.vue'], resolve),
    name: 'preview',
    meta: {
      keepAlive: false,
    },
  },
];

