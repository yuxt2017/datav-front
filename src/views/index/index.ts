
import { Component } from 'vue-property-decorator';
import { Mixins } from '@/mixins';

@Component
export default class Index extends Mixins {
    public bgSrc: string = 'https://img.alicdn.com/tfs/TB1ykWbO3HqK1RjSZJnXXbNLpXa-2880-600.png';
    public tabIndex: string = '0';
    public groupIndex: number = -1;
    public showEditInput: boolean = false;
    private items: any = [];
    private groupName: string = '';

    public jumpScreenPage() {
        this.$router.push('screen');
    }

    public onAddInputBlur() {
        if (this.groupName !== '') {
            this.items.push({
                id: 101,
                isEdit: false,
                name: this.groupName,
                editName: this.groupName,
                num: 0,
            });
        }
        this.showEditInput = false;
    }

    public onAddGroupItem() {
        this.showEditInput = true;
        this.groupName = '';
        setTimeout(() => {
            const element: any = this.$refs.addGroupInput;
            element.focus();
        }, 20);
    }

    public onEditGroupItem(item: any) {
        setTimeout(() => {
            const elements: any = this.$refs.groupItemInput;
            const element: any = elements[0];
            element.focus();
        }, 20);
        item.isEdit = true;
    }
    public deleteGroupItem(index: number) {
        this.items.splice(index, 1);
    }
    public onItemEditInputBlur(item: any) {
        item.isEdit = false;
        if (item.name === '') {
            item.name = item.editName;
        }
    }
}
