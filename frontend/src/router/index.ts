import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MangaInDetails from '../pages/MangaInDetails.vue'

const routes: RouteRecordRaw[] = [
  { path: "/",  component: Home},
  { path: "/mangas/:id", component: MangaInDetails, props: true}
]

export const router = createRouter({
  routes,
  history: createWebHistory()
})