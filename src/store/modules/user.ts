/* tslint-disable */
const user = {
  state: {
    name: '',
    userName: '',
    userId: '',
  },

  // 使用  commit('SET_NAME', 'xxxxx')
  mutations: {
    setName: (state: any, name: any) => {
      state.name = name;
    },
    setUserName: (state: any, userName: any) => {
      state.userName = userName;
    },
    setUserId: (state: any, userId: any) => {
      state.userId = userId;
    },
  },

  actions: {
    setUserInfo({ commit, state }: any, data: any) {
      commit('setUserName', data.userName);
      commit('setUserId', data.userId);
    },

  },
};

export default user;

