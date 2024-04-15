<script setup>
useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} - Profile Viewer` : 'Profile Viewer'
  }
})
</script>

<template>
  <div>
    <nav>
      <NuxtLink to="/">Github Profile Viewer</NuxtLink>
      <Search />
    </nav>
    <NuxtPage />
  </div>
</template>
