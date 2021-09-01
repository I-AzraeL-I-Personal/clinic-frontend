<template>
  <h2 class="text-left">{{ title }}</h2>
  <form @submit.prevent="sendRequest" div class="w-50">
    <fieldset>
      <legend class="h5">Dane logowania</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" v-model="request.registerUser.email">
        <label for="email">E-mail</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="password" id="password" v-model="request.registerUser.password">
        <label for="password">Hasło</label>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane osobowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="firstName" v-model="request.register.firstName">
        <label for="firstName">Imię</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="middleName" v-model="request.register.middleName">
        <label for="middleName">Drugie imię</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="lastName" v-model="request.register.lastName">
        <label for="lastName">Nazwisko</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="pesel" v-model="request.register.pesel">
        <label for="pesel">PESEL</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="date" id="birthDate" v-model="request.register.birthDate">
        <label for="birthDate">Data urodzenia</label>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" id="gender" v-model='request.register.gender'>
          <option selected value="MALE">Mężczyzna</option>
          <option value="FEMALE">Kobieta</option>
        </select>
        <label for="gender">Płeć</label>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane kontaktowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="phoneNumber" v-model="request.register.contactDto.phoneNumber">
        <label for="phoneNumber">Nr. telefonu</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="city" v-model="request.register.contactDto.city">
        <label for="city">Miasto</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="street" v-model="request.register.contactDto.street">
        <label for="street">Ulica</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="houseNum" v-model="request.register.contactDto.houseNum">
        <label for="houseNum">Nr. mieszkania</label>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" id="voivodeship" v-model="request.register.contactDto.voivodeshipDto.id">
          <option v-for="voivodeship in voivodeshipDto" :key="voivodeship.id" :value="voivodeship.id">{{ voivodeship.voivodeshipName }}</option>
        </select>
        <label for="voivodeship">Województwo</label>
      </div>
    </fieldset>
    <div class="mb-3">
      <button class="btn btn-primary" type="submit">{{ submitText }}</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PatientForm',
  props: {
    title: String,
    submitText: String,
    type: String,
    userData: {
      type: Object,
      default() {
        return {
          registerUser: {
            email: '',
            password: '',
            role: 'patient'
          },
          register: {
            patientUUID: '',
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: new Date().toISOString().split('T')[0],
            pesel: '',
            gender: '',
            contactDto: {
              phoneNumber: '',
              voivodeshipDto: {
                id: ''
              },
              city: '',
              street: '',
              houseNum: ''
            }
          }
        }
      }
    }
  },
  created() {
    this.fetchVoivodeships()
  },
  data() {
    return {
      voivodeshipDto: [
        { id: '', voivodeshipName: '' }
      ],
      request: this.userData,
    }
  },
  methods: {
    async sendRequest() {
      try {
        if (this.type === 'create') {
        const response = await axios.post('/auth/users', this.request.registerUser)
        const responseData = response.data

        const config = { headers: { Authorization: responseData.token } }
        this.request.register.patientUUID = responseData.userUUID

        const response2 = await axios.post('/patient', this.request.register, config)
        } else if (this.type === 'update') {
          await axios.patch('/auth/users' + this.$store.state.userData.userUUID, this.request.registerUser)
          await axios.put('/patient' + this.$store.state.userData.userUUID, this.request.register)
        }
      } catch(error) {
        this.showError('Wysyłanie formularza nie powiodło się: ' + error.response.status)
      }
    },
    async fetchVoivodeships() {
      try {
        const response = await axios.get('/patient/voivodeships')
        this.voivodeshipDto = response.data
      } catch(error) {
        this.showError('Błąd serwera: ' + error.response.status)
      }
    }
  },
}
</script>