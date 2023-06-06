<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { MangaCollection } from '../types'
import { RouteLocationNormalized, onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useMangaService } from '../api/mangaService'
import MangaCard from '../components/MangaCard.vue'
import LoadingContainer from '../components/LoadingContainer.vue'
import { useErrorUtil } from '../composables/useApplicationError'

const mangaService = useMangaService()
const mangaCollection = ref({} as MangaCollection)
const loading = ref(true)
const mangas = computed(() => mangaCollection.value.items)
const pagination = computed(() => mangaCollection.value.pagination)


const route = useRoute()
const currentPage = route.query.page ? Number(route.query.page) : 1

onMounted(async () => {
  const result = await mangaService.get(currentPage)
  if(!useErrorUtil().isAppError(result)) {
    mangaCollection.value = result
  }
  loading.value = false
})

onBeforeRouteUpdate(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.query.page && to.query.page != from.query.page) {
    const page = Number(to.query.page)
    const result = await mangaService.get(page)
    if(!useErrorUtil().isAppError(result)) {
      mangaCollection.value = result
    }
  }
})

</script>

<template>
  <LoadingContainer :loading="loading">
    <div class="album py-5 bg-body-tertiary">
     <div class="container">
      
         <div class="row">
           <nav aria-label="Page navigation">
             <ul class="pagination justify-content-center">
               <li class="page-item">
                 <router-link class="page-link" aria-label="Previous" :class="{disabled: pagination.page == 1}" :to="{ path: $route.path, query: { page: pagination.page - 1 }}">
                   <span aria-hidden="true">&laquo;</span>
                 </router-link>
               </li>
               <li class="page-item" v-for="pageNumber in pagination.pageCount" :key="pageNumber">
                 <router-link
                   class="page-link" 
                   :class="{ active: pagination.page == pageNumber}" 
                   :to="{ path: $route.path, query: { page: pageNumber }}">{{ pageNumber }}
                 </router-link>
               </li>
   
               <li class="page-item">
                 <router-link class="page-link" aria-label="Next" :class="{disabled: pagination.page == pagination.pageCount}" :to="{ path: $route.path, query: { page: pagination.page + 1 }}">
                   <span aria-hidden="true">&raquo;</span>
                 </router-link>
               </li>
             </ul>
           </nav>
         </div>
   
         <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
           <div class="col" v-for="manga in mangas">
             <MangaCard :id="manga.id" :title="manga.title" :price="manga.price" :number="manga.number" :cover="manga.cover"></MangaCard> 
           </div>
         </div>
 
     </div>
   </div>
  </LoadingContainer>
</template>