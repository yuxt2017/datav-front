// tslint:disable
import { Vue, Component, Watch } from "vue-property-decorator";
// import Component from "vue-class-component";
import { Route } from "vue-router"; // @ is an alias to /src
import { isMobileOrPc } from "@/utils/utils";

// 移动端 rem 单位适配
if (isMobileOrPc()) {

    // H5检查模式 => 手机 => 375*667 => 对照UI设计图 750*1334 => 1rem 单位匹配对应的 1px

    // 真实为 1rem = 0.5px
    var width = window.screen.width;
    window.document.getElementsByTagName("html")[0].style.fontSize =
        width / 750 + "px";
}
@Component
export default class App extends Vue {
    @Watch("$route")
    routeChange(val: Route, oldVal: Route): void {
        console.log(val.path, oldVal.path);
    }
}