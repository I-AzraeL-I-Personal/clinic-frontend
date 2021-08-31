<template>
  <div class="container">
    <h2 class="text-left">Moje wizyty</h2>
    <div class="btn-group d-flex" role="group">
      <input type="radio" class="btn-check" id="future-appointments" autocomplete="off" v-model='selectedView' value="future" checked>
      <label class="btn btn-outline-secondary" for="future-appointments">Zaplanowane wizyty</label>
      <input type="radio" class="btn-check" id="past-appointments" autocomplete="off" v-model='selectedView' value="past">
      <label class="btn btn-outline-secondary" for="past-appointments">Zakończone wizyty</label>
    </div>
    <transition name="fade" mode="out-in" appear>
      <table class="table table-hover" v-if="isResponseValid">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Początek</th>
            <th scope="col">Koniec</th>
            <th scope="col">Typ wizyty</th>
            <th scope="col">Lekarz</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filterAppointments" v-bind:key="appointment">
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.startHour }}</td>
            <td>{{ appointment.endHour }}</td>
            <td>{{ appointment.type == 'BASIC' ? 'Zwykła' : 'Specjalistyczna' }}</td>
            <td>{{ `dr ${appointment.doctorDto.firstName} ${appointment.doctorDto.middleName} ${appointment.doctorDto.lastName}` }}</td>
            <td><button class="btn btn-primary" @click="redirectToDetails(appointment.id)">Szczegóły</button></td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserAppointments',
  created() {
    this.fetchUserAppointments()
  },
  data() {
    return {
      appointments: [
        { date: '', startHour: '', endHour: '', type: '', doctorDto: { doctorUUID: '', firstName: '', middleName: '', lastName: '' } }
      ],
      isResponseValid: false,
      selectedView: 'future'
    }
  },
  computed: {
    filterAppointments() {
      const dateNow = new Date()
      if (this.selectedView === 'future') {
        return this.appointments.filter(appointment => new Date(appointment.date + ' ' + appointment.startHour) >= dateNow)
      } else if (this.selectedView === 'past') {
        return this.appointments.filter(appointment => new Date(appointment.date + ' ' + appointment.startHour) < dateNow)
      }
    }
  },
  methods: {
    async fetchUserAppointments() {
      try {
        const response = await axios.get(`/appointment/${this.$store.state.userData.role}/${this.$store.state.userData.userUUID}`)
        this.appointments = response.data
        this.isResponseValid = true
      } catch(error) {
        this.isResponseValid = false
        this.showError('Nie udało się pobrać danych dotyczących rezerwacji: ' + error.response.status)
      }
    },
    redirectToDetails(appointmentId) {
      this.$router.push({ 
        name: 'AppointmentDetails', 
        query: { 
          appointmentId: appointmentId, 
          patientUUID: this.$store.state.userData.userUUID 
        } 
      })
    }
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>
