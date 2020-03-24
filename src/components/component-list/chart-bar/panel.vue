<template>
    <div class="panel">
        <panel-top-tabs>
            <div slot="basic">
                <div>
                    <position-size-component v-model="panelConfig"></position-size-component>
                </div>
            </div>
            <div slot="data">
                <center>功能暂未开发</center>
            </div>
            <div slot="interaction">
                <center>功能暂未开发</center>
            </div>
        </panel-top-tabs>
    </div>
</template>

<script lang="tsx">
// tslint:disable
import _ from "lodash";
import { Component, Model, Watch } from "vue-property-decorator";
import { Mixins } from "@/mixins";
import config from './config';
import PositionSizeComponent from '../../component-position-size/index.vue';
import PanelTopTabs from '../../panel-top-tabs/index.vue';

@Component({
    components: {
        PositionSizeComponent,
        PanelTopTabs
    }
})
export default class ChartBarPanel extends Mixins {

    @Model("changePanelConfig", { type: Object }) private panelConfig!: any; // 大屏配置对应的组件配置信息

    // 监测配置信息，改变则传给父页面
    @Watch("panelConfig", { deep: true })
    private changeCurrentPanelConfig(newVal: any) {
        this.$emit('changePanelConfig', newVal);
    }
}
</script>

<style lang="scss" scoped>
</style>
