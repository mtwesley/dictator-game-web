<template>
  <b-navbar class="is-transparent">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'board' }">
        Dictator Game
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'board' }">About</b-navbar-item>
      <!-- Additional navbar items -->
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
};
</script>
