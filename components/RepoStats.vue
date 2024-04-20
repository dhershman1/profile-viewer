<script setup>
import { Star, GitFork, CircleDot } from 'lucide-vue-next'

defineProps({
  stars: {
    type: Number,
    default: 0
  },
  forks: {
    type: Number,
    default: 0
  },
  issues: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <section class="stats">
    <p><Star /> {{ stars }} Stars</p>
    <p><GitFork /> {{ forks }} Forks</p>
    <p><CircleDot /> {{ issues }} Issues</p>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border-left: 1px solid var(--lightgrey);
}

.stats p {
  font-size: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stats p svg {
  width: 16px;
  height: 16px;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

@media only screen and (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
