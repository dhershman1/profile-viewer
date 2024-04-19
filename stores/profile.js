export const useProfileStore = defineStore('profile', () => {
  const apiBase = 'https://api.github.com/users'
  const profile = ref({})
  const repos = ref([])
  const loading = reactive({
    profile: false,
    repos: false
  })

  async function fetchRepos (user, sort = 'pushed', page = 1) {
    try {
      loading.repos = true

      const data = await $fetch(`${apiBase}/${user}/repos`, {
        query: {
          per_page: 100,
          page,
          sort
        }
      })

      repos.value = data

      return data
    } catch (err) {
      console.error('Failed to fetch repos', err)
    } finally {
      loading.repos = false
    }
  }

  async function fetchProfile (user) {
    const { data } = await useFetch(`${apiBase}/${user}`, {
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

    profile.value = data.value

    return data.value
  }

  return {
    // State
    profile,
    repos,
    loading,
    // Actions
    fetchProfile,
    fetchRepos
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
