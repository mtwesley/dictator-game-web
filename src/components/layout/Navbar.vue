<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/src/assets/images/logo.png" alt="Dictator Game">
      </router-link>
    
      <div class="navbar-item" v-if="!$store.getters.isAuthenticated">
        <div class="buttons">
          <router-link class="button is-dark" v-bind:to="{ name: 'register'}" exact><strong>Sign up</strong></router-link>
          <router-link class="button is-light" v-bind:to="{ name: 'login'}" exact><strong>Login</strong></router-link>
        </div>
      </div>

      <a v-if="$store.getters.isAuthenticated" role="button" class="navbar-burger is-dark" aria-label="menu" :class="{ 'is-active': $store.state.isMenuActive }" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

    </div>

  <div v-if="$store.getters.isAuthenticated" id="navbarMenu" class="navbar-menu" :class="{ 'is-active': $store.state.isMenuActive }">
    <div class="navbar-start">
      <router-link class="navbar-item" v-bind:to="{ name: 'board'}">Board</router-link>
      <router-link class="navbar-item" v-bind:to="{ name: 'profile'}">Player</router-link>
    </div>
  </div>

</nav>

</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toggleMenu() {
      this.$store.commit("TOGGLE_MENU");
    }
  },
};
</script>
