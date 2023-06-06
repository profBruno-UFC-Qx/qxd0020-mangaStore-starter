import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MangaInDetails from '../pages/MangaInDetails.vue'
import ErrorPage from '../pages/ErrorPage.vue'
import Login from '../pages/Login.vue'
import AdminHome from '../pages/AdminHome.vue'
import MangaForm from '../pages/MangaForm.vue'
import { useUserStore } from '../stores/userStore'

const routes: RouteRecordRaw[] = [
  { path: "/", alias: "/mangas", component: Home },
  { path: "/mangas/:id", component: MangaInDetails, props: true },
  { path: "/error", name: "error", component: ErrorPage, props: route => ({ status: route.query.status, msg: route.query.msg }) },
  { path: "/login", component: Login },
  { path: "/admin", component: AdminHome, meta: { permissions: ['admin'] } },
  { path: "/mangas/:id/edit", component: MangaForm, meta: { permissions: ['admin'] } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to: RouteLocationNormalized, _) => {

  const userStore = useUserStore()

  if (to.meta.permissions) {
    if (!userStore.isAuthenticated) {
      return { path: "/login" }
    } else {
      if(!userStore.isAdmin) {
        return { path: "/" }
      }
    }
  }
})

