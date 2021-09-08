<template>
  <div>
    <img src="@/assets/home.jpg" class="img-fluid" alt="">
    <div class="container mt-5">
      <div class="row row-cols-2 row-cols-md-2 g-4">
        <div class="col" v-if="!$store.getters.token">
          <div class="card text-center">
            <img src="@/assets/register.svg" class="card-img-top" alt="" width="200" height="200">
            <div class="card-body">
              <h5 class="card-title">Nie masz konta?</h5>
              <router-link class="btn btn-primary" :to="{ name: 'Register' }">Zarejestruj się</router-link>
            </div>
          </div>
        </div>
        <div class="col" v-if="!$store.getters.token">
          <div class="card text-center">
            <img src="@/assets/login.svg" class="card-img-top" alt="" width="200" height="200">
            <div class="card-body">
              <h5 class="card-title">Masz już konto?</h5>
              <router-link class="btn btn-primary" :to="{ name: 'Login' }">Zaloguj się</router-link>
            </div>
          </div>
        </div>
        <div class="col" v-if="$store.getters.token">
          <div class="card text-center">
            <img src="@/assets/calendar-check.svg" class="card-img-top" alt="" width="200" height="200">
            <div class="card-body">
              <h5 class="card-title">Potrzebujesz porady lekarskiej?</h5>
              <router-link class="btn btn-primary" :to="{ name: 'Appoint' }">Wyszukaj wizytę</router-link>
            </div>
          </div>
        </div>
        <div class="col" v-if="$store.getters.token">
          <div class="card text-center">
            <img src="@/assets/calendar4-week.svg" class="card-img-top" alt="" width="200" height="200">
            <div class="card-body">
              <h5 class="card-title">Chcesz zobaczyć szczegóły ostatniej wizyty?</h5>
              <router-link class="btn btn-primary" :to="{ name: 'UserAppointments' }">Przejdź do listy</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <h2>Kontakt</h2>
        <div class="card mt-3">
          <div class="card-body text-center">
            <div class="row row-cols-3">
              <div class="col">
                <h5 class="card-title">Godziny otwarcia</h5>
                <p class="card-text">
                  Pon - Pt: 08:00 - 18:00<br/>
                  Sob - Nd: nieczynne</p>
              </div>
              <div class="col">
                <h5 class="card-title">Adres</h5>
                <p class="card-text">Zielona 1, Łódź</p>
              </div>
              <div class="col">
                <h5 class="card-title">Telefon</h5>
                <p class="card-text">111111111</p>
              </div>
            </div>
            <div class="row mt-5">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.9426895884153!2d19.45326881577967!3d51.770654879679235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcad682b8edf9%3A0x8d8eccb3298c2a6e!2zWmllbG9uYSAxLCA5MC0wMDEgxYHDs2TFug!5e0!3m2!1spl!2spl!4v1631126676409!5m2!1spl!2spl" 
                allowfullscreen="" width="100%" height="500px">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>
