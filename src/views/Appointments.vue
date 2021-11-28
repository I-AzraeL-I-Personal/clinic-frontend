<template>
  <div class="container mt-3">
    <h2 class="text-left">Wyszukaj wizytę</h2>
    <form @submit.prevent="sendFindRequest" class="w-50">
      <fieldset>
        <div class="mb-3 form-floating">
          <select class="form-select" id="doctorName" v-model='request.appointment.doctor' :class="v$.request.appointment.doctor.$error ? 'is-invalid' : (v$.request.appointment.doctor.$dirty ? 'is-valid' : '')" @blur="v$.request.appointment.doctor.$touch" required>
            <option v-for="doctor in doctorDto" :key="doctor.doctorUUID" :value="doctor.doctorUUID">{{ `dr ${doctor.firstName} ${doctor.lastName}` }}</option>
          </select>
          <label for="doctorName">Lekarz</label>
          <div class="invalid-feedback" v-if="v$.request.appointment.doctor.$error">Nie wybrano lekarza</div>
        </div>
        <div class="mb-3 form-floating">
          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="visit-type" id="visit-default" autocomplete="off" v-model='request.appointment.type' value="BASIC" checked>
            <label class="btn btn-outline-primary" for="visit-default">Zwykła</label>
            <input type="radio" class="btn-check" name="visit-type" id="visit-specialist" autocomplete="off" v-model='request.appointment.type' value="SPECIALIST">
            <label class="btn btn-outline-primary" for="visit-specialist">Specjalistyczna</label>
          </div>
        </div>
      </fieldset>
      <div class="mb-3">
        <button class="btn btn-secondary" type="submit">Szukaj</button>
      </div>
    </form>
    <div class="mt-5" v-if="response.visible">
      <transition name="fade" mode="out-in" appear>
        <vue-cal
          active-view="week" 
          :disable-views="['years', 'year', 'month', 'day']"
          :time-from="8 * 60" 
          :time-to="16.25 * 60" 
          :time-step="15"
          :min-date="minDate"
          :events="appointmentsAsEvents"
          :on-event-click="sendMakeAppointmentRequest"
          @view-change="handleWeekChanged($event)"
          locale="pl"
          style="height: 100%">
        </vue-cal>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/pl.js'
import 'vue-cal/dist/vuecal.css'
import { startOfISOWeek, formatISO, addDays } from 'date-fns'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  name: 'Appointments',
  components: {
    VueCal
  },
  setup() {
    return { v$: useVuelidate() }
  },
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
          date: formatISO(startOfISOWeek(new Date()), { representation: 'date' }),
          doctor: '',
          type: 'BASIC'
        }
      },
      response: {
        appointments: [
          { start: Date, end: Date }
        ],
        valid: false,
        visible: false
      },
    }
  },
  validations() {
    return {
      request: {
        appointment: {
          doctor: { required }
        }
      },
    }
  },
  methods: {
    async sendFindRequest() {
      try {
        let endDate = formatISO(addDays(new Date(this.request.appointment.date), 4), { representation: 'date' })

        const response = await axios.get('/appointment/find', { 
          params: { 
            doctorUUID: this.request.appointment.doctor, 
            startDate: this.request.appointment.date,
            endDate: endDate,
            type: this.request.appointment.type 
          } 
        })
        this.response.appointments = response.data
        this.response.visible = true
      } catch(error) {
        this.showError('Nie udało się wyszukać wolnych rezerwacji: ' + error.response.status)
        this.response.visible = false
      }
    },
    async sendMakeAppointmentRequest(event) {
      try {
        const request = {
          date: formatISO(event.start, { representation: 'date' }),
          startHour: event.start.toLocaleTimeString(),
          type: this.request.appointment.type,
          patientUUID: this.$store.getters.uuid,
          doctorUUID: this.request.appointment.doctor
        }
        await axios.post('/appointment', request)
        this.response.visible = false
        this.showSuccess('Pomyślnie dokonano rezerwacji.')
        this.$router.push('/user-appointments')
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
    },
    handleWeekChanged($event) {
      this.request.appointment.date = formatISO(new Date($event.startDate), { representation: 'date' })
      this.sendFindRequest()
    }
  },
  computed: {
    minDate: function() {
      return new Date()
    },
    appointmentsAsEvents() {
      const events = []
      this.response.appointments.forEach(appointment => {
        events.push({
          start: appointment.start.replace('T', ' ').replace('Z', ' '),
          end: appointment.end.replace('T', ' ').replace('Z', ' '),
        })
      });
      return events
    }
  }
}
</script>

<style>
  .vuecal__event {
    border: 1px solid gray;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vuecal__menu {
    visibility: hidden;
  }
</style>

<style scoped>
  .container {
    padding-bottom: 60px;
    align-items: center;
  }
</style>