<template>
  <div class="row">
    <div class="col">
        <div class="con-auto form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="dayName" v-model="isChecked">
        <label class="form-check-label" :for="dayName">{{ dayName }}</label>
      </div>
    </div>
    <div class="col" v-if="isChecked">
      <vue-timepicker 
        v-model="startTime"
        hide-disabled-hours
        close-on-complete
        fixed-dropdown-button
        :hour-range="[['6', getMaxHour()]]">
      </vue-timepicker>
    </div>
    <div class="col" v-if="isChecked">
      <vue-timepicker 
        v-model="endTime"
        hide-disabled-hours
        close-on-complete
        fixed-dropdown-button
        :hour-range="[[getMinHour(), '18']]">
      </vue-timepicker>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
export default {
  name: 'WorkDay',
  components: {
    VueTimepicker
  },
  props: {
    hours: {
      type: Object,
      default() {
        return {
          startTime: '',
          endTime: ''
        }
      }
    },
    dayName: String,
    dayValue: String,
  },
  data() {
    return {
      isChecked: this.hours.startTime && this.hours.endTime ? true : false,
      startTime: this.hours.startTime,
      endTime: this.hours.endTime
    }
  },
  methods: {
    getMinHour() {
      return this.startTime ? this.startTime.split(':')[0] : '6'
    },
    getMaxHour() {
      return this.endTime ? this.endTime.split(':')[0] : '18'
    }
  }
}
</script>