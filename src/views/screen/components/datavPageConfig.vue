<template>
    <div class="page-config-manage-warpper">
        <div class="page-config-manage">
            <div class="config-item">
                <div class="config-item-title">屏幕大小</div>
                <div class="config-item-container">
                    <el-row>
                        <el-col :span="11">
                            <div class="col-item">
                                <el-input-number size="mini" v-model="configInfo.width" controls-position="right" :min="1" ></el-input-number>
                                <span class="caption ellipsis" title="宽度">宽度</span>
                            </div>
                        </el-col>
                        <el-col :span="11" :offset="2">
                            <div class="col-item">
                                <el-input-number size="mini" v-model="configInfo.height" controls-position="right" :min="1" ></el-input-number>
                                <span class="caption ellipsis" title="高度">高度</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="config-item align-center">
                <div class="config-item-title">背景颜色</div>
                <div class="config-item-container flex-align-center">
                    <el-color-picker size="mini" v-model="configInfo.bgColor"></el-color-picker>
                </div>
            </div>
            <div class="config-item">
                <div class="config-item-title">背景图片</div>
                <div class="config-item-container">
                    <div class="el-image-wrapper">
                        <input type="text" v-model="configInfo.bgImage"/>
                        <div class="item-image">
                            <el-image fit="contain" v-if="configInfo.bgImage" :src="configInfo.bgImage"></el-image>
                        </div>
                    </div>
                </div>
            </div>
            <div class="config-item align-center">
                <div class="config-item-title">重置</div>
                <div class="config-item-container">
                    <el-button type="info" size="mini" @click="reset">恢复默认背景</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
// tslint:disable
import _ from "lodash";
import { Component, Model, Watch } from "vue-property-decorator";
import { Mixins } from "@/mixins";
import { PageConfigInfo } from '../../../config';

@Component
export default class DatavPageConfig extends Mixins {

    @Model("changeConfigInfo", { type: Object }) private configInfo!: any;

    // 监测配置信息，改变则传给父页面
    // @Watch("configInfo", { deep: true })
    // private changeConfigInfo(newVal: any) {
    //     this.$emit('changeConfigInfo', newVal);
    // }

    reset(){
        this.configInfo.bgImage = PageConfigInfo.bgImage;
    }
}
</script>

<style lang="scss" scoped>
.page-config-manage-warpper .page-config-manage {
    padding: 10px 0;
    background: #1c2026;
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
                .caption {
                    height: 16px;
                    line-height: 16px;
                    margin-top: 5px;
                    color: #909399;
                }
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
                /deep/ .el-color-picker{
                    display: flex;
                    align-items: center;
                }
            }
            .el-image-wrapper {
                input {
                    width: 100%;
                    margin-bottom: 10px;
                    box-sizing: border-box;
                    background: #262c33;
                    border: 1px solid #909399;
                    line-height: 24px;
                    padding: 0 5px;
                    color: white;
                }
                .item-image {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                    min-height: 130px;
                    border: 1px solid #909399;
                    background: #262c33;
                    cursor: pointer; 
                }
            }
        }
    }
}
</style>
