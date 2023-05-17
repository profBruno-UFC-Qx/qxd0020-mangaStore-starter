<script setup lang="ts">
import { ref } from 'vue'
import { api } from './baseConfig'
import MangaCard from './components/MangaCard.vue'

const mangas = ref()
const response = await api.get('/mangas')
mangas.value = response.data.data; 

</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="manga in mangas">
          <MangaCard :title="manga.title" :price="manga.price" :number="manga.number"></MangaCard> 
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
