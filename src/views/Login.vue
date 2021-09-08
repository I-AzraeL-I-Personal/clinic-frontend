<template>
  <div class="container mt-3">
    <h2 class="text-left">Zaloguj się</h2>
    <form @submit.prevent="sendRequest" class="row g-3 w-50">
      <div class="col-md-12 form-floating">
        <input class="form-control" type="text" id="email" v-model="request.login.email">
        <label for="email">E-mail</label>
      </div>
      <div class="col-md-12 form-floating">
        <input class="form-control" type="password" id="password" v-model="request.login.password">
        <label for="password">Hasło</label>
      </div>
      <div class="col-md-12" hidden=true>
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" id="role-patient" autocomplete="off" v-model='request.login.role' value="patient" checked>
          <label class="btn btn-outline-secondary" for="role-patient">Pacjent</label>
          <input type="radio" class="btn-check" id="role-doctor" autocomplete="off" v-model='request.login.role' value="doctor">
          <label class="btn btn-outline-secondary" for="role-doctor">Lekarz</label>
        </div>
      </div>
      <div class="col-auto">
      <button class="btn btn-primary" type="submit">Zaloguj</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      request: {
        login: {
          email: '',
          password: ''
        },
      }
    }
  },
  methods: {
    async sendRequest() {
      try {
        const response = await axios.post('/auth/login', this.request.login)
        this.$store.commit('setUserData', response.data)
        this.showSuccess('Zalogowano.')
        this.$router.push('/')
      } catch(error) {
        switch (error.response.status) {
          case 401:
            this.showError('Niepoprawne dane logowania.')
            break
          case 403:
            this.showError('Konto oczekuje na aktywację.')
            break
          default:
            this.showError('Błąd serwera: ' + error.response.status)
        }
      }
    },
  },
}
</script>

