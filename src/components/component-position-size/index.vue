<template>
  <div class="position-size">
      <div class="config-item">
          <div class="config-item-title">组件尺寸</div>
          <div class="config-item-container">
              <el-row>
                  <el-col :span="11">
                      <div class="col-item">
                          <el-input-number size="mini" v-model="panelConfig.width" controls-position="right" :min="1" ></el-input-number>
                      </div>
                  </el-col>
                  <el-col :span="11" :offset="2">
                      <div class="col-item">
                          <el-input-number size="mini" v-model="panelConfig.height" controls-position="right" :min="1" ></el-input-number>
                      </div>
                  </el-col>
              </el-row>
          </div>
      </div>
      <div class="config-item">
          <div class="config-item-title">组件位置</div>
          <div class="config-item-container">
              <el-row>
                  <el-col :span="11">
                      <div class="col-item">
                          <el-input-number size="mini" v-model="panelConfig.x" controls-position="right" :min="1" ></el-input-number>
                      </div>
                  </el-col>
                  <el-col :span="11" :offset="2">
                      <div class="col-item">
                          <el-input-number size="mini" v-model="panelConfig.y" controls-position="right" :min="1" ></el-input-number>
                      </div>
                  </el-col>
              </el-row>
          </div>
      </div>
  </div>
</template>

<script lang="tsx">
// tslint:disable
import _ from "lodash";
import { Component, Model, Watch } from "vue-property-decorator";
import { Mixins } from "@/mixins";

@Component
export default class PositionSizeComponent extends Mixins {

    @Model("changePanelConfig", { type: Object }) private panelConfig!: any; // 大屏配置对应的组件配置信息

    // 监测配置信息，改变则传给父页面
    @Watch("panelConfig", { deep: true })
    private changeCurrentPanelConfig(newVal: any) {
        this.$emit('changePanelConfig', newVal);
    }
}
</script>

<style lang="scss" scoped>
  .config-item {
      display: flex;
      padding: 10px;
      &.align-center {
          align-items: center;
      }
      .config-item-title {
          width: 80px;
          min-width: 80px;
          padding-left: 20px;
          line-height: 24px;
          height: 24px;
      }
      .config-item-container {
          flex: 1;
          &.flex-align-center {
              display: flex;
              align-items: center;
          }
          .col-item {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              /deep/ .el-input-number {
                  line-height: 24px;
                  height: 24px;
                  width: 100%;
                  /deep/ .el-input-number__decrease, /deep/ .el-input-number__increase {
                      border-radius: 0;
                      border: none;
                      background: var(--Main-light);
                      i {
                          color: white;
                      }
                  }
                  input {
                      background: var(--Main);
                      color: white;
                      padding-left: 7px;
                      padding-right: 35px;
                      border-radius: 0;
                      line-height: 24px;
                      height: 24px;
                  }
              }
          }
      }
  }
</style>
