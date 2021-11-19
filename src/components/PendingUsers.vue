<template>
  <table class="table table-hover" v-if="isResponseValid">
    <thead>
      <tr>
        <th scope="col">UUID</th>
        <th scope="col">E-mail</th>
        <th scope="col">Rola</th>
        <th scope="col">Akcja</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" v-bind:key="user">
        <td>{{ user.userUUID }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role === "patient" ? "Pacjent" : "Lekarz" }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-success" @click="sendEnableUserRequest(user.userUUID)"><i class="bi bi-check-lg"></i></button>
            <button class="btn btn-danger" @click="sendDeleteUserRequest(user.userUUID)"><i class="bi bi-x-lg"></i></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PendingUsers',
  created() {
      this.fetchNotEnabledUsers()
  },
  data() {
    return {
      users: [ 
        { userUUID: '', email: '', role: '' } 
      ],
      isResponseValid: false, 
    }
  },
  methods: {
    async fetchNotEnabledUsers() {
      try {
        const response = await axios.get('/auth/users/pending')
        this.users = response.data
        this.isResponseValid = true
      } catch(error) {
        this.isResponseValid = false
        this.showError('Nie udało się pobrać użytkowników: ' + error.response.status)
      }
    },
    async sendEnableUserRequest(userUUID) {
      try {
        await axios.put('/auth/users/' + userUUID)
        this.showSuccess('Użytkownik aktywowany.')
        this.users = this.users.filter(user => user.userUUID !== userUUID)
      } catch(error) {
        this.showError('Nie udało się aktywować użytkownika: ' + error.response.status)
      }
    },
    async sendDeleteUserRequest(userUUID) {
      try {
        await axios.delete('/auth/users/' + userUUID)
        this.showSuccess('Użytkownik usunięty z systemu autentykacji.')
        this.users = this.users.filter(user => user.userUUID !== userUUID)
        await axios.delete('/patient/' + userUUID)
        this.showSuccess('Użytkownik usunięty z systemu głównego.')
      } catch(error) {
        this.showError('Nie udało się usunąć użytkownika z systemu: ' + error.response.status)
      }
    }
  }
}
</script>