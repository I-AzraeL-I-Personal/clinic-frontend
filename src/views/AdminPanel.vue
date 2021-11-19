<template>
  <div class="container mt-3">
    <h2 class="text-left">Panel administratora</h2>
    <div class="btn-group d-flex" role="group">
      <input type="radio" class="btn-check" id="pending-users" autocomplete="off" v-model='selectedView' value="pending" checked>
      <label class="btn btn-outline-secondary" for="pending-users">Oczekujący użytkownicy</label>
      <input type="radio" class="btn-check" id="add-doctor" autocomplete="off" v-model='selectedView' value="add-doctor">
      <label class="btn btn-outline-secondary" for="add-doctor">Dodaj lekarza</label>
    </div>
    <PendingUsers v-if="selectedView === 'pending'"/>
    <UserForm title="" submitText="Dodaj" type="create" role="doctor" v-if="selectedView === 'add-doctor'"/>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
import PendingUsers from '../components/PendingUsers.vue'
export default {
  name: 'AdminPanel',
  components: {
    UserForm,
    PendingUsers
  },
  data() {
    return {
      selectedView: 'pending'
    }
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>