<template>
  <h2 class="text-left">{{ title }}</h2>
  <form @submit.prevent="sendRequest" div class="w-50">
    <fieldset>
      <legend class="h5">Dane logowania</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('email', 'registerUser')" type="text" v-model="request.registerUser.email" @blur="v$.request.registerUser.email.$touch" required>
        <label for="email">E-mail</label>
        <div class="invalid-feedback" v-if="v$.request.registerUser.email.$error">Nieprawidłowy format adresu e-mail</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('password', 'registerUser')" type="password" id="password" v-model="request.registerUser.password" @blur="v$.request.registerUser.password.$touch" required>
        <label for="password">Hasło</label>
        <div class="invalid-feedback" v-if="v$.request.registerUser.password.$error">Hasło musi mieć od 8 do 16 znaków</div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane osobowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('firstName')" type="text" id="firstName" v-model="request.register.firstName" @blur="v$.request.register.firstName.$touch" required>
        <label for="firstName">Imię</label>
        <div class="invalid-feedback" v-if="v$.request.register.firstName.$error">Pole imię nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="middleName" v-model="request.register.middleName">
        <label for="middleName">Drugie imię</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('lastName')" type="text" id="lastName" v-model="request.register.lastName" @blur="v$.request.register.lastName.$touch" required>
        <label for="lastName">Nazwisko</label>
        <div class="invalid-feedback" v-if="v$.request.register.firstName.$error">Pole nazwisko nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('pesel')" type="text" id="pesel" v-model="request.register.pesel" @blur="v$.request.register.pesel.$touch" required>
        <label for="pesel">PESEL</label>
        <div class="invalid-feedback" v-if="v$.request.register.pesel.$error">Nieprawidłowy format numeru PESEL</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('birthDate')" type="date" id="birthDate" v-model="request.register.birthDate" @blur="v$.request.register.birthDate.$touch" required>
        <label for="birthDate">Data urodzenia</label>
        <div class="invalid-feedback" v-if="v$.request.register.birthDate.$error">Nieprawidłowa data urodzenia</div>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" :class="getClass('gender')" id="gender" v-model='request.register.gender' @blur="v$.request.register.gender.$touch" required>
          <option value="MALE">Mężczyzna</option>
          <option value="FEMALE">Kobieta</option>
        </select>
        <label for="gender">Płeć</label>
        <div class="invalid-feedback" v-if="v$.request.register.gender.$error">Nie wybrano płci</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('employmentDate')" type="date" id="employmentDate" v-model="request.register.employmentDate" @blur="v$.request.register.employmentDate.$touch" required>
        <label for="employmentDate">Data zatrudnienia</label>
        <div class="invalid-feedback" v-if="v$.request.register.employmentDate.$error">Nieprawidłowa data zatrudnienia</div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane kontaktowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('phoneNumber', 'register', 'contactDto')" type="text" id="phoneNumber" v-model="request.register.contactDto.phoneNumber" @blur="v$.request.register.contactDto.phoneNumber.$touch" required>
        <label for="phoneNumber">Nr. telefonu</label>
        <div class="invalid-feedback" v-if="v$.request.register.contactDto.phoneNumber.$error">Nieprawidłowy numer telefonu</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('city', 'register', 'contactDto')" type="text" id="city" v-model="request.register.contactDto.city" @blur="v$.request.register.contactDto.city.$touch" required>
        <label for="city">Miasto</label>
        <div class="invalid-feedback" v-if="v$.request.register.contactDto.city.$error">Pole miasto nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('street', 'register', 'contactDto')" type="text" id="street" v-model="request.register.contactDto.street" @blur="v$.request.register.contactDto.street.$touch" required>
        <label for="street">Ulica</label>
        <div class="invalid-feedback" v-if="v$.request.register.contactDto.street.$error">Pole ulica nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="houseNum" v-model="request.register.contactDto.houseNum">
        <label for="houseNum">Numer mieszkania</label>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" :class="v$.request.register.contactDto.voivodeshipDto.id.$error ? 'is-invalid' : (v$.request.register.contactDto.voivodeshipDto.id.$dirty ? 'is-valid' : '')" @blur="v$.request.register.contactDto.voivodeshipDto.id.$touch" id="voivodeship" v-model="request.register.contactDto.voivodeshipDto.id" required>
          <option v-for="voivodeship in voivodeshipDto" :key="voivodeship.id" :value="voivodeship.id">{{ voivodeship.voivodeshipName }}</option>
        </select>
        <label for="voivodeship">Województwo</label>
        <div class="invalid-feedback" v-if="v$.request.register.contactDto.voivodeshipDto.id.$error">Nie wybrano województwa</div>
      </div>
    </fieldset>
    <div class="mb-3">
      <button class="btn btn-primary" type="submit">{{ submitText }}</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, numeric } from '@vuelidate/validators'
