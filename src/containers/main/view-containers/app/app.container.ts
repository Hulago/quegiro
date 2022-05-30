import { Component, Prop } from 'vue-property-decorator';
import { useEnvironment } from '@/common';
// import pkg from '@/../package.json';
// import { ROUTES } from '@/constants/routes.constant';
// import { useAuth } from '@/next';

import Vue from 'vue';

import {
  IPKAppItems,
  IPKMenuItems
} from '../../components/app-menu/app-menu.types';
import ProfileMenu from '../../components/profile-menu/profile-menu.component.vue';
import AppMenu from '../../components/app-menu/app-menu.component.vue';

const { env } = useEnvironment<ImportMetaEnv>(import.meta.env);

@Component({
  components: {
    AppMenu,
    ProfileMenu
  },
  name: 'AppContainer'
})
export default class extends Vue {
  isFloatSidebar = false;
  isMiniSidebar = false;

  mode = env.mode || null;

  // version = pkg.version;
  sidebarItems: IPKMenuItems[] = [];
  appItems: IPKAppItems[] = [];

  @Prop({ type: String })
  title!: string;

  @Prop({ default: 'mdi-view-dashboard', type: String })
  icon!: string;

  @Prop({ default: false, type: Boolean })
  hasSidebar!: boolean;

  @Prop({ default: false, type: Boolean })
  expandOnHover!: boolean;

  @Prop({ default: false, type: Boolean })
  miniVariant!: boolean;

  @Prop({ default: false, type: Boolean })
  floating!: boolean;

  @Prop({ default: true, type: Boolean })
  value!: boolean;

  get selectedValue() {
    return this.value;
  }

  set selectedValue(value) {
    this.$emit('input', value);
  }

  // get isDev() {
  //   const BUILD_MODE = process.env.BUILD_MODE || 'dev';
  //   return ['dev', 'local'].includes(BUILD_MODE);
  // }

  get hasNoSidebar() {
    const { nosidebar = false } = this.$route.meta || {};
    return nosidebar;
  }

  get photoPath() {
    return null;
  }

  get firstName() {
    return '-';
  }

  get lastName() {
    return '-';
  }

  get initials() {
    return (this.firstName[0] + this.lastName[0]).toUpperCase();
  }

  get email() {
    return '-';
  }

  get user() {
    return {
      avatar: this.photoPath,
      email: this.email,
      initials: this.initials,
      name: `${this.firstName} ${this.lastName}`
    };
  }

  get selectedSidebarItems() {
    return this.sidebarItems;
    // .filter((item) => hasOneRoleOf(item.roles));
  }

  constructor() {
    super();

    this.sidebarItems = [
      {
        icon: 'mdi-view-dashboard',
        label: this.i18n('MAIN.LABEL.DASHBOARD'),
        roles: [],
        url: '/apps/dashboard/'
      },
      {
        icon: 'mdi-sitemap',
        label: this.i18n('MAIN.LABEL.IRS'),
        roles: [],
        url: '/apps/irs/'
      }
    ];

    this.appItems = [
      {
        description: 'Descrição',
        icon: 'mdi-open-in-new',
        label: 'App',
        url: 'https://app'
      }
    ];
  }

  async handleLogout() {
    try {
      return null;
    } catch (e) {
      console.error('Logout', e);
    } finally {
      this.$router.push({ path: '/' });
    }
  }

  // handleClickLogo() {
  //   this.$router.push({ name: ROUTES.DASHBOARD.DASHBOARD });
  // }

  // handleClickProfile() {
  //   this.$router.push({ name: ROUTES.PROFILE.USER_PROFILE });
  // }

  handleSelectModule(item: IPKMenuItems) {
    window.location.href = item.url || '';
    // this.$router.push(item.route);
  }
}
