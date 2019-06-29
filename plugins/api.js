import Vue from 'vue'
import axios from 'axios'
import * as apis from '@/services/api'

// Set Base URL for APIs
// Note: Remove '/v1' in Login API
axios.defaults.baseURL = `${process.env.apiHost}/v1`

Vue.prototype.$api = apis
Vue.prototype.$http = axios
