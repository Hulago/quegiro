import { computed, defineComponent } from 'vue';
import { toLower, deburr } from 'lodash-es';
import type { PropType } from 'vue';
import { isEmpty } from '../../composables/utils.composable';

type TreeNode<T = any> = {
  value: T;
  label: string;
  children: Array<TreeNode<T>>;
};

export default defineComponent({
  name: 'PFormTree',
  inheritAttrs: false,
  props: {
    fc: {
      default: null,
      type: Object
    },
    label: {
      default: null,
      type: String
    },
    modelValue: {
      default: null,
      type: [String, Number]
    },
    data: {
      default: () => [],
      type: Array as PropType<Array<TreeNode<number | string>>>
    },
    isEditMode: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: false,
      type: Boolean
    },
    filterable: {
      default: true,
      type: Boolean
    },
    valueKey: {
      default: 'value',
      type: String
    },
    clearable: {
      default: true,
      type: Boolean
    },
    renderAfterExpand: {
      default: false,
      type: Boolean
    },
    collapseTags: {
      default: true,
      type: Boolean
    },
    collapseTagsTooltip: {
      default: true,
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      }
    });

    const isRequired = computed(() => props.fc.schema.required);

    function getNodes(
      nodes: TreeNode[],
      value: string | number,
      res: any[] = []
    ) {
      nodes.forEach(node => {
        [value].includes(node.value)
          ? res.push(node.label)
          : getNodes(node.children, value, res);
      });
    }

    const filterNodeMethod = (value: any, data: any) =>
      toLower(deburr(data.label)).includes(String(value).toLowerCase());

    const selectedValue = computed(() => {
      const res: any[] = [];
      getNodes(props.data, props.modelValue, res);
      return res.join(', ');
    });

    return {
      filterNodeMethod,
      isEmpty,
      isRequired,
      selectedValue,
      value
    };
  }
});
