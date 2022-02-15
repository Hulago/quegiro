import { mdiApps } from '@mdi/js';
import { Component, Prop, Vue } from 'vue-property-decorator';

import { IPKAppItems, IPKMenuItems } from './app-menu.types';

/**
 * Profile menu
 */
@Component({
  name: 'app-menu'
})
export default class AppMenuComponent extends Vue {
  mdiApps = mdiApps;
  @Prop({ default: 3, type: Number })
  columns: number;

  @Prop({ default: 2, type: Number })
  columnsMd: number;

  @Prop({ default: () => [], type: Array })
  menuItems: IPKMenuItems[];

  @Prop({ default: () => [], type: Array })
  appItems: IPKAppItems;

  handleApp(app) {
    window.open(app.url, '_blank', 'noopener');
  }

  handleModule(menu) {
    this.$emit('selectModule', menu);
  }
}
