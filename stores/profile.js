export const useProfileStore = defineStore('profile', () => {
  const profile = ref({})
  const repos = ref([])

  async function fetchRepos (user) {
    console.log(profile.value)
    const { data } = await useFetch(`https://api.github.com/users/${user}/repos?per_page=100&page=1`)

    repos.value = data
  }

  async function fetchProfile (user) {
    const { data } = await useFetch(`https://api.github.com/users/${user}`, {
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

    profile.value = data
  }

  return {
    // State
    profile,
    repos,
    // Actions
    fetchProfile,
    fetchRepos
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
