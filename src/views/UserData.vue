<template>
  <div class="container">
    <div id="form-type" v-if="responseData">
      <PatientForm title="Dane użytkownika" submitText="Aktualizuj" :userData="responseData" type="update" v-if="responseData.registerUser.role === 'patient'"/>
      <DoctorForm title="Dane użytkownika" submitText="Aktualizuj" :userData="responseData" type="update" v-if="responseData.registerUser.role === 'doctor'"/>
    </div>
  </div>
</template>

<script>
import PatientForm from '../components/PatientForm.vue'
import DoctorForm from '../components/DoctorForm.vue'
import axios from 'axios'
export default {
  name: 'UserData',
  components: {
    PatientForm,
    DoctorForm
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
        const response = await axios.get(`/${this.$store.state.userData.role}/` + this.$store.state.userData.userUUID)
        this.responseData = {
          registerUser: { 
            email: this.$store.state.userData.email, 
            password: '', 
            role: this.$store.state.userData.role 
          },
          register: response.data
        }
      } catch (error) {
        this.showError('Nie udało się pobrać danych użytkownika: ' + error.response.status)
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