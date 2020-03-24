<template>
  <div class="layer-panel-warapper" :class="{ hidden: !showPanel }">
    <div class="layer-panel">
      <div class="panel-title">
        <span>图层列表</span>
        <i class="el-icon-arrow-left" @click="$emit('changeShowPanel', !showPanel)"></i>
      </div>
      <div class="layer-panel-wrapper" @click="onClickComponetOutsider">
        <div class="layer-manager-list">
          <div class="layer-manager-item" v-for="(item, index) in items" :key="index"
            @click="onSelectComponent(item)"
            :class="{'active': item.active}">
            <el-image class="item-image" :src="item.image"></el-image>
            <span class="item-span">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable
import _ from "lodash";
import { Component, Model, Prop, Watch } from 'vue-property-decorator';
import { Mixins } from "@/mixins";

@Component
export default class DatavLayerPanel extends Mixins {
  private hidden: boolean = false;
  @Prop() private showPanel!: boolean;
  @Model("changeItems") private items!: any;

  @Watch('items', {deep: true})
  changeItems(newVal: any) {
    this.$emit('changeItems', newVal);
  }

  onSelectComponent(component: any) {
    this.$emit('onActivated', component);
  }

  onClickComponetOutsider(event: Event) {
    const elem: any = event.target || event.srcElement;
    if (elem.className == 'layer-panel-wrapper') {
      this.items.forEach((item: any) => {
        item.active = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.layer-panel-warapper {
  font-size: 12px;
  flex: none;
  width: 233px;
  height: 100%;
  background: #1d2126;
  z-index: 4;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 1px 0 #000;
  border-right: 1px solid #000;
  &.hidden {
    width: 0;
  }
  .layer-panel {
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
    .layer-panel-wrapper {
      height: 100%;
    }
    .layer-manager-list {
      transition: 0.3s;
      .layer-manager-item {
        transition: 0.2s;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 6px;
        position: relative;
        background: #1b1f25;
        cursor: pointer;
        flex: none;
        &:hover {
          color: #fff;
          background: rgba(143,225,255,.1);
        }
        &.active {
          background: #2483ff;
          color: #fff;
        }
        .item-image {
          width: 53px;
          height: 34px;
          flex: none;
          display: block;
          border: 1px solid #3a4659;
          background: #282a30;
        }
        .item-span {
          flex: auto;
          text-indent: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
