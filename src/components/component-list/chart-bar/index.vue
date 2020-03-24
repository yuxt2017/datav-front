<template>
  <div class="echart-div" ref="echartDiv"></div>
</template>

<script lang="ts">
// tslint:disable
import { Component, Watch, Model } from "vue-property-decorator";
import _ from "lodash";
import { Mixins } from "@/mixins";
import echarts from 'echarts';
import config from './config';

@Component
export default class ChartBar extends Mixins {
    private echart: any;
    @Model("changeComponentConfig", { type: Object }) private configInfo!: any; // 大屏配置对应的组件配置信息

    // 组件配置信息变更
    @Watch("configInfo", { deep: true })
    private changeComponentConfig(newVal: any, oldVal: any) {
      // console.log('newVal.height === '+newVal.height)
      // console.log('oldVal.height === '+oldVal.height)
      this.setEChart();
      // this.$emit('changeComponentConfig', newVal);
    }

    mounted() {
        const cloneConfig =  _.cloneDeep(config)
        const cloneConfigInfo =  _.cloneDeep(this.configInfo)
        Object.assign(this.configInfo, cloneConfig, cloneConfigInfo);
        this.setEChart();
        window.onresize = () => {
          this.setEChart();
        }
    }

    private setEChart() {
      setTimeout(() => {
        const dom: any = this.$refs.echartDiv;
        if (this.$refs.echartDiv) {
          if (!this.echart) {
            this.echart = echarts.init(dom);
          }
            this.echart.setOption(this.configInfo.option);
            this.echart.resize();
        }
      }, 0);
    }
}
</script>

<style lang="scss" scoped>
.echart-div {
  width: 100%;
  height: 100%;
}
</style>
