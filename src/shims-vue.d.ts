// import Vue from 'vue'
import { Vue } from 'vue-property-decorator';
import VueRouter, {Route} from 'vue-router';
import { Store } from 'vuex'
import { ElMessage } from 'element-ui/types/message';

declare module "vue/types/vue" {
    interface Vue {
        $router: VueRouter; // 这表示this下有这个东西
        $route: Route;
        $store: Store<any>;
        $dialog: any;
        $eventBus: any;
        $message: ElMessage;
        $instance: any;
    }
}