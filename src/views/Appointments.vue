<template>
  <div class="container mt-3">
    <h2 class="text-left">Wyszukaj wizytę</h2>
    <form @submit.prevent="sendFindRequest" class="row g-3">
      <div class="col-md-6 form-floating">
        <input class="form-control" type="date" id="appointmentDate" v-model="request.appointment.date">
        <label for="appointmentDate">Data</label>
      </div>
      <div class="col-md-6 form-floating">
        <select class="form-select" id="doctorName" v-model='request.appointment.doctor'>
          <option v-for="doctor in doctorDto" :key="doctor.doctorUUID" :value="doctor.doctorUUID">{{ `dr ${doctor.firstName} ${doctor.middleName} ${doctor.lastName}` }}</option>
        </select>
        <label for="doctorName">Lekarz</label>
      </div>
      <div class="col-12">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="visit-type" id="visit-default" autocomplete="off" v-model='request.appointment.type' value="BASIC" checked>
          <label class="btn btn-outline-primary" for="visit-default">Zwykła</label>
          <input type="radio" class="btn-check" name="visit-type" id="visit-specialist" autocomplete="off" v-model='request.appointment.type' value="SPECIALIST">
          <label class="btn btn-outline-primary" for="visit-specialist">Specjalistyczna</label>
        </div>
        <button class="btn btn-secondary" type="submit">Szukaj</button>
      </div>
    </form>
    <div class="mt-5" v-if="response.visible">
      <h3 class="text-left" v-if="response.valid">Wizyty na dzień {{ response.data.date }}</h3>
      <h3 class="text-left" v-else>Nie znaleziono wolnych terminów</h3>
      <transition name="fade" mode="out-in" appear>
        <table class="table table-hover" v-if="response.valid">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Początek</th>
              <th scope="col">Koniec</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in response.data.appointments" v-bind:key="appointment">
              <th scope="row">{{ index }}</th>
              <td>{{ appointment.start }}</td>
              <td>{{ appointment.end }}</td>
              <td><button class="btn btn-primary" @click="sendMakeAppointmentRequest(appointment.start)">Zapisz się</button></td>
            </tr>
          </tbody>
        </table>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Appointments',
  created() {
    this.fetchBasicDoctorsData()
  },
  data() {
    return {
      doctorDto: [
        { doctorUUID: '', firstName: '', middleName: '', lastName: '' }
      ],
      request: {
        appointment: {
          date: new Date().toISOString().split('T')[0],
          doctor: '',
          type: 'BASIC'
        }
      },
      response: {
        data: {
          date: Date,
          appointments: [
            { start: Date, end: Date }
          ]
        },
        valid: false,
        visible: false
      },
    }
  },
  methods: {
    async sendFindRequest() {
      try {
        const response = await axios.get('/appointment/find', { 
          params: { 
            doctorUUID: this.request.appointment.doctor, 
            date: this.request.appointment.date, 
            type: this.request.appointment.type 
          } 
        })
        this.response.data = response.data
        this.response.valid = this.response.data.appointments.length > 0
      } catch(error) {
        this.response.valid = false
      }
      this.response.visible = true
    },
    async sendMakeAppointmentRequest(appointmentStartHour) {
      try {
        const request = {
          date: this.request.appointment.date,
          startHour: appointmentStartHour,
          type: this.request.appointment.type,
          patientUUID: this.$store.getters.uuid,
          doctorDto: { doctorUUID: this.request.appointment.doctor }
        }
        await axios.post('/appointment', request)
        this.response.visible = false
        this.showSuccess('Pomyślnie dokonano rezerwacji.')
      } catch(error) {
        this.showError('Nie udało się wykonać rezerwacji: ' + error.response.status)
      }
    },
    async fetchBasicDoctorsData() {
      try {
        const response = await axios.get('/doctor')
        this.doctorDto = response.data
      } catch(error) {
        this.showError('Błąd serwera: ' + error.response.status)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>