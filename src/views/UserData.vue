<template>
  <div class="container">
    <PatientForm title="Dane użytkownika" submitText="Aktualizuj" type="update" v-if="$store.state.userData.role === 'patient'"/>
    <DoctorForm title="Dane użytkownika" submitText="Aktualizuj" type="update" v-if="$store.state.userData.role === 'doctor'"/>
  </div>
</template>

<script>
import PatientForm from '../components/PatientForm.vue'
import DoctorForm from '../components/DoctorForm.vue'
export default {
  name: 'UserData',
  components: {
    PatientForm,
    DoctorForm
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>