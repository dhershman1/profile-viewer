<script setup>
defineProps({
  totalPages: {
    type: Number,
    required: true
  }
})

const page = ref(1)
</script>

<template>
  <h1>DO something</h1>
</template>
