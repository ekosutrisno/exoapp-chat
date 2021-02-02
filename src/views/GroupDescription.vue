<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="bg-whatsapp-dark-300 inset-0 min-h-screen h-screen w-full max-w-screen-sm mx-auto flex flex-col overflow-y-auto justify-center items-center">
         <div class="flex px-4 fixed w-full top-0 max-w-screen-sm items-center bg-whatsapp-dark-300 text-gray-300 h-16 shadow-lg z-40">
            <svg @click="back" class="w-5 md:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
         </div>
         <div class="h-full w-full px-4 pb-4 pt-20">
            <div class="mx-auto flex w-40 h-40 max-w-screen-sm justify-center relative mb-6 cursor-pointer">
               <div v-if="is_admin" class="absolute bottom-2 right-0 z-30">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium bg hover:bg-opacity-50 text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                     <div class="rounded-full bg-whatsapp-teal-green bg-opacity-80 text-gray-200 p-3 hover:bg-opacity-100 transition">
                        <span>
                           <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                           </svg>
                        </span>
                     </div>
                     <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="changeAvatar">
                  </label>
               </div>
               <img v-if="group_avatar" class="w-40 h-40 object-cover ring-whatsapp-teal-green rounded-full" :src="group_avatar" alt="exoapp-logo">
               <G v-else/>
            </div>
               <h1 v-if="messageInfo" class="text-center text-sm font-semibold text-green-500 mb-6">{{messageInfo}}</h1>
            <div class="w-full flex flex-col">
               <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Group Name</h1>
                     <input v-model="group_name" type="text" required :readonly="!is_admin" class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder- text-sm-70" placeholder="Username" />
                  </div>
               </div>

                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Status</h1>
                     <input v-model="status" type="text" required readonly class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Status" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                   <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Created At</h1>
                     <input v-model="created_date" type="text" required :readonly="!is_admin" class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Phone Number" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Group Description</h1>
                     <textarea v-model="group_description" class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="2" placeholder="Your Descriptions"></textarea>
                  </div>
               </div>

               <button v-if="is_admin" type="button" @click="uploadAvatar" class="py-3 px-6 text-lg mt-4 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Update Group
               </button>

                <!-- List Group Member -->
               <div class="mt-4 text-gray-300">
                  <button class="my-2 py-0.5 focus:outline-none font-semibold text-xs bg-green-600 text-left px-2 rounded-full">Members</button>
                  <!-- As Admin -->
                  <ul v-if="is_admin">
                     <li v-for="(user, i) in members" :key="i">
                        <ListGroupMemberAdmin @remove-member="removeGroupMember(user, i)"  :currentPeerUser="user"/>
                     </li>
                     <li v-if="members.length === 0" class="text-gray-300 text-center py-4">
                        <h1 class="p-2 bg-whatsapp-dark-200 rounded text-sm">This group No have a Member!, search bellow to add a member from your contact!</h1>
                     </li>
                  </ul>
                  <!-- As Member -->
                  <ul v-else >
                     <li v-for="(user, i) in members" :key="i">
                        <ListGroupMemberUser @remove-member="removeGroupMember(user, i)"  :currentPeerUser="user"/>
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
                     <li v-show="user.user_id !== user_id" v-for="(user, i) in friends" :key="i">
                        <ListGroupFriend @add-member="addGroupMember(user, i)"  :currentPeerUser="user" :groupAdminId="group_admin_id"/>
                     </li>
                     <li class="text-gray-300 text-center py-4">
                        <h1 class="mb-6">You No have more Friends!</h1>
                        <div class="flex items-center justify-center space-x-2">
                           <button @click="getFriendList" class="py-2 px-4 rounded hover:bg-opacity-80 text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                              My Contact
                           </button>
                           <router-link  to="/invite-friend" class="py-2 px-4 rounded hover:bg-opacity-80 text-gray-300 bg-gray-700 focus:outline-none">
                              Invite Friend
                           </router-link>
                        </div>
                     </li>
                  </ul>
               </div>
               <p class="text-center my-6 text-xs text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import db from '../firebase'
import Spinner from '../components/Spinner.vue'
import ListGroupMemberUser from '../components/ListGroupMemberUser.vue'
import ListGroupMemberAdmin from '../components/ListGroupMemberAdmin.vue'
import ListGroupFriend from '../components/ListGroupFriend.vue'
import store from '../store'
import G from '../components/svg/G.vue'

