<template>
  <div class="container">
    <div id="login" class="box small-view">
      <h1 class="title has-text-centered">Welcome back!</h1>
      <h2 class="subtitle has-text-centered">Let's get started!</h2>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-medium" id="username" type="text" placeholder="Username" v-model="username" required>
            <span class="icon is-small is-left">
              <FontAwesomeIcon :icon="faUser" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-medium" id="password" type="password" placeholder="Password" v-model="password" required>
            <span class="icon is-small is-left">
              <FontAwesomeIcon :icon="faLock" />
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-link is-large is-fullwidth">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import authService from '../api/authService';

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      username: '',
      password: '',
      faUser,
      faLock
    };
  },
  methods: {
    handleLogin() {
      // localStorage.removeItem('token');

      authService.login(this.username, this.password)
        .then(response => {          
          if (response.status === 200) {
            const token = response.data.token;
            this.$store.dispatch('login', token).then(() => {

                authService.profile().then(response => {
                  const player = response.data;
                  
                    this.$store.dispatch('initializePlayer', player ).then(() => {
                      this.$router.push('/board');
                    })

                })
                .catch(() => this.$router.push("/logout"))

            });

          }
        })
    }
  }
};

</script>

<style scoped>

</style>