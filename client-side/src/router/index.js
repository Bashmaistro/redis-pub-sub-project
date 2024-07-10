import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import SubscribeComponent from '@/components/SubscribeComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue'
import EventCreateComponent from '@/components/EventCreateComponent.vue'

const routes = [
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: RegisterComponent
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: SubscribeComponent,
     // Bu sayfa için kimlik doğrulama gerektiğini belirtmek için meta verisi
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreateComponent,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;