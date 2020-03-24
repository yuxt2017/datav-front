<template>
  <div class="components-panel-warapper" :class="{ hidden: !showPanel }">
    <div class="components-panel">
      <div class="panel-title">
        <span>组件列表</span>
        <i class="el-icon-arrow-left" @click="$emit('changeShowPanel', !showPanel)"></i>
      </div>
      <div class="panel-content">
        <div class="component-tabs">
          <el-tooltip v-for="(item, index) in componentTypes" :key="index" effect="light" placement="right-start" :content="item.text">
            <div class="tab-item" :class="{'active': item.value == classifyIndex}" @click="onSelectComponentType(item)">
              <i :class="item.icon"></i>
            </div>
          </el-tooltip>
        </div>
        <div class="component-content-wrapper">
          <div class="datav-tab-panel">
            <el-collapse accordion>
              <el-collapse-item v-for="(item, index) in items" :key="index">
                <template slot="title">{{item.typeName}}</template>
                <div class="component-list">
                  <div class="component-item" v-for="(citem, cindex) in item.componentList" :key="cindex" @click="addComponent(citem)">
                    <div class="item-title">{{citem.name}}</div>
                    <div class="item-img">
                      <el-image :src="citem.image"></el-image>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable
import _ from "lodash";
import { Component, Model } from "vue-property-decorator";
import { Mixins } from "@/mixins";

@Component
export default class DatavComponentPanel extends Mixins {
  @Model("changeShowPanel", { type: Boolean }) private showPanel!: boolean;
  private hidden: boolean = false;
  private componentTypes: Array<any> = [];
  private items: Array<any> = [];
  private classifyIndex: number = 1;

  mounted() {
    this.componentTypes = [{
      text: '常规图表',
      icon: 'iconfont icon-chart',
      value: 1,
      list: [{
        typeName: '全部',
        num: 2,
        componentList: [{
          id: 1001,
          name: '基本折线图',
          componentName: 'ChartLine',
          panelName: 'ChartLinePanel',
          image: 'https://img.alicdn.com/tfs/TB1PhI1mHr1gK0jSZR0XXbP8XXa-332-144.png',
        },{
          id: 1002,
          name: '基本柱状图',
          componentName: 'ChartBar',
          panelName: 'ChartBarPanel',
          image: 'https://img.alicdn.com/tfs/TB1Mmk3mKL2gK0jSZFmXXc7iXXa-332-144.png',
        }]
      },{
        typeName: '折线图',
        num: 1,
        componentList: [{
          id: 1001,
          name: '基本折线图',
          componentName: 'ChartLine',
          panelName: 'ChartLinePanel',
          image: 'https://img.alicdn.com/tfs/TB1PhI1mHr1gK0jSZR0XXbP8XXa-332-144.png',
        }]
      },{
        typeName: '柱形图',
        num: 1,
        componentList: [{
          id: 1002,
          name: '基本柱状图',
          componentName: 'ChartBar',
          panelName: 'ChartBarPanel',
          image: 'https://img.alicdn.com/tfs/TB1Mmk3mKL2gK0jSZFmXXc7iXXa-332-144.png',
        }]
      }]
    },{
      text: '地图',
      icon: 'iconfont icon-map',
      value: 2
    },{
      text: '媒体',
      icon: 'iconfont icon-media',
      value: 3
    },{
      text: '文本',
      icon: 'iconfont icon-text',
      value: 4
    },{
      text: '其他',
      icon: 'iconfont icon-other',
      value: 5
    },{
      text: '收藏',
      icon: 'iconfont icon-like',
      value: 6
    }];
    this.items = this.componentTypes[0].list;
  }

  addComponent(item: any){
    this.$emit('addComponent', item);
  }
  onSelectComponentType(item: any){
    this.classifyIndex = item.value;
    this.items = item.list || [];
  }
}
</script>

<style lang="scss" scoped>
.components-panel-warapper {
  font-size: 12px;
  flex: none;
  width: 233px;
  height: 100%;
  background: #1d2126;
  z-index: 4;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 1px 0 #000;
  &.hidden {
    width: 0;
  }
  .components-panel {
    width: 233px;
    transition: 0.3s ease;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    color: white;
    background: #13161a;
    .panel-title {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      background: #2e343c;
      color: #fff;
      padding: 10px;
      user-select: none;
      i {
        cursor: pointer;
      }
    }
    .panel-content {
      background: #191c21;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      display: flex;
      .component-tabs {
        display: flex;
        background: #1c2028;
        flex-direction: column;
        .tab-item {
          transition: 0.1s;
          border-top: none;
          border-left: 2px solid transparent;
          padding: 14px;
          box-sizing: border-box;
          cursor: pointer;
          i {
            font-size: 20px;
            color: #fff;
          }
          &.active {
            border-left-color: #2681ff;
            color: #2681ff;
            i {
              color: #2681ff;
            }
          }
        }
      }
      .component-content-wrapper {
        flex: 1;
        /deep/ .el-collapse {
          border: none;
          .el-collapse-item__header {
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            background: #13161a;
            border-bottom: 1px solid #2c2e33;
            cursor: pointer;
            color: #bcc9d4;
          }
          .el-collapse-item__wrap {
            background: #0a0b0d;
            border: none;
            .el-collapse-item__content {
              color: #bcc9d4 !important;
              padding: 10px;
            }
          }
        }
        .component-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .component-item {
            .item-title {
              font-size: 12px;
              padding: 0 5px;
              text-align: left;
              overflow: hidden;
              background: #212326;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 22px;
            }
            .item-img {
              height: 58px;
              background-color: #17191c;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            width: 80px;
            cursor: pointer;
            display: inline-block;
            color: #bcc9d4;
            vertical-align: top;
            user-select: none;
            flex: none;
            margin-bottom: 6px;
            border-radius: 3px;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;
          }
        }
      }
    }
  }
}
</style>
