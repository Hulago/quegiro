import {
  defineComponent,
  computed,
  ref,
  unref,
  nextTick,
  shallowRef,
  onMounted
} from 'vue';
import { deburr, get } from 'lodash-es';
import { isEmptyString } from '../../composables/utils.composable';

export default defineComponent({
  name: 'PSelectFilter',
  props: {
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const {
      filterItems: filterItemsFn = () => [],
      filterValue: filterValueFn = () => null,
      itemDisabled = 'disabled',
      itemText = 'label',
      itemValue = 'value',
      multiple = false,
      placeholder = 'Filter',
      size = 'small'
    } = props.params || {};

    const query = ref('');

    const value = filterValueFn();
    const items = filterItemsFn();

    const options = computed(() =>
      items.value
        ? items.value
            .filter(
              (item: unknown) =>
                isEmptyString(query.value) ||
                query.value === undefined ||
                query.value === null ||
                deburr(get(item, itemText))
                  .toLowerCase()
                  .includes(query.value.toLowerCase())
            )
            .map((item: unknown) => ({
              value: get(item, itemValue),
              label: get(item, itemText),
              disabled: get(item, itemDisabled, false)
            }))
        : []
    );

    const filterMethod = (queryFilter: string) => {
      query.value = queryFilter;
    };

    return {
      multiple,
      options,
      placeholder,
      filterMethod,
      value,
      size
    };
  }
});
