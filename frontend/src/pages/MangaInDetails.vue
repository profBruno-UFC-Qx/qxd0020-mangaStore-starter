<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useUploadFile } from '../composables/useUploadURL';
import { Manga, useMangaService } from '../api/mangaService';
import CommentsContainer from '../components/Comment/Container.vue'

const props = defineProps<{
  id: number
}>()

const mangaService = useMangaService()
const manga = ref({} as Manga)
onBeforeMount(async () => manga.value = await mangaService.getById(props.id))

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-sm-12">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="useUploadFile(manga.cover.url)" class="w-100 rounded-start" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ manga.title }}</h5>
              <hr>
              <div class="text-start">
                <p class="card-text">Volume: {{ manga.number }}</p>
                <p class="card-text"><strong>Preço: <small class="text-danger">{{ manga.price }}</small></strong></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="row">
      <CommentsContainer class="col-12" :comments="manga.comments"></CommentsContainer>
    </div>
  </div>
</template>