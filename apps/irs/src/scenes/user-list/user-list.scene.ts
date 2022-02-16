import { Welcome } from '@quegiro/common';
import { useGraph } from '@quegiro/next';
import { defineComponent, ref } from '@vue/composition-api';

import query from './user-list.query.gql';

const { client } = useGraph();

export default defineComponent({
  setup() {
    const message = ref(Welcome('User List :)'));

    const getUserList = async () => {
      const res = await client?.query({
        query
      });
    };

    return {
      getUserList,
      message
    };
  }
});
