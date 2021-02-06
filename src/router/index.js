import { createRouter, createWebHistory } from 'vue-router';

const routes = [
   { 
      path: '/:pathMatch(.*)*', 
      name: 'not-found', 
      component: () => import('../views/NotFound.vue')
   },
   {
      path: "/",
      name: "home",
      component: () => import('../views/HomePage.vue'),
   },
   {
      path: "/login",
      name: "login",
      component: () => import('../views/LoginPage.vue'),
   },
   {
      path: "/register",
      name: "register",
      component: () => import('../views/RegisterPage.vue'),
   },
   {
      path: "/profile",
      name: "profile",
      component: () => import('../views/ProfilePage.vue'),
   },
   {
      path: "/chat-home/:user_id",
      name: "chat-home",
      component: () => import('../views/ChatHome.vue'),
   },
   {
      path: "/invite-friend",
      name: "invite-friend",
      component: () => import('../views/InviteFriend.vue'),
   },
   {
      path: "/create-group",
      name: "create-group",
      component: () => import('../views/CreateGroup.vue'),
   },
   {
      path: "/chat-room/:user_peer_id",
      name: "chat-room",
      component: () => import('../views/ChatRoom.vue'),
   },
   {
      path: "/group-chat-room/:group_id",
      name: "group-chat-room",
      component: () => import('../views/ChatRoomGroup.vue'),
   },
   {
      path: "/group-description/:group_id",
      name: "group-description",
      component: () => import('../views/GroupDescription.vue'),
   },
   {
      path: "/friend-description/:user_id",
      name: "friend-description",
      component: () => import('../views/FriendDescription.vue'),
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
