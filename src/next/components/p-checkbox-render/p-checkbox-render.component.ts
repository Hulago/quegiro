import { computed, defineComponent, nextTick, ref, unref } from 'vue';

export default defineComponent({
    name: 'PCheckboxRender',
    props: {
        params: { type: Object, default: () => null }
    },

    setup(props) {
        const {
            attrs = null,
            context = null,
            data = null,
            defaultValue = () => null,
            icon,
            label = '',
            onChange = () => null,
        } = props.params || {};

        const valueModel = ref(defaultValue(data));

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
            selectedValue,
            icon,
            label,
        };
    }
});