export default {
   components:{ Spinner, ListGroupMemberUser, ListGroupFriend, ListGroupMemberAdmin, G },
   setup () {
      const router = useRouter();

      const state = reactive({
         user_id: localStorage.getItem('user_id'),
         group_id: localStorage.getItem('current_group_id'),
         group_avatar: '',
         group_name: '',
         created_date: '',
         status: '',
         group_description: '',
         group_admin_id: '',
         newFoto : null,
         isProcess: false,
         messageInfo: '',
         members: [],
         friends: []
      })

      const is_admin = computed(()=>{
         return state.group_admin_id === state.user_id;
      })

      const changeAvatar = (event) => {
         if (event.target.files && event.target.files[0]) {
            const fileType = event.target.files[0].type.toString();

            if(fileType.indexOf('image') != 0){
               alert('Please Choose an Image')
               return;
            }

            state.newFoto = event.target.files[0];
            state.group_avatar = URL.createObjectURL(event.target.files[0])
         }else{
            alert('Error when change avatar!')
         }
      }

      const uploadAvatar = () => {
         state.isProcess = true;
         autoStopSpinner();

         if(state.newFoto){
            const upload = db.storage().ref()
            .child(state.group_id)
            .put(state.newFoto)

            upload.on('state_changed',null, err => console.log(err),
                  () => {
                     upload.snapshot.ref.getDownloadURL().then(url => {
                        updateUserInfo(true, url);
                     })
                  })
         } else {
             updateUserInfo(false, null);
         }
      }

      const updateUserInfo = (isUrlPresent, downloadURL) => {
         let newInfo = {}
         if (isUrlPresent) {
            newInfo = {
               group_name: state.group_name,
               group_description: state.group_description,
               created_date: state.created_date,
               group_avatar: downloadURL
            }
         } else {
              newInfo = {
               group_name: state.group_name,
               group_description: state.group_description,
               created_date: state.created_date,
            }
         }

         db.firestore().collection('groups')
            .doc(state.group_id)
            .update(newInfo)
            .then( () => {
               state.messageInfo = 'Group has been updated!'
               stopSpinner();
            })

      }

      onMounted(()=>{
         getGroupMembers();
         getGroupDetail();
      })

      onBeforeMount(() => {
         if (!localStorage.getItem("user_id")) {
          router.push("/login")
         }
      })

      const getGroupDetail = async () => {
      
         state.isProcess = true;

        const group = await db.firestore().collection('groups')
                .where('group_id', '==', state.group_id)
                .get();

               group.docs.forEach(d => {
                  const groupDetail = d.data();

                  state.group_admin_id = groupDetail.admin_create_id;
                  state.group_avatar = groupDetail.group_avatar;
                  state.group_description = groupDetail.group_description;
                  state.group_name = groupDetail.group_name;
                  state.status = groupDetail.active ? 'Active' : 'NonActive';
                  state.created_date = groupDetail.created_date;

                  state.isProcess = false;
               })
      }

      const onAddMember = () => {

         state.members.forEach( member => {
            db.firestore()
            .collection('groups')
            .doc(state.group_id)
            .collection('members')
            .doc(member.user_id)
            .set({
               user_id: member.user_id,
               email: member.email,
               is_admin: false
            })
            .then(() =>{
               db.firestore()
               .collection('users')
               .doc(member.user_id)
               .collection('groups')
               .doc(state.group_id)
               .set({
                  group_name: state.group_name,
                  group_id: state.group_id
               })
               .then(() =>{
                  state.infoMessage ='New Group Member Added!';
               }).catch(e => console.log(e));
            }).catch(e => console.log(e));
         })
      }
      
      const onRemoveMember = ( member ) => {

         db.firestore()
            .collection('groups')
            .doc(state.group_id)
            .collection('members')
            .doc(member.user_id)
            .delete()
            .then(() =>{
               db.firestore()
               .collection('users')
               .doc(member.user_id)
               .collection('groups')
               .doc(state.group_id)
               .delete()
               .then(() =>{
                  state.infoMessage = `Your remove ${member.username} from Group!`;
               }).catch(e => console.log(e));
            }).catch(e => console.log(e));
         
      }


      const getGroupMembers = async () => {
         
         const members = await db.firestore().collection('groups')
            .doc(state.group_id)
            .collection('members')
            .get();

         if(members.docs.length > 0){
            let listMember = [];
            listMember = [...members.docs]

            listMember.forEach((member, index) => {
               db.firestore().collection('users')
                .where('user_id', '==', member.data().user_id)
                .get()
                .then(querySnapshot => {

                   querySnapshot.forEach( doc => {
                      state.members.push({
                              key: index,
                              is_admin: member.data().is_admin,
                              documentKey: doc.id,
                              email: doc.data().email,
                              user_id: doc.data().user_id,
                              username: doc.data().username,
                              photo_url: doc.data().photo_url,
                              descriptions: doc.data().descriptions,
                      });
                   })
                   
                })
            })
         }

      }

      const getFriendList = () => {

         state.isProcess = true;
         
         setTimeout(() => {
            state.isProcess = false;
         }, 5000);

         state.friends = computed(()=> store.state.friends.friends);
         state.isProcess = false;
      }


      const back = () => {
         router.back()
      }

       const addGroupMember = ( user, array_index) => {
         state.members.push(user);
         state.friends.splice(array_index, 1);
         onAddMember(); //Insert New Memeber

      }
      
      const removeGroupMember = (user, array_index) => {
         state.friends.push(user);
         state.members.splice(array_index, 1);
         onRemoveMember(user); // Delete Group Member
      }

      const stopSpinner = () => {
         state.isProcess = false;
         state.messageInfo = 'Group has been Updated.';
         setTimeout(() => {
            state.isProcess = false;
            state.messageInfo = '';
         }, 5000);
      }

      const autoStopSpinner = () => {
         setTimeout(() => {
            state.isProcess = false;
         }, 10000);
      }

      return {
         ...toRefs(state),
         is_admin,
         changeAvatar,
         uploadAvatar,
         removeGroupMember,
         addGroupMember,
         getFriendList,
         back
      }
   }
}
</script>