<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>Copyright © {{ currentYear }} Created by Mlen-Too Wesley. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
