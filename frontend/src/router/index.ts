import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MangaInDetails from '../pages/MangaInDetails.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import Login from '../pages/Login.vue'
import AdminHome from '../pages/AdminHome.vue'

const routes: RouteRecordRaw[] = [
  { path: "/",  alias:"/mangas", component: Home},
  { path: "/mangas/:id", component: MangaInDetails, props: true},
  { path: "/error", component: ErrorPage, props: true },
  { path: "/login", component: Login},
  { path: "/admin", component: AdminHome, meta: { permissions: ['admin']}},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to: RouteLocationNormalized, _) => {
  if(to.meta.permissions) {
    router.replace("/login")
  }
})