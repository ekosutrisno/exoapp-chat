<template>
 <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
</div>
 <div class="min-h-screen h-screen overflow-y-auto w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
   <div class="flex px-4 fixed w-full top-0 max-w-screen-sm items-center bg-whatsapp-dark-300 text-gray-300 h-16 shadow-lg z-40">
      <svg @click="back" class="w-5 md:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
   </div>
   <div class="h-full px-4 pb-4 pt-20">
      <div class="mx-auto">
         <GroupIcon class="mx-auto"/>
      </div>
      <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">CREATE GROUP</h1>
      <h1 v-if="infoMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{infoMessage}}</h1>

      <div class="w-full flex flex-col pb-4">
         <input @keyup.enter="onCreateGroup" v-model="groupName" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Group Name" />
         <textarea v-model="groupDescriptions" class="py-2 px-4 text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="4" placeholder="Group Descriptions"></textarea>
         <button @click="onCreateGroup" type="button" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
            Create Group
         </button>
         <p class="text-left mt-6 text-sm text-gray-300">Hi <span class="font-semibold">{{ currentUsername }}</span>, you can add member of group. It should be noted that you can only invite the member who are also registered and use ExoApp.</p>
         
         <!-- List Group Member -->
         <div class="mt-4 text-gray-300">
            <button class="my-2 py-0.5 focus:outline-none font-semibold text-xs bg-green-600 text-left px-2 rounded-full">Members</button>
            <ul >
               <li v-for="(user, i) in members" :key="i">
                  <ListGroupMember class="nv-transition" @remove-member="removeGroupMember(user, i)"  :currentPeerUser="user"/>
               </li>
               <li v-if="members.length === 0" class="text-gray-300 text-center py-4">
                  <h1 class="p-2 bg-whatsapp-dark-200 rounded text-sm">This group No have a Member!, search bellow to add a member from your contact!</h1>
               </li>
            </ul>
         </div>
         <!-- List Friends -->
         <div class="mt-4 text-gray-300">
            <button class="my-2 py-0.5 focus:outline-none font-semibold text-xs bg-green-600 text-left px-2 rounded-full">Your Friends</button>
            <ul >
               <li v-for="(user, i) in friends" :key="i">
                  <ListGroupFriendCreate class="nv-transition" @add-member="addGroupMember(user, i)"  :currentPeerUser="user"/>
               </li>
               <li v-if="friends.length === 0" class="text-gray-300 text-center py-4">
                  <h1 class="mb-6">You No have more Friends!</h1>
                  <router-link to="/invite-friend" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                     Invite Friend
                  </router-link>
               </li>
            </ul>
         </div>
         <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
      </div>
   </div>
</div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import db from '../firebase';
import Spinner from '../components/Spinner.vue';
import ListGroupMember from '../components/ListGroupMember.vue';
import ListGroupFriendCreate from '../components/ListGroupFriendCreate.vue';
import GroupIcon from '../components/svg/GroupIcon.vue';

export default {
   components: { 
      Spinner,
      ListGroupMember,
      ListGroupFriendCreate,
      GroupIcon
   },
   setup(){
      const store = useStore();
      const router = useRouter();

      const state = reactive({
         groupName: '',
         groupDescriptions: '',
         infoMessage: '',
         isProcess: false,
         user_id: computed(() => store.getters.getUserId),
         currentUsername: localStorage.getItem('username'),
         friends: computed(() => store.state.friends.friends),
         members: [
            {
               user_id: computed(() => store.getters.getUserId),
               email: localStorage.getItem('email'),
               username: localStorage.getItem('username'),
               photo_url: localStorage.getItem('photo_url')
            }
         ]
      })

      const onCreateGroup = () => {

         if(state.groupName.trim() === ""){
            return;
         }

         let groupId = `${uuidv4()}`.toUpperCase();
         let createdDate = `${moment().format('l')} at ${moment().format('LT')}`;

         let groupData = {
               created_date: createdDate,
               group_name: state.groupName,
               group_description: state.groupDescriptions,
               admin_create_id: state.user_id,
               group_avatar: '',
               group_id: groupId,
               active: true
            };

         db.firestore()
            .collection('groups')
            .doc(groupId)
            .set(groupData)
            .then(() =>{
               state.members.forEach( member => {
                  db.firestore()
                  .collection('groups')
                  .doc(groupId)
                  .collection('members')
                  .doc(member.user_id)
                  .set({
                     user_id: member.user_id,
                     email: member.email,
                     is_admin: member.user_id == state.user_id ? true : false
                  })
                  .then(() =>{
                     db.firestore()
                     .collection('users')
                     .doc(member.user_id)
                     .collection('groups')
                     .doc(groupId)
                     .set({
                        group_name: groupData.group_name,
                        group_id: groupData.group_id
                     })
                     .then(() =>{
                        state.infoMessage ='Group Added!';
                        router.back();
                     }).catch(e => console.log(e));
                  }).catch(e => console.log(e));
               })
               
            }).catch(e =>{
               console.log(e)
         })
      }

      const addGroupMember = ( user, array_index) => {
         state.members.push(user);
         state.friends.splice(array_index, 1);
      }
      
      const removeGroupMember = (user, array_index) => {
         state.friends.push(user);
         state.members.splice(array_index, 1);
      }

      const back = () => {
         router.back()
      }

      return {
         ...toRefs(state),
         onCreateGroup,
         addGroupMember, 
         removeGroupMember,
         back
      }
   }
}
</script>