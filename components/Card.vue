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
      v-if="$props.hasActions"
      class="card__actions"
    >
      <slot name="actions" />
    </section>
    <section class="card__main">
      <slot name="main" />
    </section>
    <section class="card__text">
      <slot name="text" />
    </section>
  </div>
</template>
