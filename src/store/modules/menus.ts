/* tslint-disable */
const menus = {
    namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
    state: {
        list: [],
    },
    mutations: {
        setList: (state: any, list: any) => {
            state.list = list;
        },
    },
};

export default menus;

