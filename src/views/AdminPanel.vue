<template>
  <div class="container">
    <h2 class="text-left">Panel administratorski</h2>
    <div class="btn-group d-flex" role="group">
      <input type="radio" class="btn-check" id="pending-users" autocomplete="off" v-model='selectedView' value="pending" checked>
      <label class="btn btn-outline-secondary" for="pending-users">Oczekujący użytkownicy</label>
      <input type="radio" class="btn-check" id="todo" autocomplete="off" v-model='selectedView' value="todo">
      <label class="btn btn-outline-secondary" for="todo">todo</label>
    </div>
    <transition name="fade" mode="out-in" appear>
      <table class="table table-hover" v-if="isResponseValid">
        <thead>
          <tr>
            <th scope="col">UUID</th>
            <th scope="col">E-mail</th>
            <th scope="col">Rola</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user">
            <td>{{ user.userUUID }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role === 'patient' ? 'Pacjent' : 'Lekarz' }}</td>
            <td><button class="btn btn-primary" @click="sendEnableUserRequest(user.userUUID)">Aktywuj</button></td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdminPanel',
  created() {
    this.fetchNotEnabledUsers()
  },
  data() {
    return {
      users: [ 
        { userUUID: '', email: '', role: '' } 
      ],
      isResponseValid: false,
      selectedView: 'pending',
    }
  },
  methods: {
    async fetchNotEnabledUsers() {
      try {
        const response = await axios.get('/auth/users/pending/')
        this.users = response.data
        this.isResponseValid = true
      } catch(error) {
        console.log(error)
        this.isResponseValid = false
        this.showError('Nie udało się pobrać użytkowników.')
      }
    },
    async sendEnableUserRequest(userUUID) {
      try {
        await axios.put('/auth/users/' + userUUID)
        this.showSuccess('Użytkownik aktywowany.')
        this.users = this.users.filter(user => user.userUUID !== userUUID)
      } catch(error) {
        console.log(error)
        this.showError('Nie udało się aktywować użytkownika.')
      }
    }
  }
}
</script>