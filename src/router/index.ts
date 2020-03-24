import Vue from 'vue';
import Router from 'vue-router';
import IndexRouters from './indexRouters';

Vue.use(Router);

// 合并所有的路由
function getRouters() {
    return IndexRouters;
}
const router = new Router({
    mode: 'hash',
    // mode: 'history',
    // history: true,
    base: process.env.BASE_URL,
    routes: getRouters(),
});

export default router;
