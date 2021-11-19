<template>
  <div class="container mt-3">
    <UserForm title="Dane użytkownika" submitText="Aktualizuj" type="update" :role="$store.getters.role"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
  name: 'UserData',
  components: {
    UserForm
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>