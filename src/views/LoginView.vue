<template>
  <div class="container">
    <b-field label="Full Name">
      <b-input placeholder="Enter your full name" v-model="fullName" required />
    </b-field>
    <b-field label="Username">
      <b-input placeholder="Choose a username" v-model="username" required />
    </b-field>
    <b-field label="Password" type="is-danger">
      <b-input type="password" password-reveal placeholder="Create a password" v-model="password" required />
    </b-field>
    <b-field label="Confirm Password">
      <b-input type="password" placeholder="Confirm your password" v-model="passwordConfirmation" required />
    </b-field>
    <b-button type="is-primary" @click="register" :loading="isLoading">Register</b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fullName: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      isLoading: false
    };
  },
  methods: {
    register() {
      if (this.password !== this.passwordConfirmation) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Passwords do not match!",
          type: "is-danger"
        });
        return;
      }
      this.isLoading = true;
      axios.post('/api/register', {
        name: this.fullName,
        username: this.username,
        password: this.password
      }).then(response => {
        this.isLoading = false;
        this.$buefy.toast.open({
          duration: 5000,
          message: "Registration successful!",
          type: "is-success"
        });
        // Handle redirection or clearing form here
      }).catch(error => {
        this.isLoading = false;
        this.$buefy.toast.open({
          duration: 5000,
          message: error.response.data,
          type: "is-danger"
        });
      });
    }
  }
};
</script>

<style scoped>
  .container {
    max-width: 400px;
    margin: auto;
    padding-top: 20px;
  }
</style>