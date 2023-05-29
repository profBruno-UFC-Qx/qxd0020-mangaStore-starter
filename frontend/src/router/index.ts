import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MangaInDetails from '../pages/MangaInDetails.vue'
import ErrorPage from '../pages/ErrorPage.vue'

const routes: RouteRecordRaw[] = [
  { path: "/",  alias:"/mangas", component: Home},
  { path: "/mangas/:id", component: MangaInDetails, props: true},
  { path: "/error", component: ErrorPage},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage }
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})