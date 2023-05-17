<script setup lang="ts">
defineProps<{
  title: string,
  number: number,
  price: number
}>()
</script>

<template>
  <div class="card shadow-sm">
    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
        dy=".3em">Thumbnail</text>
    </svg>
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