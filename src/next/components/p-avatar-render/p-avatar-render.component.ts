import { defineComponent } from 'vue';
import { isFunction, get } from 'lodash-es';

import PAvatar from '../p-avatar/p-avatar.component.vue';
import { getInitials } from '../../composables/utils.composable';

export default defineComponent({
  name: 'PAvatarRender',
  components: {
    PAvatar
  },
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const {
      data = null,
      attrs = null,
      context = null,
      nameField = 'name',
      photoField = 'photo',
      emailField = 'email',
      initialsField = 'initials',
      size = 'small'
    } = props.params || {};

    const name = get(data, nameField);
    const photo = get(data, photoField);
    const email = get(data, emailField);
    const initials = get(data, initialsField, getInitials(name));

    let selectedProps;

    if (isFunction(attrs)) {
      selectedProps = attrs(data, context);
    } else {
      selectedProps = attrs || {};
    }

    return {
      selectedProps,
      name,
      email,
      photo,
      size,
      initials
    };
  }
});
