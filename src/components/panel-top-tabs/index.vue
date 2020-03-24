<template>
    <div class="panel-tabs-warpper">
        <div class="panel-tabs">
            <el-tooltip v-for="(item, index) in tabs" :key="index" effect="light" :open-delay="500" placement="bottom" :content="item.text">
                <div class="tab-item" :class="{'active': selectedIndex==index+1}" @click="selectedIndex=index+1">
                    <i :class="item.icon"></i>
                </div>
            </el-tooltip>
        </div>
        <div class="panel-tabs-content">
            <slot name="basic" v-if="selectedIndex == 1"></slot>
            <slot name="data" v-if="selectedIndex == 2"></slot>
            <slot name="interaction" v-if="selectedIndex == 3"></slot>
        </div>
    </div>
</template>

<script lang="tsx">
// tslint:disable
import _ from "lodash";
import { Component, Model, Watch } from "vue-property-decorator";
import { Mixins } from "@/mixins";

@Component
export default class PanelTopTabs extends Mixins {

    @Model("changeTabIndex") private tabIndex!: any;

    @Watch("changeTabIndex")
    private changeTabIndex(newVal: any) {
        this.$emit('changeTabIndex', newVal);
    }

    private selectedIndex: number = 1;

    private tabs: any = [{
        icon: 'el-icon-s-operation',
        value: 1,
        text: '配置'
    },{
        icon: 'el-icon-coin',
        value: 2,
        text: '数据'
    },{
        icon: 'el-icon-connection',
        value: 3,
        text: '交互'
    },]
}
</script>

<style lang="scss" scoped>
    .panel-tabs-warpper {
        .panel-tabs {
            display: flex;
            align-items: center;
            .tab-item {
                flex: 1;
                padding: 8px;
                text-align: center;
                cursor: pointer;
                i {
                    font-size: 14px;
                }
                &.active {
                    background: #1d2126;
                    color: #2681ff;
                    border-top: 1px solid #2681ff;
                }
            }
        }
        .panel-tabs-content {
            padding: 10px 0;
            background: #1c2026;
        }
    }
</style>