export default {
  name: 'DoctorForm',
  props: {
    title: String,
    submitText: String,
    type: String,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  created() {
    this.fetchVoivodeships()
    if (this.type === 'update') {
      this.fetchUserData()
    }
  },
  data() {
    return {
      voivodeshipDto: [
        { id: '', voivodeshipName: '' }
      ],
      request: {
        registerUser: {
          email: '',
          password: '',
          role: 'doctor'
        },
        register: {
          doctorUUID: '',
          firstName: '',
          middleName: '',
          lastName: '',
          birthDate: new Date().toISOString().split('T')[0],
          employmentDate: new Date().toISOString().split('T')[0],
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
  },
  validations() {
    return {
      request: {
        registerUser: {
          email: { required, email },
          password: { required, min: minLength(8), max: maxLength(16) },
        },
        register: {
          firstName: { required },
          lastName: { required },
          birthDate: { required, notInFuture: (value) => new Date(value) < new Date() },
          employmentDate: { required },
          pesel: { required, numeric, min: minLength(11), max: maxLength(11) },
          gender: { required },
          contactDto: {
            phoneNumber: { required, numeric },
            voivodeshipDto: { id: { required } },
            city: { required },
            street: { required }
          },
        }
      }
    }
  },
  methods: {
    async sendRequest() {
      try {
        if (this.type === 'create') {
          const response = await axios.post('/auth/users', this.request.registerUser)
          const responseData = response.data

          const config = { headers: { Authorization: responseData.token } }
          this.request.register.doctorUUID = responseData.userUUID

          await axios.post(`/doctor`, this.request.register, config)
          this.$forceUpdate()
        } else if (this.type === 'update') {
          const userResponse = await axios.patch('/auth/users/' + this.$store.getters.uuid, this.request.registerUser)
          const doctorResponse = await axios.put('/doctor/' + this.$store.getters.uuid, this.request.register)
          this.request.registerUser = userResponse.data
          this.request.register = doctorResponse.data
        }
      } catch(error) {
        this.showError('Wysyłanie formularza nie powiodło się: ' + error.response.status)
      }
    },
    async fetchVoivodeships() {
      try {
        const response = await axios.get('/doctor/voivodeships')
        this.voivodeshipDto = response.data
      } catch(error) {
        this.showError('Błąd serwera: ' + error.response.status)
      }
    },
    async fetchUserData() {
      try {
        const response = await axios.get(`/${this.$store.getters.role}/${this.$store.getters.uuid}`)
        this.request = {
          registerUser: { 
            email: this.$store.getters.email, 
            password: '', 
            role: this.$store.getters.role 
          },
          register: response.data
        }
      } catch (error) {
        this.showError('Nie udało się pobrać danych użytkownika: ' + error.response.status)
      }
    },
    getClass(field, root = 'register', parent = '') {
      const isError = parent ? this.v$.request[root][parent][field].$error : this.v$.request[root][field].$error
      const isDirty = parent ? this.v$.request[root][parent][field].$dirty : this.v$.request[root][field].$dirty
      return isError ? 'is-invalid' : (isDirty ? 'is-valid' : '')
    },
  },
}
</script>