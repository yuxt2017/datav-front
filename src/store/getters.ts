const getters: any = {
  menus: (state: any)  => state.menus.list,
  userInfo: (state: any)  => {
    return  {
      userId: state.user.userId,
      name: state.user.name,
    };
  },
};
export default getters;
