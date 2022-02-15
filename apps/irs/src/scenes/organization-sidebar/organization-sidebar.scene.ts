import { Component, Vue } from 'vue-property-decorator';

import { ROUTES } from '../../constants/routes.constant';

@Component({
  name: 'organization-sidebar-scene'
})
export default class OrganizationSidebarScene extends Vue {
  stories: any[] = [];
  isLoading = false;

  get selectedSidebarItems() {
    const items: any[] = [
      {
        label: this.i18n('ORGANIZATION.LABEL.USER_LIST'),
        route: {
          name: ROUTES.USER_LIST
        }
      },
      {
        label: this.i18n('ORGANIZATION.LABEL.DEPARTMENTS'),
        route: {
          name: ROUTES.DEPARTMENTS
        }
      }
    ];

    return items;
  }
}
