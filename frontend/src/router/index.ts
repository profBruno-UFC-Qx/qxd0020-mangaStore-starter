import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MangaInDetails from '../pages/MangaInDetails.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import Login from '../pages/Login.vue'
import AdminHome from '../pages/AdminHome.vue'

const routes: RouteRecordRaw[] = [
  { path: "/", alias: "/mangas", component: Home },
  { path: "/mangas/:id", component: MangaInDetails, props: true },
  { path: "/error", name: "error", component: ErrorPage, props: route => ({ status: route.query.status, msg: route.query.msg }) },
  { path: "/login", component: Login },
  { path: "/admin", component: AdminHome, meta: { permissions: ['admin'] } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to: RouteLocationNormalized, _) => {
  console.log(localStorage.getItem("username"))
  console.log(localStorage.getItem("role"))
  console.log(localStorage.getItem("token"))
  const isAuthenticated = localStorage.getItem("token")
  const isAdmin = localStorage.getItem("role") == "admin"
  if (to.meta.permissions) {
    if (!isAuthenticated) {
      return { path: "/login" }
    } else {
      if(!isAdmin) {
        return { path: "/" }
      }
    }
  }
})

