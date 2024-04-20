<script setup>
defineProps({
  hasActions: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="card">
    <section
      v-if="hasActions"
      class="card__actions"
    >
      <slot name="actions" />
    </section>
    <section class="card__main">
      <slot name="main" />
    </section>
    <section class="card__extras">
      <slot name="extras" />
    </section>
  </div>
</template>
