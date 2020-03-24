<template>
    <div class="datav-header">
        <div class="left-btns btns-spacing">
            <el-tooltip class="item" effect="light" content="图层" placement="bottom" :open-delay="500">
                <el-button class="btn" :class="{'active': panel.showLayerPanel}" @click="changePanel(1)" type="info" size="mini" icon="icon iconfont icon-layer"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="组件" placement="bottom" :open-delay="500">
                <el-button class="btn" :class="{'active': panel.showComponentPanel}" @click="changePanel(2)" type="info" size="mini" icon="icon iconfont icon-component"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="右侧面板" placement="bottom" :open-delay="500">
                <el-button class="btn" :class="{'active': panel.showRightPanel}" @click="changePanel(3)" type="info" size="mini" icon="icon iconfont icon-right"></el-button>
            </el-tooltip>
        </div>
        <div class="title">
            <i class="el-icon-monitor"></i>
            <span>-</span>
            <input type="text" placeholder="输入大屏名称" v-model="pageConfigInfo.name">
        </div>
        <div class="right-btns btns-spacing">
            <el-tooltip class="item" effect="light" content="保存" placement="bottom" :open-delay="500">
                <el-button class="btn" type="info" size="mini" icon="iconfont icon-save" @click="save"></el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="light" content="发布" placement="bottom" :open-delay="500">
                <el-button class="btn" type="info" size="mini" icon="el-icon-position"></el-button>
            </el-tooltip> -->
            <el-tooltip class="item" effect="light" content="导入" placement="bottom" :open-delay="500">
                <el-upload
                    style="display: inline-block;"
                    class="upload-file"
                    ref="upload"
                    action=""
                    :on-change="uploadFile"
                    :auto-upload="false">
                    <el-button class="btn" type="info" size="mini" icon="el-icon-upload2"></el-button>
                </el-upload>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="预览" placement="bottom" :open-delay="500">
                <el-button class="btn" type="info" size="mini" icon="el-icon-data-board" @click="preview"></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
// tslint:disable
import _ from 'lodash';
import { Component, Prop, Model } from 'vue-property-decorator';
import { Mixins } from '@/mixins';
import { namespace } from 'vuex-class';
const PageConfigModule = namespace('pageConfig');

@Component
export default class DatavHeader extends Mixins {
    private showComponet: boolean = false;

    @Prop() private showLayer!: boolean;
    @Prop() private showRightPanel!: boolean;
    @Prop() private pageConfigInfo!: any;

    @Model("changePanel", { type: Object }) private panel!: any;
    // @PageConfigModule.State('configInfo') pageConfigInfo: any;

    changePanel(type: number) {
        if(type === 1) {
            this.panel.showLayerPanel = !this.panel.showLayerPanel;
        }
        if(type === 2) {
            this.panel.showComponentPanel = !this.panel.showComponentPanel;
        }
        if(type === 3) {
            this.panel.showRightPanel = !this.panel.showRightPanel;
        }
        this.$emit('changePanel', _.cloneDeep(this.panel))
    }

    save() {
        const content = JSON.stringify(this.pageConfigInfo);
        const eleLink = document.createElement('a');
        eleLink.download = this.pageConfigInfo.name + '.json';
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        const blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    uploadFile(file: any) {
        const _this = this;
        const name = file.name;//读取选中文件的文件名
        const size = file.size;//读取选中文件的大小
        const reader = new FileReader();//这是核心,读取操作就是由它完成.
        reader.readAsText(file.raw);//读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            const str: any = this.result;
            _this.$emit('uploadFile', JSON.parse(str));
        }
    }

    preview() {
        let params = JSON.stringify(this.pageConfigInfo)
        let routeData = this.$router.resolve({ path: '/preview', query: {params: params}})
        window.open(routeData.href, '_blank')
    }
}

</script>

<style lang="scss" scoped>
    .datav-header {
        height: 40px;
        display: flex;
        z-index: 100;
        align-items: center;
        user-select: none;
        color: #a1aeb3;
        background: #1d1e1f;
        border-bottom: 1px solid #1e3a49;
        .btns-spacing {
            padding: 0 10px;
        }
        .title {
            flex: 1;
            align-items: center;
            line-height: 40px;
            text-align: center;
            span {
                margin-left: 10px;
            }
            input {
                line-height: 24px;
                background: transparent;
                border: none;
                padding: 0 5px;
                color: white;
            }
        }
        .btn {
            background: #303640;
            box-shadow: inset 0 0 0 1px rgba(255,235,235,.1), 0 0 0 1px #181818;
            transition: .2s;
            padding: 5px 15px;
            &:hover {
                border-color: #c6e2ff;
                background: #414750;
            }
            &.active {
                border-color: #2483ff;
                background: #2483ff;
            }
        }
        .upload-file {
            display: inline-block;
            margin: 0 10px;
            /deep/ .el-upload-list {
                display: none;
            }
        }
    }
</style>