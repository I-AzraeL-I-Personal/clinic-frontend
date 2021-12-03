<template>
  <div class="container mt-3">
    <form @submit.prevent="updateDetails" div class="w-50">
      <h2 class="text-left">Szczegóły wizyty</h2>
      <div class="mb-4">
        <legend class="h5">Opis</legend>
        <hr>
        <textarea v-model="appointmentDetails.description" class="form-control" id="description" rows="3" :readonly="!isDoctor"></textarea>
      </div>
      <div class="mb-4">
        <legend class="h5">Recepta</legend>
        <hr>
        <div class="span mb-2">
          <button class="btn btn-success btn-sm" type="button" @click="downloadFile('prescription')" v-if="appointmentDetails.prescription"><i class="bi bi-file-earmark-arrow-down-fill">Pobierz</i></button>
          <h6 class="text-left" v-else>-</h6>
        </div>
        <input class="form-control form-control-sm" type="file" id="prescription" ref="prescription" @change="onFileUpload('prescription')" v-if="isDoctor">
      </div>
      <div class="mb-4">
        <legend class="h5">Załącznik</legend>
        <hr>
        <div class="span mb-2">
          <button class="btn btn-success btn-sm" type="button" @click="downloadFile('attachment')" v-if="appointmentDetails.attachment"><i class="bi bi-file-earmark-arrow-down-fill">Pobierz</i></button>
          <h6 class="text-left" v-else>-</h6>
        </div>
        <input class="form-control form-control-sm" type="file" id="attachment" ref="attachment" @change="onFileUpload('attachment')" v-if="isDoctor">
      </div>
      <div class="mb-4">
        <button class="btn btn-primary" type="submit" v-if="isDoctor">Zaktualizuj</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AppointmentDetails',
  props: {
    appointmentId: String
  },
  created() {
    this.fetchDetails()
  },
  data() {
    return {
      appointmentDetails: {
        description: '',
        prescription: '',
        attachment: ''
      },
      file: {
        attachment: null,
        prescription: null
      }
    }
  },
  methods: {
    async fetchDetails() {
      try {
        const response = await axios.get(`/appointment/${this.appointmentId}/details`)
        this.appointmentDetails = response.data
      } catch(error) {
        this.showError("Nie udało się pobrać szczegółowych danych: " + error.response.status)
      }
    },
    async updateDetails() {
      try {
        const formData = new FormData
        formData.append('details', new Blob([JSON.stringify(this.appointmentDetails)], { type: 'application/json' }))
        formData.append('prescription', this.file.prescription)
        formData.append('attachment', this.file.attachment)
        const response = await axios.post(`/appointment/${this.appointmentId}/details`, formData, {
          headers: { 'Content-Type': 'multipart/form-data'}
        })
        this.appointmentDetails = response.data
      } catch(error) {
        this.showError('Nie udało się zaktualizować danych: ' + error.response.status)
      }
    },
    onFileUpload(type) {
      this.file[type] = this.$refs[type].files[0]
    },
    async downloadFile(type) {
      try {
        const response = await axios.get(this.appointmentDetails[type], { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.download = this.appointmentDetails[type]
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch(error) {
        this.showError('Nie udało się pobrać pliku: ' + error.response.status)
      }
    }
  },
  computed: {
    isDoctor: function() {
      return this.$store.getters.role === 'doctor'
    }
  }
}
</script>

<style scoped>
  .container {
    padding-bottom: 60px;
  }
</style>