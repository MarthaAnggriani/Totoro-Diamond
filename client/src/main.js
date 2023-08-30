import './main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '790004106933-l90he6ol6su7sircmuokqefekka7mtv4.apps.googleusercontent.com',
});

app.mount('#app')
