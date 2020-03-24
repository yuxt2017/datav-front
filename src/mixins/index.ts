import { Vue } from 'vue-property-decorator';
import { timestampToTime } from '@/utils/utils';

export class Mixins extends Vue {
    protected formatTime(value: string | Date): string {
        return timestampToTime(value, true);
    }
}
