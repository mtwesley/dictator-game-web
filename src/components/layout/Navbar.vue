<template>
  <b-navbar role="navigation" aria-label="main navigation">
    <template #brand>
      <b-navbar-item tag="router-link" to="/">
        <img src="/src/assets/images/logo.png" alt="Dictator Game">
      </b-navbar-item>
      <b-navbar-burger />
    </template>
    <b-navbar-menu v-model="isMenuActive">
      <b-navbar-start>
        <b-navbar-item tag="router-link" :to="{ name: 'board' }">Board</b-navbar-item>
        <b-navbar-item>Profile</b-navbar-item>
      </b-navbar-start>
    </b-navbar-menu>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false,
    };
  },
};
</script>
