<script setup>
import { CircleArrowLeft, CircleArrowRight } from 'lucide-vue-next'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['loadPage'])
const currentPage = ref(1)
const prevBtnDisabled = computed(() => {
  return currentPage.value === 1
})
const nextBtnDisabled = computed(() => {
  return currentPage.value === props.totalPages
})

function nextPage () {
  currentPage.value += 1
  emit('loadPage', currentPage.value)
}

function prevPage () {
  currentPage.value -= 1
  emit('loadPage', currentPage.value)
}

function loadPage (val) {
  currentPage.value = val
  emit('loadPage', val)
}
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__trigger"
      @click.native="prevPage"
      :disabled="prevBtnDisabled"
    >
      <CircleArrowLeft />
    </button>
    <button
      :class="['pagination__trigger', { active: n === currentPage }]"
      v-for="n in totalPages"
      :key="n"
      @click="loadPage(n)"
      :disabled="n === currentPage"
    >
      {{ n }}
    </button>
    <button
      class="pagination__trigger"
      @click.native="nextPage"
      :disabled="nextBtnDisabled"
    >
      <CircleArrowRight />
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.2rem;
}

.pagination__trigger {
  cursor: pointer;
  padding: 0.5rem;
  vertical-align: middle;
}

.active {
  cursor: default;
  color: var(--white);
  border: 1px solid var(--highlight);
  background-color: var(--accent);
  border-radius: 5px;
}
</style>
