<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMangaService, MangaCollection } from '../api/mangaService'
import MangaCard from '../components/MangaCard.vue'

const mangaService = useMangaService()
const mangaCollection = ref({} as MangaCollection)
const mangas = computed(() => mangaCollection.value.items)

onMounted(async () => {
  mangaCollection.value = await mangaService.get()
})
</script>

<template>
   <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="manga in mangas">
          <MangaCard :title="manga.title" :price="manga.price" :number="manga.number" :cover="manga.cover"></MangaCard> 
        </div>

      </div>
    </div>
  </div>
</template>