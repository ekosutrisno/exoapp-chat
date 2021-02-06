<template>
   <div class="h-screen w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
      <div class="h-auto mx-auto w-full p-4 overflow-y-auto nv-transition">
        <div class="mx-auto">
               <ChatIcon class="mx-auto"/>
        </div>
        <h1 class="text-center text-2xl mb-10 font-semibold text-gray-300">Welcome to ExoApp</h1>
        <div class="mx-auto w-full text-center mb-8">
          <router-link to="/login" class="py-3  px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
            Sign In
          </router-link>
        </div>
        <p class="text-center text-lg text-gray-300 my-2">New user? let's 
          <router-link to="/register" class="font-bold">
            Sign Up
          </router-link>
        </p>
        <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
      </div>
   </div>
</template>
<script>
import ChatIcon from '../components/svg/ChatIcon';

export default {
  components: {ChatIcon}
}
</script>
