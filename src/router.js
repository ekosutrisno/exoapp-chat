import { createRouter, createWebHistory } from 'vue-router';

const routes = [
   {
      path: "/",
      name: "Home",
      component: () => import('./views/HomePage.vue'),
   },
   {
      path: "/login",
      name: "Login",
      component: () => import('./views/LoginPage.vue'),
   },
   {
      path: "/register",
      name: "Register",
      component: () => import('./views/RegisterPage.vue'),
   },
   {
      path: "/profile",
      name: "Profile",
      component: () => import('./views/ProfilePage.vue'),
   },
   {
      path: "/chat-home",
      name: "ChatHome",
      component: () => import('./views/ChatHome.vue'),
   },
   {
      path: "/invite-friend",
      name: "InviteFriend",
      component: () => import('./views/InviteFriend.vue'),
   },
   {
      path: "/create-group",
      name: "CreateGroup",
      component: () => import('./views/CreateGroup.vue'),
   },
   {
      path: "/chat-room",
      name: "ChatRoom",
      component: () => import('./views/ChatRoom.vue'),
   },
   {
      path: "/group-chat-room",
      name: "GroupChatRoom",
      component: () => import('./views/ChatRoomGroup.vue'),
   },
   {
      path: "/group-description",
      name: "GroupDescription",
      component: () => import('./views/GroupDescription.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
