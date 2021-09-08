<template>
  <div class="container mt-3">
    <PatientForm title="Dane użytkownika" submitText="Aktualizuj" type="update" v-if="$store.getters.role === 'patient'"/>
    <DoctorForm title="Dane użytkownika" submitText="Aktualizuj" type="update" v-if="$store.getters.role === 'doctor'"/>
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