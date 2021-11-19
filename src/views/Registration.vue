<template>
  <div class="container mt-3">
    <UserForm title="Zarejestruj się" submitText="Zarejestruj" type="create" role="patient"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
  name: 'Registration',
  components: {
    UserForm
  },
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>

