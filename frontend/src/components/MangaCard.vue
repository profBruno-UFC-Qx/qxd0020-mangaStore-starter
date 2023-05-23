<script setup lang="ts">
import { baseURL } from '../baseConfig';

defineProps<{
  title: string,
  number: number,
  price: number,
  cover: {
    url: string
  }
}>()

function getUploadURL(url: string) {
  return `${baseURL}${url}`
}
</script>

<template>
  <div class="card shadow-sm">
    <img :src="getUploadURL(cover.url)">
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-text">Volume: {{ number }}</p>
      <p class="card-text">Price: {{ price }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
        </div>
        <small class="text-body-secondary">9 mins</small>
      </div>
    </div>
  </div>
</template>