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

<style scoped>

</style>