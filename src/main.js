import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ProjectPage from './views/ProjectPage.vue';
import UserLogin from "./components/UserLogin.vue"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import store from './store'; 

axios.defaults.baseURL = 'https://case-boost.test/api';

const routes = [
  { path: '/', component: HomePage },
  { path: '/projects', component: HomePage },
  { path: '/projects/:id', component: ProjectPage },
  { path: '/login', component: UserLogin },
  { path: '/project/all', component: HomePage },
  { path: '/project/:slug', component: HomePage },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
