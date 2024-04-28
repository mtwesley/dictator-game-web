<template>
  <div class="container">
    <div id="register" class="box small-view">
      <h1 class="title has-text-centered">Welcome</h1>
      <h2 class="subtitle has-text-centered ">Let us get to know you a little bit</h2>

      <div class="field">
        <label class="label">Full name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-right">
          <input class="input is-success" type="text" placeholder="Username" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small has-text-success is-right">
            <FontAwesomeIcon :icon="faCheck" />
          </span>
        </div>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-right">
          <input class="input is-success" type="password" placeholder="Password" />
          <span class="icon is-small is-right has-text-success">
            <FontAwesomeIcon :icon="faCheck" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Re-type password</label>
        <div class="control has-icons-right">
          <input class="input is-danger" type="password" placeholder="Re-type password" />
          <span class="icon is-small is-right has-text-danger">
            <FontAwesomeIcon :icon="faExclamationTriangle" />
          </span>
        </div>
        <p class="help is-danger">The password does not match</p>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link is-medium is-fullwidth">Continue</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faExclamationTriangle, faCheck, faUser } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      faCheck,
      faExclamationTriangle
    };
  }
};
</script>

<style scoped>
</style>
