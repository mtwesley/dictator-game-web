<template>
  <b-navbar class="is-transparent">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        Dictator Game
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'about' }">About</b-navbar-item>
      <!-- Additional navbar items -->
    </template>
    <template #end>
      <!-- Possibly user profile or logout button -->
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
};
</script>
