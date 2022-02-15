import { useEnvironment } from '@quegiro/common';
// import pkg from '@/../package.json';
// import { ROUTES } from '@/constants/routes.constant';
// import { useAuth } from '@/next';
import { useAuth } from '@quegiro/next';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import AppMenu from '../../components/app-menu/app-menu.component.vue';
import {
  IPKAppItems,
  IPKMenuItems
} from '../../components/app-menu/app-menu.types';
import ProfileMenu from '../../components/profile-menu/profile-menu.component.vue';
import ProzisLogo from '../../components/prozis-logo/prozis-logo.component.vue';

const { logout, profile } = useAuth();

const { env } = useEnvironment<ImportMetaEnv>(import.meta.env);

@Component({
  components: {
    AppMenu,
    ProfileMenu,
    ProzisLogo
  },
  name: 'app-container'
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
    const { attributes = null } = profile.value || ({} as any);
    const { userId = [], profilePhoto = [] } = attributes || {};
    return profilePhoto.length > 0 && userId.length > 0
      ? `https://static.sscontent.com/realm/intranet/${userId[0]}/${profilePhoto[0]}`
      : null;
  }

  get firstName() {
    const { firstName = '-' } = profile.value || ({} as any);
    return firstName;
  }

  get lastName() {
    const { lastName = '-' } = profile.value || ({} as any);
    return lastName;
  }

  get initials() {
    return (this.firstName[0] + this.lastName[0]).toUpperCase();
  }

  get email() {
    const { email = '-' } = profile.value || ({} as any);
    return email;
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
        label: this.i18n('MAIN.LABEL.ORGANIZATION'),
        roles: [],
        url: '/apps/organization/'
      }
    ];

    this.appItems = [
      {
        description: 'Now BackOffice',
        icon: 'mdi-open-in-new',
        label: 'Now',
        url: 'https://now.i.prozis.tech'
      },
      {
        description: 'Partnership BackOffice',
        icon: 'mdi-open-in-new',
        label: 'Partnership',
        url: 'https://partnership.i.prozis.tech'
      },
      {
        description: 'Voodoo BackOffice',
        icon: 'mdi-open-in-new',
        label: 'Voodoo',
        url: 'https://voodoo.i.prozis.tech'
      }
    ];
  }

  async handleLogout() {
    try {
      await logout();
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
