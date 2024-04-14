<script setup>
const userSearch = ref('')
const userData = ref({})

async function search () {
  console.log(userSearch.value)

  const data = await $fetch(`https://api.github.com/users/${userSearch.value}`)

  userData.value = data
}
</script>

<template>
  <div>
    <form @submit.prevent="search">
      <input v-model="userSearch" type="text" />
      <button>Search</button>
    </form>
    <pre>
      {{ userData }}
    </pre>
  </div>
</template>

<style scoped></style>
