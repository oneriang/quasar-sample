const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
      , { name: 'page2', path: '/page2', component: () => import('pages/IndexPage2.vue') }
      , { name: 'page3', path: '/page3', component: () => import('pages/IndexPage3.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
