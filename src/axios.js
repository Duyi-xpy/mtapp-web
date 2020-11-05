import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:23331/'
axios.interceptors.request.use(function (config) {
  config.params = {
    ...config.params,
    appkey: 'lulu_1581597310788'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
