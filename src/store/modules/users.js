import { auth, firestore, googleProvider } from "../../service/firebase";
import randomColorCode from "../../service/randomColor";
import moment from "moment";
const users = {
  state: () => ({
    currentUser: {},
  }),

  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },

  actions: {
    async setCurrentUser({ commit }, user_id) {
      await firestore
        .collection("users")
        .doc(user_id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const payload = {
              user_id: doc.data().user_id,
              username: doc.data().username,
              email: doc.data().email,
              phone_number: doc.data().phone_number,
              photo_url: doc.data().photo_url,
              status: doc.data().status,
              descriptions: doc.data().descriptions,
              color_code: doc.data().color_code,
            };

            saveDataToLocalStorage(payload);
            commit("SET_CURRENT_USER", payload);
          }
        });
    },
    onUserSigin({ dispatch }) {
      const dbUser = firestore.collection("users");

      auth.onAuthStateChanged((user) => {
        if (user) {
          let user_id = user.uid;

          dispatch("setCurrentUser", user_id);

          let dataToUpdate = {
            online: true,
          };
          dbUser.doc(user_id).update(dataToUpdate);
        } else {
          //
        }
      });
    },
    async onUserSignout({ commit }, current_user_id) {
      console.log(current_user_id);
      // const dbUser = firestore.collection("users");

      // let dataToUpdate = {
      //   online: false,
      //   last_active: new Date().toISOString(),
      // };

      // await dbUser.doc(current_user_id).update(dataToUpdate);

      commit("SET_CURRENT_USER", {});
    },
    async onVerifyEmail() {
      var user = auth.currentUser;
      await user.sendEmailVerification();
    },
    async loginWithGoogle({ dispatch }) {
      var provider = googleProvider;
      provider.addScope("profile");
      provider.addScope("email");

      await auth.signInWithPopup(provider).then(async (res) => {
        var user = res.user;

        const userData = {
          user_id: user.uid,
          color_code: randomColorCode.call(),
          username: user.displayName,
          email: user.email,
          online: true,
          last_active: "",
          join_at: moment().format("LLLL"),
          descriptions: `Hi, My name is ${user.displayName}`,
          phone_number: user.phoneNumber,
          photo_url: user.photoURL,
          status: "I Love ExoApps",
        };

        await firestore
          .collection("users")
          .doc(user.uid)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              localStorage.setItem("user_id", doc.data().user_id);
              dispatch("onUserSigin");
              await dispatch("setCurrentUser", doc.data().uid);
            } else {
              await firestore
                .collection("users")
                .doc(user.uid)
                .set(userData)
                .then(async () => {
                  localStorage.setItem("user_id", user.user_id);

                  dispatch("onUserSigin");

                  await dispatch("setCurrentUser", user.uid);
                });
            }
          });
      });
    },
  },
  getters: {
    getUserId() {
      return localStorage.getItem("user_id");
    },
  },
};

const saveDataToLocalStorage = (user) => {
  localStorage.setItem("user_id", user.user_id);
};

export default users;
