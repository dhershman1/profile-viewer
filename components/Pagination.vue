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

function nextPage() {
  currentPage.value += 1
  emit('loadPage', currentPage.value)
}

function prevPage() {
  currentPage.value -= 1
  emit('loadPage', currentPage.value)
}

function loadPage(val) {
  currentPage.value = val
  emit('loadPage', val)
}
</script>

<template>
  <div class="pagination">
    <button
      :class="['pagination__trigger', { disabled: prevBtnDisabled }]"
      :disabled="prevBtnDisabled"
      @click="prevPage"
    >
      <circle-arrow-left />
    </button>
    <button
      v-for="n in totalPages"
      :key="n"
      :class="['pagination__trigger', { active: n === currentPage }]"
      :disabled="n === currentPage"
      @click="loadPage(n)"
    >
      {{ n }}
    </button>
    <button
      :class="['pagination__trigger', { disabled: nextBtnDisabled }]"
      :disabled="nextBtnDisabled"
      @click="nextPage"
    >
      <circle-arrow-right />
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

button {
  background-color: var(--white);
  border: 1px solid var(--accent);
  border-radius: 5px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--accent);
  color: var(--white);
}

button.disabled {
  cursor: not-allowed;
}

button.disabled:hover {
  background-color: transparent;
  color: #6d6d6d;
}
</style>
