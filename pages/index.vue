<script setup>
useHead({
  meta: [
    { name: 'description', content: `View user repos at a glance!` },
    { property: 'og:description', content: 'View user repos at a glance!' },
  ]
})
</script>

<template>
  <main class="search">
    <header>
      <h1>Search for A GitHub User</h1>
    </header>
    <Search class="search__bar" />
  </main>
</template>
