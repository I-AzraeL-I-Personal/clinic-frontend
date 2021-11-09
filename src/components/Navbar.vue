<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" width="30" height="24" class="d-inline-block align-text-top" alt="">
        Moja przychodnia
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" controls="navbarNavDropdown" expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'Home' }">Strona główna</router-link>
          </li>
          <li class="nav-item" v-if="$store.getters.token">
            <router-link class="nav-link" :to="{ name: 'Appoint' }">Wizyty</router-link>
          </li>
          <li class="nav-item dropdown" v-if="$store.getters.token">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" expanded="false">
              Konto
            </a>
            <ul class="dropdown-menu" labelledby="navbarDropdownMenuLink">
              <li v-if="$store.getters.role !== 'admin'" ><router-link class="dropdown-item" :to="{ name: 'UserAppointments' }">Moje wizyty</router-link></li>
              <li v-if="$store.getters.role !== 'admin'"><router-link class="dropdown-item" :to="{ name: 'UserData' }">Moje konto</router-link></li>
              <li v-if="$store.getters.role === 'admin'"><router-link class="dropdown-item" :to="{ name: 'AdminPanel' }">Panel admina</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!$store.getters.token">
            <router-link class="nav-link" :to="{ name: 'Register' }">Rejestracja</router-link>
          </li>
          <li class="nav-item" v-if="!$store.getters.token">
            <router-link class="nav-link" :to="{ name: 'Login' }">Logowanie</router-link>
          </li>
          <li class="nav-item" v-if="$store.getters.token">
            <a class="nav-link" href="#" @click="logout()">Wyloguj</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.commit('clearUserData')
      this.$router.push('/')
      this.showSuccess('Wylogowano.')
    }
  }
}
</script>