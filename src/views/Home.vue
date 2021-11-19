<template>
  <div>
    <img src="@/assets/home.jpg" class="img-fluid w-100" alt="">
    <div class="container mt-5">
      <div class="row row-cols-2 row-cols-md-2 g-4">
        <div class="col" v-if="!isToken">
          <HomeCard :cardTitle="'Nie masz konta?'" :linkToComponent="'Register'" :linkName="'Zarejestruj się'" :image="'register.svg'"/>
        </div>
        <div class="col" v-if="!isToken">
          <HomeCard :cardTitle="'Masz już konto?'" :linkToComponent="'Login'" :linkName="'Zaloguj się'" :image="'login.svg'"/>
        </div>
        <div class="col" v-if="isToken">
          <HomeCard :cardTitle="'Potrzebujesz porady lekarskiej?'" :linkToComponent="'Appoint'" :linkName="'Wyszukaj wizytę'" :image="'calendar-check.svg'"/>
        </div>
        <div class="col" v-if="isToken">
          <HomeCard :cardTitle="'Chcesz zobaczyć szczegóły ostatniej wizyty?'" :linkToComponent="'UserAppointments'" :linkName="'Przejdź do listy'" :image="'calendar4-week.svg'"/>
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
import HomeCard from '../components/HomeCard.vue'
export default {
  components: { HomeCard },
  name: 'Home',
  computed: {
    isToken: function() {
      return this.$store.getters.token
    },
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
  .img-fluid {
    width: 100%;
  }
</style>
