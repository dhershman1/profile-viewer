<script setup>
import { fuzzySearch } from 'kyanite'
import * as icons from 'vue3-simple-icons'
import { Ban, Star, GitFork, CircleDot } from 'lucide-vue-next'

const PER_PAGE = 20
const route = useRoute()
const search = ref('')
const sortBy = ref('pushed')
const profileStore = useProfileStore()

await profileStore.fetchProfile(route.params.user)
await profileStore.fetchRepos(route.params.user, sortBy.value)

const totalPages = computed(() => {
  return Math.ceil(profileStore.profile.public_repos / PER_PAGE)
})

const filteredRepos = computed(() => {
  return profileStore.repos.filter(({ name }) => fuzzySearch(search.value, name))
})

function getIcon (lang) {
  // This isn't a great function, we need a better way to dynamically grab icons from simple icons
  if (!lang) {
    return Ban
  }

  switch (lang.toLowerCase()) {
    case 'html':
      return icons['Html5Icon']
    case 'css':
      return icons['Css3Icon']
    case 'vue':
      return icons['VueDotjsIcon']
    case 'apex':
      return icons['SalesforceIcon']
    default:
      return icons[`${lang}Icon`]
  }
}

watch(sortBy, async (newSort, oldSort) => {
  if (newSort === oldSort) {
    return
  }

  try {
    await profileStore.fetchRepos(route.params.user, newSort)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="user">
    <section class="user__profile">
      <Profile :profile="profileStore.profile" />
    </section>
    <section class="user__repos">
      <div class="repos">
        <Card has-actions>
          <template #actions>
            <div class="filters">
              <section class="filters__sort">
                <select class="control" v-model="sortBy">
                  <option value="pushed">Pushed</option>
                  <option value="created">Created</option>
                  <option value="updated">Updated</option>
                  <option value="full_name">Name</option>
                </select>
              </section>
              <section class="filters__search">
                <input
                  class="filters__input"
                  type="text"
                  placeholder="Search Repository"
                  v-model="search"
                />
              </section>
            </div>
          </template>
          <template #main>
            <ul class="repos__list">
              <li
                class="repos__item"
                v-for="repo in filteredRepos"
                :key="repo.id"
              >
                <section class="repo">
                  <Anchor class="repo__link" :href="repo.html_url">
                    {{ repo.name }}
                  </Anchor>
                  <p class="repo__description">{{ repo.description }}</p>
                  <div class="repo__lang-updated">
                    <p class="repo__lang">
                      <component :is="getIcon(repo.language)" />
                      {{ repo.language }}
                    </p>
                    <p class="repo__updated">
                      Updated {{ useTimeAgo(repo.pushed_at) }}
                    </p>
                  </div>
                </section>
                <section class="stats">
                  <p><Star /> {{ repo.stargazers_count }} Stars</p>
                  <p><GitFork/> {{ repo.forks_count }} Forks</p>
                  <p><CircleDot /> {{ repo.open_issues }} Issues</p>
                </section>
              </li>
            </ul>
          </template>
          <template #text>
            TODO: Pagination
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.user {
  display: grid;
  align-items: flex-start;
  grid-template-columns: 1fr 2fr;
  margin: 1rem;
}

.pagination {
  display: flex;
}

.user .user__profile {
  position: sticky;
  top: 1rem;
  width: 85%;
}

.repos__list {
  list-style: none;
}

.repos__item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--lightgrey);
  margin-top: 0.5rem;
}

.repos__item:first-child {
  padding-top: 0.5rem;
  border-top: 1px solid var(--lightgrey);
}

.repos__item:last-child {
  border-bottom: none;
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
}

.repo__lang-updated p {
  margin: 0;
}

.repo__updated {
  font-size: 12px;
}

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

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.filters__input {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--lightgrey);
  border-radius: 6px;
  box-shadow: hsl(216, 12%, 92%) 0px 1px 3px -1px;
}

@media only screen and (max-width: 768px) {
  .user {
    grid-template-columns: 1fr;
  }

  .user .user__profile {
    position: inherit;
    width: 100%;
    margin-bottom: 1rem;
  }

  .user__repos {
    width: 100%;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
