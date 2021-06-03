<template>
  <div class="container">
    <h2 class="text-left">Wyszukaj wizytę</h2>
    <form @submit.prevent="sendRequest" class="row g-3">
      <div class="col-md-6">
        <label for="appointmentDate">Data</label>
        <input class="form-control" type="date" id="appointmentDate" v-model="requestData.appointmentDate">
      </div>
      <div class="col-md-6">
        <label for="doctorName">Lekarz</label>
        <select class="form-select" id="doctorName" v-model='requestData.doctorName'>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
      <div class="col-12">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="visit-type" id="visit-default" autocomplete="off" v-model='requestData.appointmentType' value="BASIC" checked>
          <label class="btn btn-outline-primary" for="visit-default">Zwykła</label>
          <input type="radio" class="btn-check" name="visit-type" id="visit-specialist" autocomplete="off" v-model='requestData.appointmentType' value="SPECIALIST">
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
              <td><button class="btn btn-primary" type="submit">Zapisz się</button></td>
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
  data() {
    return {
      requestData: {
        appointmentDate: new Date().toISOString().split('T')[0],
        doctorName: '1',
        appointmentType: 'BASIC',
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
      }
    }
  },
  methods: {
    async sendRequest() {
      const url = `/appointment/find/?id=${this.requestData.doctorName}&date=${this.requestData.appointmentDate}&type=${this.requestData.appointmentType}`
      try {
        const response = await axios.get(url)
        this.response.data = response.data
        this.response.valid = this.response.data.appointments.length > 0
      } catch(error) {
        this.response.valid = false
      }
      this.response.visible = true
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>