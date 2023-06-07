<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Manga } from '../types'
import { useMangaService } from '../api/mangaService'
import { useErrorUtil } from '../composables/useApplicationError'
import { useNotificationStore } from '../stores/notificationStore'
import { useRouter } from 'vue-router'
import { useUploadFile } from '../composables/useUploadURL'

const props = defineProps<{ id?: number}>()

const manga = ref<Manga>({} as Manga)
const cover = ref<File>()
const mangaService = useMangaService()
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  if(props.id) {
    const result = await mangaService.getById(props.id)
    if(!useErrorUtil().isAppError(result)) {
      manga.value = result
    } else {
      useNotificationStore().error("Alguma coisa deu errado")
    }
    loading.value = false
  }
})

function handleFileUpload(event: Event) {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement
  cover.value = target.files?.item(0) as File
}

async function create() {
  if(cover.value?.name) {
    const { title, price, number } = manga.value
    const result = await mangaService.create({
      title,
      price,
      number,
      cover: cover.value
    })
  
    if(useErrorUtil().isAppError(result)) {
      useNotificationStore().error(result.message)
    } else {
      useNotificationStore().add("Manga criado com sucesso")
      router.push("/admin")
    }
  } else {
    useNotificationStore().error("A capa do manga é obrigatória")
  }
}

async function update(){
  const { id, title, price, number } = manga.value
  const result = await mangaService.update({
    id,
    title,
    price,
    number,
    cover: cover.value
  })

  if(useErrorUtil().isAppError(result)) {
    useNotificationStore().error(result.message)
  } else {
    const res = await mangaService.getById(result.id)
    if(useErrorUtil().isAppError(res)) {
     useNotificationStore().error(res.message)
    } else {
      manga.value = res
      useNotificationStore().add("Manga atualizado com sucesso")
    }
  }
}
</script>

<template>
  <img class="col-auto" v-if="manga.cover" :src="useUploadFile(manga.cover.url)" />
  <div class="row text-start">
    <div class="col-12 mb-3">
      <label for="coverInput" class="form-label">Manga cover</label>
      <input type="file" id="coverInput" accept="image/*" @change="handleFileUpload" class="form-control">
    </div>
    <div class="col-12 mb-3">
      <label for="titleInput" class="form-label">Manga title</label>
      <input type="text" id="titleInput" class="form-control" v-model="manga.title" placeholder="an awesome title">
    </div>
    <div class="col-3 mb-3 ">
      <label for="numberInput" class="form-label">Manga number</label>
      <input type="number" id="numberInput" class="form-control" v-model="manga.number" placeholder="volume number">
    </div>
    <div class="col-2 mb-3">
      <label for="priceInput" class="form-label">Manga price</label>
      <input type="text" id="priceInput" class="form-control" v-model="manga.price" placeholder="00.00">
    </div>
  </div>

  <router-link to="/admin" class="btn btn-danger">Cancel</router-link>
  <a v-if="props.id" class="btn btn-primary" @click="update">Update</a>
  <a v-else class="btn btn-success" @click="create">Create</a>
</template>