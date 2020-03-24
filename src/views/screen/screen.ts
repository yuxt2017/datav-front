// tslint:disable
import _ from 'lodash';
import { Component } from 'vue-property-decorator';
import { Mixins } from '@/mixins';
import DatavHeader from './components/datavHeader.vue';
import DatavRightPanel from './components/datavRightPanel.vue';
import DatavComponentPanel from './components/datavComponenPanel.vue';
import DatavLayerPanel from './components/datavLayerPanel.vue';
import { namespace } from 'vuex-class';
import datavComponentUI from '../../components/component-list/index';
import DragItemBox from '../../components/drag-item-box/index.vue';
const PageConfigModule = namespace('pageConfig');

@Component({
  components: {
    DatavHeader,
    DatavLayerPanel,
    DatavComponentPanel,
    DatavRightPanel,
    DragItemBox,
    ...datavComponentUI
  }
})
export default class Screen extends Mixins {
    public showGrid: boolean = false; // 是否显示网格
    public panel: any = {
      showLayerPanel: false, // 是否显示图层面板
      showComponentPanel: false, // 是否显示组件面板
      showRightPanel: false, // 是否显示右侧面板
    }
    @PageConfigModule.State configInfo: any; // 页面配置信息
    private pageConfigInfo: any = {};
    public selectedComponent: any = null; // 当前选中的组件

    mounted() {
      this.pageConfigInfo = _.cloneDeep(this.configInfo);
      this.pageConfigInfo.componentList = [];
    }

    // 面板样式
    get getDashboardStyle() {
        if (this.pageConfigInfo) {
            const value = this.pageConfigInfo.percent / 100.0;
            const bgColor = this.pageConfigInfo.bgColor || '';
            const width = this.pageConfigInfo.width || 0;
            const height = this.pageConfigInfo.height || 0;
            const style: any = { transform: 'scale(' + value + ', ' + value + ')' };
            style.width = width + 'px';
            style.height = height + 'px';
            style.background = bgColor;
            return style;
        }
        return null;
    }
    get selectedPanelComponent() {
      if(this.selectedComponent && this.selectedComponent.active) {
        return this.selectedComponent;
      }
      return null;
    }

    uploadFile(configInfo: any) {
      this.pageConfigInfo = _.cloneDeep(configInfo);
    }

    addComponent(item: any){
      // 1 ~ 1000随机数
      // let number = Math.round((1000 - 1) * Math.random() + 1);
      const component =  _.cloneDeep(item);
      component.componentNo = new Date().getTime().toString();
      this.pageConfigInfo.componentList.forEach((item: any) => {
        item.avtive = false;
      })
      component.active = true;
      component.z = this.pageConfigInfo.componentList.length + 1;
      this.selectedComponent = component;
      this.pageConfigInfo.componentList.push(component);
    }

    // 显示隐藏右侧面板
    changeShowRightPanel(val: boolean){
      this.panel.showRightPanel = val;
    }
    // 显示隐藏图层
    changeShowLayerPanel(val: boolean){
      this.panel.showLayerPanel = val;
    }

    // 是否显示网格
    changeShowGrid(val: boolean){
      this.showGrid = val;
    }
    // 选中
    onActivated(component: any){
      this.pageConfigInfo.componentList.forEach((item: any) => {
        item.active = false;
      })
      component.active = true;
      this.selectedComponent = component;
      // console.log('选中'+ component.componentNo);
    }
    // 取消选中
    onDeactivated(){
      // console.log('取消选中');
      // this.selectedComponent.active = false;
    }
    // 点击组件外侧，失去焦点
    onClickComponetOutsider(event: Event) {
      const elem: any = event.target || event.srcElement;
      if (elem.className == 'backgroud-image' && this.selectedComponent) {
          this.selectedComponent.active = false;
      }
    }
    // 删除组件
    deleteDragItem(componentNo: number){
      // console.log('删除组件'+ componentNo);
      let noList = this.pageConfigInfo.componentList.map((item: any) => item.componentNo);
      let index = noList.indexOf(componentNo);
      this.pageConfigInfo.componentList.splice(index, 1);
      if(this.selectedComponent.componentNo == componentNo) {
        this.selectedComponent.active = false;
      }
    }
    // 复制组件
    copyDragItem(component: any){
      // console.log('复制组件'+ component.componentNo);
      this.addComponent(component);
    }
}
