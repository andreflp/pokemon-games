import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#ffc107',
  failedColor: '#874b4b',
  thickness: '4px',
  autoRevert: true,
  location: 'top',
  inverse: false,
  autoFinish: false
}

Vue.use(VueProgressBar, options)