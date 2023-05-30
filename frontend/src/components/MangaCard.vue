<script setup lang="ts">
import { Manga } from '@types'
import { useUploadFile } from '../composables/useUploadURL'
const manga = defineProps<Omit<Manga, "comments">>()


</script>

<template>
  <router-link :to="`/mangas/${manga.id}`">
  <div class="card shadow-sm">
    <figure>
      <img class="cover" :src="useUploadFile(cover.url)">
    </figure>
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-text">Volume: {{ number }}</p>
      <p class="card-text">Price: {{ price }}</p>
    </div>
  </div>
</router-link>
</template>

<style scoped>
a {
  text-decoration: none;
}

figure {
  background-color: #1abc9c;
}
img.cover {
  width: 100%;
  filter: sepia(0%);
  transition: 0.3s ease-in-out;
}
img.cover:hover {
  filter: sepia(100%);
}
</style>