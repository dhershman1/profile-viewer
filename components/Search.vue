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
      <input
        class="control"
        v-model="userSearch"
        type="text"
        placeholder="GitHub Username"
      />
      <button class="btn">Search</button>
    </form>
  </div>
</template>

<style scoped>
.control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
