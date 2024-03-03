import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 配置loading
import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

// 显示loading
Loading.show({
  spinner: QSpinnerGears,
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// 这里设置为 async
export default route(async function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  // 1.先识别所有的pages/文件夹下*.vue文件
  // 这里限制性很高，只有路径为/pages/*.vue，的文件才能背识别，如果不在这个结构，自己增加吧，然后再合并
  const pages = import.meta.glob('../pages/*.vue');

  // 本地模拟调用服务器api
  async function callGetConfigApi() {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const data = [
            { "path": "/page4", "page": "pages/IndexPage4.vue" }
          , { "path": "/page5", "page": "pages/IndexPage5.vue" }
          , { "path": "/page6", "page": "pages/IndexPage6.vue" }
          , { "path": "/page7", "page": "pages/IndexPage7.vue" }
        ];
        console.log(data);
        for(const d of data) {
          routes[0].children.push({ path: `/${d.path}`, component: pages[`../${d.page}`] });
        }
        resolve('ok')
      }, 1000) // 模拟 1 秒钟的延迟
    })
  }
  await callGetConfigApi();

  // 实际调用服务器端的代码
  // await api.get('http://api-url/config/')
  //     .then((response) => {
  //       console.log(response);
  //       const data = response.data;
  //       for(const d of data) {
  //         routes[0].children.push({ path: `/${d.path}`, component: pages[`../${d.page}`] });
  //       }
  //     })
  //     .catch(() => {
  //       $q.notify({
  //         color: 'negative',
  //         position: 'top',
  //         message: 'Loading failed',
  //         icon: 'report_problem'
  //       })
  //     })

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // 隐藏loading
  Loading.hide()

  return Router
})
