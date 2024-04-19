<script setup>
import { Github } from 'lucide-vue-next'

const profileStore = useProfileStore()

const memberYear = computed(() => {
  return new Date(profileStore.profile.created_at).getFullYear()
})
</script>

<template>
  <div class="profile">
    <Card>
      <template #main>
        <div class="name">
          <img class="avatar" :src="profileStore.profile.avatar_url" alt="Avatar" />
          <section class="name__heading">
            <h2>{{ profileStore.profile.name }}</h2>
            <Anchor class="github" :href="profileStore.profile.html_url">
              <Github class="github__icon" /> {{ profileStore.profile.login }}
            </Anchor>
          </section>
        </div>
        <div class="details">
          <ul class="details__list">
            <li class="bio">
              <p>{{ profileStore.profile.bio }}</p>
            </li>
            <li>
              <h3>Followers</h3>
              <p>{{ profileStore.profile.followers }}</p>
            </li>
            <li>
              <h3>Following</h3>
              <p>{{ profileStore.profile.following }}</p>
            </li>
            <li>
              <h3>Location</h3>
              <p>{{ profileStore.profile.location }}</p>
            </li>
            <li>
              <h3>Public Repositories</h3>
              <p>{{ profileStore.profile.public_repos }}</p>
            </li>
            <li>
              <h3>Website</h3>
              <Anchor class="website" :href="profileStore.profile.blog">{{ profileStore.profile.blog }}</Anchor>
            </li>
            <li class="member-since">
              Github member since {{ memberYear }}
            </li>
          </ul>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.profile {
  width: 100%;
}

h2 {
  margin: 0;
}

.details__list li {
  display: flex;
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid var(--lightgrey);
}

.details__list li:last-child {
  border-bottom: none;
}

.details__list li h3 {
  color: var(--dark);
  font-weight: 600;
  margin: 0;
  font-size: 14px;
}

.details__list li p,
.website {
  margin: 0;
  margin-left: 1rem;
  font-size: 14px;
}

.github {
  text-align: center;
  font-size: 12px;
}

.github__icon {
  width: 1rem;
  height: 1rem;
}

.avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 50px;
}

.name {
  display: grid;
  grid-template-columns: 20% 80%;
  border-bottom: 1px solid var(--lightgrey);
  align-items: center;
  padding: 0.5rem;
}

.name__heading {
  margin-left: 1.5rem;
}

.details__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 768px) {
  .name {
    grid-template-columns: 1fr;
  }
}
</style>
