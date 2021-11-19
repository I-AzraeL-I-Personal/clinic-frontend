<template>
  <h2 class="text-left">{{ title }}</h2>
  <form @submit.prevent="sendRequest" div class="w-50">
    <fieldset>
      <legend class="h5">Dane logowania</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('email', 'registerUser')" type="text" v-model="registerUser.email" @blur="v$.registerUser.email.$touch" required>
        <label for="email">E-mail</label>
        <div class="invalid-feedback" v-if="v$.registerUser.email.$error">Nieprawidłowy format adresu e-mail</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('password', 'registerUser')" type="password" id="password" v-model="registerUser.password" @blur="v$.registerUser.password.$touch" required>
        <label for="password">Hasło</label>
        <div class="invalid-feedback" v-if="v$.registerUser.password.$error">Hasło musi mieć od 8 do 16 znaków</div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane osobowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('firstName')" type="text" id="firstName" v-model="register.firstName" @blur="v$.register.firstName.$touch" required>
        <label for="firstName">Imię</label>
        <div class="invalid-feedback" v-if="v$.register.firstName.$error">Pole imię nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="middleName" v-model="register.middleName">
        <label for="middleName">Drugie imię</label>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('lastName')" type="text" id="lastName" v-model="register.lastName" @blur="v$.register.lastName.$touch" required>
        <label for="lastName">Nazwisko</label>
        <div class="invalid-feedback" v-if="v$.register.firstName.$error">Pole nazwisko nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('pesel')" type="text" id="pesel" v-model="register.pesel" @blur="v$.register.pesel.$touch" required>
        <label for="pesel">PESEL</label>
        <div class="invalid-feedback" v-if="v$.register.pesel.$error">Nieprawidłowy format numeru PESEL</div>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" :class="getClass('gender')" id="gender" v-model="register.gender" @blur="v$.register.gender.$touch" required>
          <option value="MALE">Mężczyzna</option>
          <option value="FEMALE">Kobieta</option>
        </select>
        <label for="gender">Płeć</label>
        <div class="invalid-feedback" v-if="v$.register.gender.$error">Nie wybrano płci</div>
      </div>
      <div class="mb-3 form-floating" v-if="role === 'doctor'">
        <input class="form-control" :class="getClass('employmentDate')" type="date" id="employmentDate" v-model="register.employmentDate" @blur="v$.register.employmentDate.$touch" required>
        <label for="employmentDate">Data zatrudnienia</label>
        <div class="invalid-feedback" v-if="v$.register.employmentDate.$error">Nieprawidłowa data zatrudnienia</div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="h5">Dane kontaktowe</legend>
      <hr>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('phoneNumber', 'register', 'contact')" type="text" id="phoneNumber" v-model="register.contact.phoneNumber" @blur="v$.register.contact.phoneNumber.$touch" required>
        <label for="phoneNumber">Nr. telefonu</label>
        <div class="invalid-feedback" v-if="v$.register.contact.phoneNumber.$error">Nieprawidłowy numer telefonu</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('city', 'register', 'contact')" type="text" id="city" v-model="register.contact.city" @blur="v$.register.contact.city.$touch" required>
        <label for="city">Miasto</label>
        <div class="invalid-feedback" v-if="v$.register.contact.city.$error">Pole miasto nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('street', 'register', 'contact')" type="text" id="street" v-model="register.contact.street" @blur="v$.register.contact.street.$touch" required>
        <label for="street">Ulica</label>
        <div class="invalid-feedback" v-if="v$.register.contact.street.$error">Pole ulica nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" :class="getClass('houseNum', 'register', 'contact')" type="text" id="houseNum" v-model="register.contact.houseNum" @blur="v$.register.contact.houseNum.$touch" required>
        <label for="houseNum">Numer domu</label>
        <div class="invalid-feedback" v-if="v$.register.contact.houseNum.$error">Pole numer domu nie może być puste</div>
      </div>
      <div class="mb-3 form-floating">
        <input class="form-control" type="text" id="flatNum" v-model="register.contact.flatNum">
        <label for="flatNum">Numer mieszkania</label>
      </div>
      <div class="mb-3 form-floating">
        <select class="form-select" :class="v$.register.contact.voivodeship.id.$error ? 'is-invalid' : (v$.register.contact.voivodeship.id.$dirty ? 'is-valid' : '')" @blur="v$.register.contact.voivodeship.id.$touch" id="voivodeship" v-model="register.contact.voivodeship.id" required>
          <option v-for="voivodeship in voivodeship" :key="voivodeship.id" :value="voivodeship.id">{{ voivodeship.voivodeshipName }}</option>
        </select>
        <label for="voivodeship">Województwo</label>
        <div class="invalid-feedback" v-if="v$.register.contact.voivodeship.id.$error">Nie wybrano województwa</div>
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
import { required, requiredIf, email, minLength, maxLength, numeric } from '@vuelidate/validators'
export default {
  name: 'UserForm',
  props: {
    title: String,
    submitText: String,
    type: String,
    role: String
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
      voivodeship: [
        { id: '', voivodeshipName: '' }
      ],
      registerUser: {
        email: '',
        password: '',
        role: this.role
      },
      register: {
        doctorUUID: '',
        patientUUID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        employmentDate: new Date().toISOString().split('T')[0],
        pesel: '',
        gender: '',
        contact: {
          phoneNumber: '',
          voivodeship: { id: '' },
          city: '',
          street: '',
          houseNum: '',
          flatNum: ''
        }
      }
    }
  },
  validations() {
    return {
      registerUser: {
        email: { required, email },
        password: { required, min: minLength(8), max: maxLength(16) },
      },
      register: {
        firstName: { required },
        lastName: { required },
        employmentDate: { required: requiredIf(() => this.role === 'doctor') },
        pesel: { required, numeric, min: minLength(11), max: maxLength(11) },
        gender: { required },
        contact: {
          phoneNumber: { required, numeric },
          voivodeship: { id: { required } },
          city: { required },
          street: { required },
          houseNum: { required }
        },
      }
    }
  },
  methods: {
    async sendRequest() {
      try {
        if (this.type === 'create') {
          const response = await axios.post('/auth/users', this.registerUser)
          const responseData = response.data

          const config = { headers: { Authorization: responseData.token } }
          this.register.doctorUUID = responseData.userUUID
          this.register.patientUUID = responseData.userUUID

          await axios.post(`/${this.role}`, this.register, config)
          this.$router.push('/')
        } else if (this.type === 'update') {
          const userResponse = await axios.put(`/auth/users/${this.$store.getters.uuid}`, this.registerUser)
          const response = await axios.put(`/${this.role}/${this.$store.getters.uuid}`, this.register)
          this.registerUser = userResponse.data
          this.register = response.data
        }
        this.showSuccess('Sukces')
      } catch(error) {
        this.showError('Wysyłanie formularza nie powiodło się: ' + error.response.status)
      }
    },
    async fetchVoivodeships() {
      try {
        const response = await axios.get(`/${this.role}/voivodeships`)
        this.voivodeship = response.data
      } catch(error) {
        this.showError('Błąd serwera: ' + error.response.status)
      }
    },
    async fetchUserData() {
      try {
        const response = await axios.get(`/${this.role}/${this.$store.getters.uuid}/with-contact`)
        this.registerUser = { 
          email: this.$store.getters.email, 
          password: '', 
          role: this.role
        },
        this.register = response.data
      } catch (error) {
        this.showError('Nie udało się pobrać danych użytkownika: ' + error.response.status)
      }
    },
    getClass(field, root = 'register', parent = '') {
      const isError = parent ? this.v$[root][parent][field].$error : this.v$[root][field].$error
      const isDirty = parent ? this.v$[root][parent][field].$dirty : this.v$[root][field].$dirty
      return isError ? 'is-invalid' : (isDirty ? 'is-valid' : '')
    },
  },
}
</script>