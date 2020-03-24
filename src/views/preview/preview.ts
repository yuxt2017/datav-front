// tslint:disable
import _ from 'lodash';
import { Component } from 'vue-property-decorator';
import { Mixins } from '@/mixins';
import datavComponentUI from '../../components/component-list/index';
import DragItemBox from '../../components/drag-item-box/index.vue';

@Component({
  components: {
    DragItemBox,
    ...datavComponentUI
  }
})
export default class Screen extends Mixins {
    private pageConfigInfo: any = {};

    // 面板样式
    get getDashboardStyle() {
        if (this.pageConfigInfo) {
            const value = 1;
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

    mounted() {
      let params: any = this.$route.query.params
      this.pageConfigInfo = JSON.parse(params);
      console.log(this.pageConfigInfo)
    }
}
