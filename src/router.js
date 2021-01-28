import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ChatHome from './views/ChatHome.vue';
import InviteFriend from './views/InviteFriend.vue';

const routes = [
   {
      path: "/",
      name: "Home",
      component: HomePage,
   },
   {
      path: "/login",
      name: "Login",
      component: LoginPage,
   },
   {
      path: "/register",
      name: "Register",
      component: RegisterPage,
   },
   {
      path: "/chat-home",
      name: "ChatHome",
      component: ChatHome,
   },
   {
      path: "/invite-friend",
      name: "InviteFriend",
      component: InviteFriend,
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
