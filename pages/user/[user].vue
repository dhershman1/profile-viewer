<script setup>
const route = useRoute()

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
</script>

<template>
  <div class="user">
    <section>
      <Profile :profile="profile.data.value" />
    </section>
    <section>
      <div class="filters">

      </div>
      <ol>
        <li v-for="repo in repos.data.value" :key="repo.id">
          {{ repo.name }}
          <ul>
            <li>
              {{ repo.description }}
            </li>
            <li>
              Stars: {{ repo.stargazers_count }}
            </li>
            <li>
              Issues: {{ repo.open_issues_count }}
            </li>
            <li>
              Forks: {{ repo.forks_count }}
            </li>
          </ul>
        </li>
      </ol>
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

.user section {
  position: sticky;
  top: 0;
}

@media only screen and (max-width: 768px) {
  .user {
    grid-template-columns: 1fr;
  }

  .user section {
    position: inherit;
  }
}
</style>
