<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Moja przychodnia</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" controls="navbarNavDropdown" expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="this.$store.state?.userData?.token">
            <router-link class="nav-link active" current="page" to="/appoint">Wizyty</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" current="page" to="/about">O nas</router-link>
          </li>
          <li class="nav-item" v-if="!this.$store.state?.userData?.token">
            <router-link class="nav-link active" current="page" to="/register">Rejestracja</router-link>
          </li>
          <li class="nav-item" v-if="!this.$store.state?.userData?.token">
            <router-link class="nav-link active" current="page" to="/login">Logowanie</router-link>
          </li>
          <li class="nav-item dropdown" v-if="this.$store.state?.userData?.token">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" expanded="false">
              Konto
            </a>
            <ul class="dropdown-menu" labelledby="navbarDropdownMenuLink">
              <li><router-link class="dropdown-item" current="page" to="/user-appointments">Moje wizyty</router-link></li>
              <li><router-link class="dropdown-item" current="page" to="/user-data">Moje konto</router-link></li>
              <li v-if="this.$store.state?.userData?.role === 'system_admin'"><router-link class="dropdown-item" current="page" to="/admin-panel">Panel admina</router-link></li>
            </ul>
          </li>
          <li class="nav-item" v-if="this.$store.state?.userData?.token">
            <a class="nav-link active" href="#" @click="logout">Wyloguj</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Header',
  methods: {
    async logout() {
      try {
        await axios.post('/auth/logout')
        this.showSuccess('Wylogowano.')
      } catch(error) {
        this.showError('Błąd: ' + error.response.status)
      } finally {
        const userData = { email: '', role: '', token: '', userUUID: '' }
        this.$store.commit('setUserData', userData)
        this.$router.push('/')
      }
    }
  }
}
</script>