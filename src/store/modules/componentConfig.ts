/* tslint-disable */
const componentConfig = {
    namespaced: true,
    state: {
        chartBar: {},
    },

    mutations: {
        setConfig: (state: any, configInfo: any) => {
            state[configInfo.compoentName] = configInfo;
        },
    },

    actions: {
        setConfig({ commit }: any, configInfo: any) {
            commit('setConfig', configInfo);
        },

    },
};

export default componentConfig;

