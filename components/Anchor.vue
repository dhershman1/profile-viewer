<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="link__wrapper">
    <NuxtLink
      :to="$props.href"
      target="_blank"
      class="link__anchor"
    >
      <slot></slot> <ArrowUpRight class="link__icon" />
    </NuxtLink>
  </div>
</template>
