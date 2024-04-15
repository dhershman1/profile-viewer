<script setup>
import { fuzzySearch } from 'kyanite'
import * as icons from 'vue3-simple-icons'
import { Ban, Star, GitFork, CircleDot } from 'lucide-vue-next'

const PER_PAGE = 20
const route = useRoute()
const search = ref('')
const sortBy = ref('pushed_at')

const { data: profile } = await useFetch(`https://api.github.com/users/${route.params.user}`, {
      pick: [
        'login',
        'location',
        'avatar_url',
        'id',
        'name',
        'company',
        'blog',
        'bio',
        'public_repos',
        'public_gists',
        'followers',
        'following',
        'hireable',
        'created_at',
        'repos_url',
        'starred_url',
        'organizations_url',
        'html_url'
      ]
    })
const { data: repos } = await useFetch(profile.value.repos_url, {
  query: {
    page: 1,
    per_page: PER_PAGE,
    type: 'public',
    sort: 'pushed'
  }
})

const totalPages = computed(() => {
  return Math.ceil(profile.value.public_repos / PER_PAGE)
})

const filteredRepos = computed(() => {
  return repos.value.filter(({ name }) => fuzzySearch(search.value, name)).sort((a, b) => {
    if (a.pushed_at > b.pushed_at) {
      return -1
    }

    if (b.pushed_at > a.pushed_at) {
      return 1
    }

    return 0
  })
})

const sortedRepos = computed(() => {
  return filteredRepos.value.sort((a, b) => {
    if (a[sortBy.value] > b[sortBy.value]) {
      return -1
    }

    if (b[sortBy.value] > a[sortBy.value]) {
      return 1
    }

    return 0
  })
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
</script>

<template>
  <div class="user">
    <section class="user__profile">
      <Profile :profile="profile" />
    </section>
    <section class="user__repos">
      <div class="repos">
        <Card has-actions>
          <template #actions>
            <div class="filters">
              <section class="filters__sort">
                <select v-model="sortBy">
                  <option value="pushed">Updated</option>
                  <option value="created">Created</option>
                  <option value="stargazers_count">Stars</option>
                  <option value="forks_count">Forks</option>
                  <option value="open_issues">Issues</option>
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
                v-for="repo in sortedRepos"
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

.filters__input:focus {
  border-color: var(--accent);
  box-shadow: var(--accent) 0px 0px 0px 1px;
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
