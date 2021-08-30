<template>
  <div class="container">
    <PatientForm title="Zarejestruj się" submitText="Zarejestruj" type="create"/>
  </div>
</template>

<script>
import PatientForm from '../components/PatientForm.vue'
export default {
  name: 'Registration',
  components: {
    PatientForm,
  },
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>

