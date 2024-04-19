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
  <ul>
    <li>
      <button type="button">
        First
      </button>
    </li>
    <li>
      <button
        type="button"
      >
        Previous
      </button>
    </li>
  </ul>
</template>
