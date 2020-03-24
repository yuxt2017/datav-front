<template>
  <div class="right-panel-warapper" :class="{ hidden: !showPanel }">
    <div class="right-panel">
      <div class="panel-title">
        <i class="el-icon-arrow-right" @click="changeShowPanel"></i>
        <span>{{ componentName }}</span>
      </div>
      <div class="right-panel-wrapper">
        <div class="right-panel-container">
          <datav-page-config v-if="selectedComponent == null || !selectedComponent.active" v-model="configInfo"></datav-page-config>
          <div v-if="selectedComponent && selectedComponent.active" >
              <component :is="selectedComponent.panelName" v-model="selectedComponent"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable
import _ from "lodash";
import { Component, Model, Prop, Emit, Watch } from "vue-property-decorator";
import { Mixins } from "@/mixins";
import DatavPageConfig from './datavPageConfig.vue';
import datavPanelUI from '../../../components/component-list/panle';

@Component({
  components: {
    DatavPageConfig,
    ...datavPanelUI
  }
})
export default class DatavRightPanel extends Mixins {
  private hidden: boolean = false;
  @Prop() private showPanel!: boolean;
  @Prop() private selectedComponent: any;
  @Model("changeConfigInfo", { type: Object }) private configInfo!: any;

  get showPageConfig() {
    if(this.selectedComponent != null && this.selectedComponent != undefined && this.selectedComponent.active) {
      return false
    }
    return true
  }

  get componentName() {
    if(this.selectedComponent) {
      return this.selectedComponent.name;
    }
    return '页面配置';
  }

  // 监测配置信息，改变则传给screen页面
  // @Watch("configInfo", { deep: true })
  // private changeConfigInfo(newVal: any, oldVal: any) {
  //   this.$emit('changeConfigInfo', newVal);
  // }

  // 显示隐藏当前右侧面板
  @Emit()
  private changeShowPanel(): boolean {
    return !this.showPanel;
  }
}
</script>

<style lang="scss" scoped>
.right-panel-warapper {
  font-size: 12px;
  flex: none;
  width: 332px;
  height: 100%;
  background: #1d2126;
  z-index: 4;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 1px 0 #000;
  &.hidden {
    width: 0;
  }
  .right-panel {
    width: 332px;
    transition: 0.3s ease;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    color: white;
    background: #13161a;
    .panel-title {
      padding: 0 30px;
      position: relative;
      text-align: center;
      box-sizing: border-box;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: #2e343c;
      color: #fff;
      user-select: none;
      i {
        position: absolute;
        left: 10px;
        top: 0;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
