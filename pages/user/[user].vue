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
  <div>
    <h1>User</h1>
    <h2>{{ $route.params.user }}</h2>
    <pre>
      {{ profile.data }}
    </pre>

    <Anchor :href="'#'">dhershman1</Anchor>

    <ol>
      <li v-for="repo in repos.data.value" :key="repo.id">
        {{ repo.name }}
        <ul>
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
  </div>
</template>
