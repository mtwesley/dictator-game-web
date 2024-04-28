<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>

import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header, Footer
  }
}

</script>

<style>

.small-view {
  width: 70%;
  min-width: 380px;
  max-width: 640px;
  margin: 2em auto;
}

</style>