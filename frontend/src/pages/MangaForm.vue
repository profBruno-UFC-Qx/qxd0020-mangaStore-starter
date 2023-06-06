<script setup lang="ts">
import { ref } from 'vue'
import { Manga } from '../types'
import { useUploadFile } from '../composables/useUploadURL'

const props = defineProps<{
  id?: string
}>()

const manga = ref<Manga>({} as Manga)

</script>

<template>
  <div class="text-center" v-if="!manga.id && props.id">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <template v-else>
    <img class="col-auto" v-if="manga.cover" :src="useUploadFile(manga.cover.url)" />
    <div class="row text-start">
      <div class="col-12 mb-3">
        <label for="coverInput" class="form-label">Manga cover</label>
        <input type="file" id="coverInput" accept="image/*" class="form-control">
      </div>
      <div class="col-12 mb-3">
        <label for="titleInput" class="form-label">Manga title</label>
        <input type="text" id="titleInput" class="form-control"  placeholder="an awesome title">
      </div>
      <div class="col-3 mb-3 ">
        <label for="numberInput" class="form-label">Manga number</label>
        <input type="number" id="numberInput" class="form-control"  placeholder="volume number">
      </div>
      <div class="col-2 mb-3">
        <label for="priceInput" class="form-label">Manga price</label>
        <input type="text" id="priceInput" class="form-control" placeholder="00.00">
      </div>
    </div>
    <router-link to="/admin" class="btn btn-danger">Cancel</router-link>
    <a class="btn btn-primary">Update</a>
  </template>
</template>