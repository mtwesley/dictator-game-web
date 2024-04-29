<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

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

#nprogress .bar {
  height: 4px !important;
}

</style>