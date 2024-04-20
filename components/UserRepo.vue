<script setup>
import * as icons from 'vue3-simple-icons'
import { Ban } from 'lucide-vue-next'

const props = defineProps({
  htmlUrl: {
    type: String,
    default: ''
  },
  repoName: {
    type: String,
    default: ''
  },
  repoDesc: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: ''
  },
  pushedAt: {
    type: String,
    default: ''
  }
})

const icon = computed(() => {
  // This isn't great, we need a better way to dynamically grab icons from simple icons
  if (!props.lang) {
    return Ban
  }

  switch (props.lang.toLowerCase()) {
    case 'html':
      return icons['Html5Icon']
    case 'css':
      return icons['Css3Icon']
    case 'vue':
      return icons['VueDotjsIcon']
    case 'apex':
      return icons['SalesforceIcon']
    default:
      return icons[`${props.lang}Icon`]
  }
})
</script>

<template>
  <section class="repo">
    <Anchor
      class="repo__link"
      :href="htmlUrl"
    >
      {{ repoName }}
    </Anchor>
    <p class="repo__description">
      {{ repoDesc }}
    </p>
    <div class="repo__lang-updated">
      <p class="repo__lang">
        <component :is="icon" />
        {{ lang }}
      </p>
      <p class="repo__updated">
        Updated {{ pushedAt }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.repo {
  margin-top: 0.5rem;
}

.repo__link {
  font-size: 20px;
  font-weight: 500;
}

.repo__description {
  font-size: 14px;
}

.repo__lang {
  display: flex;
  gap: 0.2rem;
  font-size: 12px;
}

.repo__lang svg {
  width: 14px;
  height: 14px;
}

.repo__lang-updated {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.repo__lang-updated p {
  margin: 0;
}

.repo__updated {
  font-size: 12px;
}
</style>
