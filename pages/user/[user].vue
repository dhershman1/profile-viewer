<script setup>
import { fuzzySearch } from 'kyanite'

const route = useRoute()
const profileStore = useProfileStore()
const perPage = ref(20)
const prevent = ref(false)
const search = ref('')
const sortBy = ref('pushed')

try {
  await Promise.all([
    profileStore.fetchProfile(route.params.user),
    profileStore.fetchRepos(route.params.user, sortBy.value)
  ])
}
catch (err) {
  console.error(err)
}
const totalPages = computed(() => {
  return Math.ceil(profileStore.profile.public_repos / perPage.value)
})

const filteredRepos = computed(() => {
  return profileStore.repos.filter(({ name }) => fuzzySearch(search.value, name))
})

async function loadRepoPage(page) {
  try {
    prevent.value = true
    await profileStore.fetchRepos(route.params.user, sortBy.value, page, perPage.value)
  } catch (err) {
    console.error('Failed to load page', err)
  } finally {
    prevent.value = false
  }
}

watch(perPage, async (newer, old) => {
  if (old === newer) {
    return
  }

  try {
    prevent.value = true
    await profileStore.fetchRepos(route.params.user, sortBy.value, 1, newer)
  } catch (err) {
    console.error('Problem setting per page limit', err)
  } finally {
    prevent.value = false
  }
})

watch(sortBy, async (newSort, oldSort) => {
  if (newSort === oldSort) {
    return
  }

  try {
    prevent.value = true
    await profileStore.fetchRepos(route.params.user, newSort)
  } catch (err) {
    console.error('Failed to fetch sorted results', err)
  }
  finally {
    prevent.value = false
  }
})

useHead({
  title: route.params.user,
  meta: [
    { name: 'description', content: `Check out the public repos of ${route.params.user}` },
    { property: 'og:description', content: `Check out the public repos of ${route.params.user}` },
    { property: 'og:image', content: profileStore.profile.avatar_url }
  ]
})
</script>

<template>
  <div class="user">
    <section class="user__profile">
      <profile />
    </section>
    <section class="user__repos">
      <div class="repos">
        <card has-actions>
          <template #actions>
            <div class="filters">
              <section class="filters__sort">
                <label>
                  Sort By
                </label>
                <select
                  v-model="sortBy"
                  class="control"
                >
                  <option value="pushed">
                    Pushed
                  </option>
                  <option value="created">
                    Created
                  </option>
                  <option value="updated">
                    Updated
                  </option>
                  <option value="full_name">
                    Name
                  </option>
                </select>
              </section>
              <section class="filters__per-page">
                <label>
                  <select
                    v-model="perPage"
                    class="control"
                  >
                    <option value="10">
                      10
                    </option>
                    <option value="20">
                      20
                    </option>
                    <option value="30">
                      30
                    </option>
                    <option value="40">
                      40
                    </option>
                    <option value="50">
                      50
                    </option>
                  </select>
                  Per Page
                </label>
              </section>
              <section class="filters__search">
                <input
                  v-model="search"
                  class="filters__input"
                  type="text"
                  placeholder="Search Repository"
                >
              </section>
            </div>
          </template>
          <template #main>
            <div
              v-if="profileStore.loading.repos && !prevent"
              class="loader"
            />
            <ul
              v-else
              class="repos__list"
            >
              <li
                v-for="repo in filteredRepos"
                :key="repo.id"
                class="repos__item"
              >
                <user-repo
                  :lang="repo.language"
                  :html-url="repo.html_url"
                  :repo-name="repo.name"
                  :repo-desc="repo.description"
                  :pushed-at="useTimeAgo(repo.pushed_at)"
                />
                <repo-stats
                  :stars="repo.stargazers_count"
                  :forks="repo.forks_count"
                  :issues="repo.open_issues"
                />
              </li>
            </ul>
          </template>
          <template #extras>
            <pagination
              :total-pages="totalPages"
              @load-page="loadRepoPage"
            />
          </template>
        </card>
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

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
}
</style>
