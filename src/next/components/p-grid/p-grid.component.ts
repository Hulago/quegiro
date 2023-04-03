/* eslint-disable max-len */
import { computed, defineComponent, nextTick, watch, ref, unref } from 'vue';
import { GridApi, ColumnApi, ColumnState } from 'ag-grid-community';
import { debounce, get } from 'lodash-es';
import { AgGridVue } from 'ag-grid-vue3';
import type { PropType } from 'vue';

import { useI18n, useStorage } from '@/next';

import MdiDrag from '~icons/mdi/drag';

import draggable from 'vuedraggable';

import { useDark } from '@vueuse/core';

type getRowDataFn = (
  startRow: number,
  limi: number, // limit
  sort: any, // Pass ISortModel
  filters: any, // Pass IFilterModel
  context: any
) => Promise<any>;

export default defineComponent({
  name: 'PGrid',
  components: {
    AgGridVue,
    draggable,
    MdiDrag
  },
  inheritAttrs: false,
  props: {
    countKey: {
      default: 'count',
      type: String
    },
    dataKey: {
      default: 'data',
      type: String
    },
    filters: {
      default: () => ({}),
      type: Object
    },
    frameworkComponents: {
      default: null,
      type: Object
    },
    getRowData: {
      default: null,
      type: Object as PropType<getRowDataFn>
    },
    showColumnConfig: {
      default: false,
      type: Boolean
    },
    tableName: {
      default: null,
      type: String
    },
    sort: {
      default: () => [],
      type: Array
    }
  },
  emits: ['api', 'columnApi', 'update:showColumnConfig', 'component'],
  setup(props, { emit }) {
    const isDark = useDark();
    let gridApi: GridApi | null;
    let columnApi: ColumnApi | null;
    let purgeCache: () => void;
    const autoFit = ref(true);

    const { t } = useI18n();

    const { getItem, setItem, removeItem } = useStorage();

    const labels = {
      setupTable: t('APP.LABEL.SETUP_TABLE'),
      columnsAutoFix: t('APP.LABEL.COLUMNS_AUTO_FIT'),
      column: t('APP.LABEL.COLUMN'),
      showColumn: t('APP.LABEL.SHOW_COLUMN'),
      pinned: t('APP.LABEL.PINNED'),
      cancel: t('APP.ACTION.CANCEL'),
      reset: t('APP.ACTION.RESET'),
      confirm: t('APP.ACTION.CONFIRM')
    };

    const columnState = ref<ColumnState[]>([]);

    const onGridReadyBase = (params: any) => {
      gridApi = params.api;
      columnApi = params.columnApi;

      emit('api', gridApi);

      emit('columnApi', columnApi);

      emit('component', { initialize: init });

      nextTick(() => {
        if (gridApi && autoFit.value) {
          gridApi.sizeColumnsToFit();
        }
      });
    };

    const init = (preRowData: any = null) => {
      const datasource = {
        getRows: (params: any) => {
          const agGridIFilterModel = {} as any;

          params.filterModel = {
            ...agGridIFilterModel, // Need to convert this one
            ...props.filters // already of type IFilterModel
          };

          const filters = Object.entries(params.filterModel).map(
            ([key, value]) => value
          );

          params.sortModel = [
            ...params.sortModel.map((item: any) => ({
              key: item.colId,
              order: item.sort
            })),
            ...props.sort
          ];

          props
            .getRowData(
              params.startRow,
              params.endRow - params.startRow, // limit
              params.sortModel, // Pass ISortModel
              filters, // Pass IFilterModel
              params.context
            )
            .then((rowsThisPage: any) => {
              let data = get(rowsThisPage, props.dataKey, rowsThisPage);
              let count = get(
                rowsThisPage,
                props.countKey,
                rowsThisPage._count || -1
              );

              if (preRowData) {
                data = [...preRowData, ...data];
                count += preRowData.length;
              }

              params.successCallback(data, count);

              if (count) {
                gridApi?.hideOverlay();
              } else {
                gridApi?.showNoRowsOverlay();
              }
            })
            .catch(() => {
              params.failCallback();
            });
        },
        rowCount: undefined
      };

      if (gridApi) {
        gridApi.setDatasource(datasource);

        purgeCache = debounce(
          () => {
            gridApi?.purgeInfiniteCache();
          },
          200,
          { leading: false, trailing: true }
        );
      }
    };

    /**
     * It returns the header name of a column.
     * @param {string} colId - The column id of the column you want to get the header name of.
     * @returns The header name of the column.
     */
    const getColumnHeaderName = (colId: string) => {
      const column: any = columnApi?.getColumn(colId);
      const { colDef = null } = column || {};
      const { headerName = colId } = colDef || {};
      return headerName;
    };

    /**
     * If the table name is not null, get the column state from local storage, otherwise get it from
     * the column API
     */
    const updateColumnState = async () => {
      if (props.tableName !== null) {
        const state = (await getItem(props.tableName)) || [];
        if (state.length === 0) {
          const initState = columnApi?.getColumnState() || [];
          await setItem(props.tableName, initState);
          columnState.value = initState;
        } else {
          columnState.value = state;
        }
      } else {
        columnState.value = columnApi?.getColumnState() || [];
      }
    };

    /**
     * It applies the column state to the grid, saves the column state to local storage, hides the
     * column config, and then sizes the columns to fit if the auto fit option is enabled
     */
    const handleChangeColumnState = async () => {
      if (columnApi) {
        columnApi.applyColumnState({
          state: columnState.value,
          applyOrder: true
        });
      }

      if (props.tableName !== null) {
        const newState = JSON.parse(JSON.stringify(unref(columnState)));
        await setItem(props.tableName, newState);
      }

      emit('update:showColumnConfig', false);
      nextTick(() => {
        if (gridApi && autoFit.value) {
          gridApi.sizeColumnsToFit();
        }
      });
    };

    const initColumnState = async () => {
      await updateColumnState();
      handleChangeColumnState();
    };

    /**
     * It resets the column state, removes the column state from local storage, and hides the column
     * configuration modal
     */
    const handleResetState = async () => {
      if (columnApi) {
        columnApi.resetColumnState();
        columnState.value = columnApi.getColumnState();
      }
      if (props.tableName) {
        removeItem(props.tableName);
      }
      emit('update:showColumnConfig', false);
      autoFit.value = true;
      if (gridApi && autoFit.value) {
        gridApi.sizeColumnsToFit();
      }
    };

    const handleCloseModal = () => {
      emit('update:showColumnConfig', false);
    };

    const onGridReady = (params: any) => {
      onGridReadyBase(params);
      // init lazy mode datasource options
      init();

      initColumnState();
    };

    const handleResize = () => {
      if (gridApi && autoFit.value) {
        gridApi.sizeColumnsToFit();
      }
    };

    watch(
      () => props.filters,
      (newVal: any, oldVal: any) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          if (purgeCache) {
            purgeCache();
          }
        }
      },
      { deep: true }
    );

    const showModal = computed({
      set(value) {
        emit('update:showColumnConfig', value);
      },
      get() {
        return props.showColumnConfig;
      }
    });

    return {
      labels,
      autoFit,
      showModal,
      columnState,
      context: {
        emit: emit.bind(this)
      },
      getColumnHeaderName,
      handleChangeColumnState,
      handleCloseModal,
      handleResize,
      isDark,
      onGridReady,
      handleResetState
    };
  }
});
