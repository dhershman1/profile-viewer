<script setup>
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - Profile Viewer` : 'Profile Viewer'
  }
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
