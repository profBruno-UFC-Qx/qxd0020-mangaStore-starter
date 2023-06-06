<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Manga } from '../types'
import { useUploadFile } from '../composables/useUploadURL'
import { useErrorUtil } from '../composables/useApplicationError'
import { useMangaService } from '../api/mangaService'
import CommentsContainer from '../components/Comment/Container.vue'
import LoadingContainer from '../components/LoadingContainer.vue'

const props = defineProps<{
  id: number
}>()

const mangaService = useMangaService()
const manga = ref({} as Manga)
const loading = ref(true)
const message = ref("")

onMounted(async () => {
  const result = await mangaService.getById(props.id)
  if(!useErrorUtil().isAppError(result)) {
    manga.value = result
  } else {
    message.value = "Alguma coisa deu errado"
  }
  loading.value = false
})

</script>

<template>
  <LoadingContainer :loading="loading">
    <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
    <div v-else class="row justify-content-center">
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
  </LoadingContainer>
</template>