import { computed, defineComponent, nextTick, ref, unref } from 'vue';

export default defineComponent({
    name: 'PCheckboxFilter',
    props: {
        params: { type: Object, default: () => null }
    },

    setup(props) {
        const {
            attrs = null,
            data = null,
            defaultValue = () => null,
            context = null,
            icon,
            label = '',
            onChange = () => null,
        } = props.params || {};

        const valueModel = ref(defaultValue());

        const selectedValue = computed({
            get() {
                return unref(valueModel);
            },
            set(value) {
                onChange({ selected: value, data });
                nextTick(() => valueModel.value = value);
            }
        });

        return {
            icon,
            label,
            selectedValue
        };
    }
});
