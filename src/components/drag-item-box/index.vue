<template>
    <vue-draggable-resizable class="drag-item" :class="{'isHover':editable}" :prevent-deactivation="true"
        :x="configInfo.x" :y="configInfo.y" :w="configInfo.width" :h="configInfo.height" :z="configInfo.z || 99" :snap="true"
        @resizing="onResize" @dragging="onDrag" @resizestop="onResizeStop" :parent="false" :active="(editable && configInfo.active)"
        @dragstop="onDragStop" :draggable="editable" :resizable="editable" @activated="onActivated" @deactivated="onDeactivated">
        <i class="drag-item-button delete el-icon-close" title="删除" @click="deleteDragItem"></i>
        <i class="drag-item-button copy el-icon-copy-document" title="复制图表" @click="copyDragItem"></i>
        <div class="grid-line" v-if="editable">
            <div class="grid-line-top"></div>
            <div class="grid-line-left"></div>
            <div class="grid-line-label">{{configInfo.x}} , {{configInfo.y}}</div>
        </div>
        <slot></slot>
    </vue-draggable-resizable>
</template>
<script lang="ts">
// tslint:disable
import { Component, Watch, Model, Prop } from "vue-property-decorator";
import _ from "lodash";
import { Mixins } from "@/mixins";
import VueDraggableResizable from '../vue-draggable-resizable/components/vue-draggable-resizable.vue';

@Component({
    components: {
        VueDraggableResizable,
    }
})
export default class DragItemBox extends Mixins {
    private configInfo: any = {}; // 当前组件/面板配置信息
    // private isEditable: boolean = true;

    @Model("changeComponentConfig", { type: Object }) private componentConfig!: any; // 大屏配置对应的组件配置信息
    @Prop() editable: boolean  = true;


    @Watch('configInfo',{ deep: true })
    public changeConfig(newVal: any) {
        this.$emit('changeComponentConfig', newVal);
    }

    get isEditable() {
        return this.editable;
    }

    mounted() {
        // this.isEditable = this.editable;
        this.$nextTick(() => {
            this.configInfo = _.cloneDeep(this.componentConfig);
        });
    }

    onDrag(left: number, top: number) {
        this.configInfo.x = left
        this.configInfo.y = top
        this.$emit('changeShowGrid', true)
    }
    onResize(left: number, top: number, width: number, height: number) {
        this.configInfo.x = left
        this.configInfo.y = top
        this.configInfo.width = width
        this.configInfo.height = height
        this.$emit('changeShowGrid', true)
    }
    onDragStop() {
        this.$emit('changeShowGrid', false)
    }
    onResizeStop() {
        this.$emit('changeShowGrid', false)
    }
    onActivated() {
        this.$emit('onActivated', this.configInfo)
    }
    onDeactivated() {
        this.$emit('onDeactivated')
    }
    deleteDragItem() {
        this.$emit('deleteDragItem', this.configInfo.componentNo)
    }
    copyDragItem() {
        this.configInfo.active = false;
        const item =  _.cloneDeep(this.configInfo);
        item.x = item.x + 60;
        item.y= item.y + 60;
        this.$emit('copyDragItem', item)
    }
}
</script>

<style lang="scss" scoped>
    .drag-item {
        border: none;
        &.isHover {
            &:hover {
                background: rgba(0,231,255,.11);
                border: 1px solid #58bee9;
                -webkit-box-shadow: 0 0 3px #58bee9;
                box-shadow: 0 0 3px #58bee9;
                .grid-line {
                    display: block;
                }
            }

            &.active {
                cursor: move;
                background: rgba(0,231,255,.11);
                border: 1px solid #58bee9;
                -webkit-box-shadow: 0 0 3px #58bee9;
                box-shadow: 0 0 3px #58bee9;
                .grid-line, .drag-item-button {
                    display: block;
                }
            }
        }

    /deep/ .handle {
        background: #ffffff;
        border: none;
        border-radius: 100%;
        width: 7px;
        height: 7px;
        &.handle-tl {
            top: -4px;
            left: -4px;
        }
        &.handle-mr {
            top: 50%;
            margin-top: -4px;
            right: -4px;
        }
        &.handle-tr {
            top: -4px;
            right: -4px;
        }
        &.handle-tm {
            top: -4px;
            left: 50%;
            margin-left: -4px;
        }
        &.handle-ml {
            top: 50%;
            margin-top: -4px;
            left: -4px;
        }
        &.handle-bl {
            bottom: -4px;
            left: -4px;
        }
        &.handle-bm {
            bottom: -4px;
            left: 50%;
            margin-left: -4px;
        }
        &.handle-br {
            bottom: -4px;
            right: -4px;
        }
    }
    .drag-item-button {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        background-color: #09f;
        color: #fff;
        text-align: center;
        line-height: 22px;
        font-size: 18px;
        z-index: 10;
        cursor: pointer;
        &:active {
            opacity: 0.75;
        }
        &.copy {
            left: 23px;
        }
    }

    .grid-line {
        display: none;
        .grid-line-top {
            position: absolute;
            border-left: 1px dashed #09f;
            width: 0;
            height: 10000px;
            left: 0;
            transform: translateY(-100%);
        }

        .grid-line-left {
            position: absolute;
            border-top: 1px dashed #09f;
            width: 10000px;
            height: 0;
            top: 0;
            transform: translateX(-100%);
        }

        .grid-line-label {
            position: absolute;
            padding: 5px 10px;
            transform: translate(-100%, -100%);
            color: #09f;
            white-space: nowrap;
        }
    }
}
</style>
