<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/src/assets/images/logo.png" alt="Dictator Game">
      </router-link>
    
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button is-dark" v-bind:to="{ name: 'register'}"><strong>Sign up</strong></router-link>
          <router-link class="button is-light" v-bind:to="{ name: 'login'}"><strong>Login</strong></router-link>
        </div>
      </div>

      <a role="button" class="navbar-burger" aria-label="menu" :class="{ 'is-active': $store.state.isMenuActive }" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

    </div>

  <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': $store.state.isMenuActive }">
    <div class="navbar-start">
      <router-link class="navbar-item" v-bind:to="{ name: 'board'}">Board</router-link>
      <router-link class="navbar-item" v-bind:to="{ name: 'profile'}">Profile</router-link>
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
