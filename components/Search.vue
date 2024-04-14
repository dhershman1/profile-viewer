<script setup>
const router = useRouter()
const userSearch = ref('')

function search () {
  router.push(`/user/${userSearch.value}`)
}
</script>

<template>
  <div>
    <form @submit.prevent="search">
      <input v-model="userSearch" type="text" />
      <button>Search</button>
    </form>
  </div>
</template>

<style scoped></style>
