import { createApp } from 'vue'
import { router } from './router'
import { api } from './baseConfig'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')


api.interceptors.response.use( response =>  response, function (error) {
  if(error.response && error.response.status == 404) {
    router.replace("/error")
  }
  return Promise.reject(error);
});