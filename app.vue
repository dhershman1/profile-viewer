<script setup>
const nuxtApp = useNuxtApp()
const loading = ref(false)

nuxtApp.hook('page:start', () => {
  loading.value = true
})

nuxtApp.hook('page:finish', () => {
  loading.value = false
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `Profile Viewer - ${titleChunk}` : 'Profile Viewer'
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <nav>
      <NuxtLink to="/">
        Github Profile Viewer
      </NuxtLink>
      <Search />
    </nav>
    <div
      v-if="loading"
      class="loader"
    />
    <NuxtPage />
  </div>
</template>
