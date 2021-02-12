import { firestore } from "../../service/firebase";

const groups = {
  namespaced: true,
  state: () => ({
    groups: [],
  }),

  mutations: {
    SET_LIST_GROUP(state, groups) {
      state.groups = groups;
    },
  },
  actions: {
    async setListGroup({ commit }, current_user_id) {
      const data = await firestore
        .collection("users")
        .doc(current_user_id)
        .collection("groups")
        .get();

      if (data.docs.length > 0) {
        let listGroup = [];
        listGroup = [...data.docs];
        let dataGroup = [];

        listGroup.forEach((g) => {
          firestore
            .collection("groups")
            .doc(g.data().group_id)
            .get()
            .then((group) => {
              if (group.exists) {
                dataGroup.push({
                  active: group.data().active,
                  group_id: group.data().group_id,
                  group_name: group.data().group_name,
                  group_avatar: group.data().group_avatar,
                  created_date: group.data().created_date,
                  admin_create_id: group.data().admin_create_id,
                  group_description: group.data().group_description,
                });
              }
            });
        });

        commit("SET_LIST_GROUP", dataGroup);
      }
    },
  },
  getters: {},
};

export default groups;
