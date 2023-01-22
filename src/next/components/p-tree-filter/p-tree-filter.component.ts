import { defineComponent, computed, unref, nextTick, ref } from 'vue';
import { get, deburr, toLower } from 'lodash-es';

export default defineComponent({
  name: 'PTreeFilter',
  props: {
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const {
      filterItems: filterItemsFn = () => [],
      filterValue: filterValueFn = () => null,
      multiple,
      showCheckbox,
      checkStrictly,
      checkOnClickNode,
      placeholder = 'Filter',
      size = 'small'
    } = props.params || {};

    const value = filterValueFn();

    const data = filterItemsFn();

    const filterNodeMethod = (value: any, data: any) =>
      toLower(deburr(data.label)).includes(value.toLowerCase());

    return {
      checkOnClickNode,
      checkStrictly,
      data,
      filterNodeMethod,
      placeholder,
      multiple,
      value,
      showCheckbox,
      size
    };
  }
});

// import { Component, Vue } from 'vue-property-decorator';

// import { TreeFloatingParams } from '../../types';

// /**
//  * Component.
//  */
// @Component({
//   name: 'PkTreeFloatingFilter'
// })
// export default class PkTreeFloatingFilterComponent extends Vue {
//   value = null;

//   itemText = 'name';

//   itemValue = 'id';

//   itemChildren = 'children';

//   searchable = false;

//   params!: TreeFloatingParams;

//   isDense = true;

//   getterItems = () => [];

//   get items() {
//     return this.getterItems();
//   }

//   /**
//    * Getter selected value.
//    */
//   get selectedValue() {
//     return this.value;
//   }

//   /**
//    * Setter selected value.
//    */
//   set selectedValue(value) {
//     this.params.setFilterValue(value);

//     this.$nextTick(() => {
//       this.value = this.params.getFilterValue();
//     });
//   }

//   mounted() {
//     const {
//       getFilterItems = () => [],
//       getFilterValue = () => null,
//       isDense = true,
//       itemChildren = 'children',
//       itemText,
//       itemValue,
//       searchable = false
//     } = this.params || {};

//     this.itemText = itemText as string;
//     this.itemValue = itemValue as string;
//     this.itemChildren = itemChildren;
//     this.searchable = searchable;
//     this.isDense = isDense;

//     this.getterItems = getFilterItems;
//     this.value = getFilterValue();
//   }
// }
