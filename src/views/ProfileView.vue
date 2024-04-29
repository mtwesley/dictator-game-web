<template>
  <div class="container">
    <div id="profile" class="box small-view">
      <h1 class="title has-text-centered">Hey!</h1>
      <!-- <h2 class="subtitle has-text-centered">You can be anything you want</h2> -->

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" :value="$store.state.player.name" readonly>
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" :value="$store.state.player.username" readonly>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <router-link to="/logout" class="button is-danger is-fullwidth">Sign out</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    player() {
      return this.$store.state.player;
    }
  }
};
</script>
