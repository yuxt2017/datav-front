/* tslint-disable */
import { PageConfigInfo } from '@/config';
const PageConfig = {
    namespaced: true,
    state: {
        configInfo: PageConfigInfo,
    },

    mutations: {
        setConfig: (state: any, configInfo: any) => {
            state.configInfo = configInfo;
        },
    },

    actions: {
        setConfig({ commit }: any, configInfo: any) {
            commit('setConfig', configInfo);
        },
    },
};

export default PageConfig;

