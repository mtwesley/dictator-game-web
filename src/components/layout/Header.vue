<template>
  <div class="navbar is-transparent">
      <div tag="navbar-item router-link" :to="{ name: 'board' }">
        Dictator Game
      </div>

      <div tag="navbar-item router-link" :to="{ name: 'board' }">About</div>
      <!-- Additional navbar items -->
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>
