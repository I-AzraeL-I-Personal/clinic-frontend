<template>
  <div class="container">
    <UserForm title="Dane użytkownika" submitText="Aktualizuj" :userData="responseData" v-if="responseData"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
import axios from 'axios'
export default {
  name: 'UserData',
  components: {
    UserForm,
  },
  created() {
    this.fetchUserData()
  },
  data() {
    return {
      responseData: '',
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('/patient/' + this.$store.state.userData.userUUID)
        this.responseData = {
          registerUser: { 
            email: this.$store.state.userData.email, 
            password: '', 
            role: this.$store.state.userData.role 
          },
          register: response.data
        }
      } catch (error) {
        this.showError('Nie udało się pobrać danych użytkownika.')
      }
    }
  },
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>