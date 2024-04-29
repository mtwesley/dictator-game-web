<template>
  <div class="container">
    <div id="register" class="box small-view">
      <h1 class="title has-text-centered">Hi, there!</h1>
      <h2 class="subtitle has-text-centered">Let's get to know each other</h2>

      <form @submit.prevent="handleRegistration">
        <div class="field">
          <!-- <label class="label" for="fullName">Full name</label> -->
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium" id="fullName" type="text" placeholder="Full name" v-model="name" required>
            <span class="icon is-large is-left">
              <FontAwesomeIcon :icon="faUser" />
            </span>
            <span class="icon is-small is-right">
              <FontAwesomeIcon :icon="faCheck" v-if="name.length > 3" class="has-text-success" />
            </span>
          </div>
        </div>

        <div class="field">
          <!-- <label class="label" for="username">Username</label> -->
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium" id="username" type="text" placeholder="Username" v-model="username" @blur="checkUsername" required
                :class="{ 'is-success': usernameAvailable === true, 'is-danger': usernameAvailable === false }">
            <span class="icon is-large is-left">
              <FontAwesomeIcon :icon="faAt" />
            </span>
            <span class="icon is-small is-right">
              <FontAwesomeIcon :icon="usernameAvailable ? faCheck : faExclamationTriangle" v-if="usernameAvailable !== null"
                  :class="{ 'has-text-success': usernameAvailable === true, 'has-text-danger': usernameAvailable === false }" />
            </span>
            <div class="help is-danger" v-if="usernameAvailable === false">
              This username is already taken
            </div>
          </div>
        </div>

        <div class="field">
          <!-- <label class="label" for="password">Password</label> -->
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium" :class="{'is-success': passwordsMatch}" id="password" type="password" placeholder="Password" v-model="password" required>
            <span class="icon is-large is-left">
              <FontAwesomeIcon :icon="password && passwordsMatch ? faLock : faLockOpen" />
            </span>
            <span class="icon is-small is-right" :class="{ 'has-text-success': passwordsMatch }">
              <FontAwesomeIcon :icon="faCheck" v-if="passwordsMatch" />
            </span>
          </div>
        </div>

        <div class="field">
          <!-- <label class="label" for="confirmPassword">Re-type password</label> -->
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium" :class="{'is-success': passwordsMatch, 'is-danger': confirmPassword && !passwordsMatch}" id="confirmPassword" type="password" placeholder="Re-type password" v-model="confirmPassword" required>
            <span class="icon is-large is-left">
              <FontAwesomeIcon :icon="confirmPassword && passwordsMatch ? faLock : faLockOpen" />
            </span>
            <span class="icon is-small is-right" :class="{'has-text-success': passwordsMatch, 'has-text-danger': confirmPassword && !passwordsMatch }">
              <FontAwesomeIcon :icon="faExclamationTriangle" v-if="confirmPassword && !passwordsMatch" />
              <FontAwesomeIcon :icon="faCheck" v-if="confirmPassword && passwordsMatch" />
            </span>
          </div>
          <p class="help is-danger" v-if="confirmPassword && !passwordsMatch">The passwords do not match</p>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-link is-large is-fullwidth" :disabled="!canSubmit">Continue</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faExclamationTriangle, faCheck, faLock, faLockOpen, faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import authService from '../api/authService'; 

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      usernameAvailable: null,
      faExclamationTriangle,
      faCheck,
      faUser,
      faAt,
      faLock,
      faLockOpen
    };
  },
  computed: {
    passwordsMatch() {
      return this.password && this.password === this.confirmPassword;
    },
    canSubmit() {
      return this.passwordsMatch && this.usernameAvailable && this.name && this.username && this.password && this.confirmPassword;
    }
  },
  methods: {
    checkUsername() {
      this.usernameAvailable = null;
      if (this.username.length > 3) authService.registerCheck(this.username)
        .then(response => {
          this.usernameAvailable = response.status === 204;
        })
        .catch(() => {
          this.usernameAvailable = false;
        });
    },
    handleRegistration() {
      if (this.canSubmit) {
        authService.register(this.name, this.username, this.password)
          .then(response => {
            this.$router.push('/board');
          })
      }
    }
  }
};

</script>

<style scoped>
</style>
