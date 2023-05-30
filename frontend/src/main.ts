import { createApp } from 'vue'
import { router } from './router'
import { api } from './baseConfig'
import App from './App.vue'
import { AxiosError, AxiosResponse } from 'axios'

const app = createApp(App)
app.use(router)
app.mount('#app')


api.interceptors.response.use( (response: AxiosResponse) =>  response, function (error: AxiosError) {
  if(error.response && error.response.status == 404) {
    router.replace("/error")
  }
  return Promise.reject(error);
});