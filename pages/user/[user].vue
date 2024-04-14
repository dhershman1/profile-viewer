<script setup>
import { fuzzySearch } from 'kyanite'
import * as icons from 'vue3-simple-icons'
import { Ban, Star, GitFork, CircleDot } from 'lucide-vue-next'

const route = useRoute()
const search = ref('')

const profile = await useFetch(`https://api.github.com/users/${route.params.user}`, {
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
const repos = await useFetch(profile.data.value.repos_url, {
  query: {
    page: 1,
    per_page: profile.data.value.public_repos
  }
})

const filteredRepos = computed(() => {
  return repos.data.value.filter(({ name }) => fuzzySearch(search.value, name))
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
    default:
      return icons[`${lang}Icon`]
  }
}
</script>

<template>
  <div class="user">
    <section class="user__profile">
      <Profile :profile="profile.data.value" />
    </section>
    <section class="repositories">
      <div class="repos">
        <Card has-actions>
          <template #actions>
            <div class="filters">
              <section class="filters__search">
                <input
                  class="filters__input"
                  type="text"
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
                  <p class="repo__lang">
                    <component :is="getIcon(repo.language)" />
                    {{ repo.language }}
                  </p>
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
  justify-content: center;
  gap: 1rem;
  grid-template-columns: 30% 70%;
}

.user .user__profile {
  position: sticky;
  top: 0;
}

.repositories {
  margin-right: 0.5rem;
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

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border-left: 1px solid var(--lightgrey);
}

.stats p {
  vertical-align: middle;
  font-size: 16px;
  margin: 0;
  display: flex;
  align-items: center;
}

.stats p svg {
  width: 16px;
  height: 16px;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

@media only screen and (max-width: 768px) {
  .user {
    grid-template-columns: 1fr;
  }

  .user .user__profile {
    position: inherit;
  }

  .repositories {
    width: 100%;
  }
}
</style>
