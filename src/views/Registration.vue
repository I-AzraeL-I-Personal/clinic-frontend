<template>
  <div class="container">
    <UserForm title="Zarejestruj się" submitText="Zarejestruj"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
  name: 'Registration',
  components: {
    UserForm,
  },
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>

