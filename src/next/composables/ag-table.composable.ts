import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { reactive, Ref, shallowRef, toRefs, ref } from 'vue';

import type { Component } from 'vue';

interface AgTableState {
  gridOptions: GridOptions | null;
  defaultColDef: ColDef | null;
  columnDefs: ColDef[];
}

type AgTableAPIs = {
  columnApi: ColumnApi | null;
  gridApi: GridApi | null;
};

const noop = (): any => null;
const empty = (): any => [];

export interface GridFloatingFilterArguments {
  filterValue?: Ref<unknown> | unknown;
  filterItems?: Ref<unknown> | unknown;
}

export interface SelectFloatingArguments extends GridFloatingFilterArguments {
  itemText?: string;
  itemValue?: string;
  itemDisabled?: string;
  multiple?: boolean;
}

export interface InputFloatingArguments extends GridFloatingFilterArguments {
  placeholder?: string;
  icon?: string | Component;
  type?: string;
  size?: string;
}

export interface DateFloatingArguments extends GridFloatingFilterArguments {
  placeholder?: string;
  icon?: string | Component;
  size?: string;
}

export interface TreeFloatingArguments extends GridFloatingFilterArguments {
  itemText?: string;
  itemValue?: string;
  itemChildren?: string;
  searchable?: boolean;
  size?: string;
  multiple?: boolean;
  showCheckbox?: boolean;
  checkStrictly?: boolean;
  checkOnClickNode?: boolean;
}

export interface CheckboxFloatingArguments extends GridFloatingFilterArguments {
  defaultValue?: any;
  icon?: string | Component;
  label?: string;
  onChange?: (...args: any) => void;
}

export interface NoRowsOverlayArguments {
  title?: string;
  description?: string;
  hasButton?: boolean;
  attrs?: any;
}

export function useAgTable({
  lazy = true,
  multiple = false,
  rowSelection = 'single',
  options = undefined
}: {
  lazy?: boolean;
  multiple?: boolean;
  rowSelection?: string;
  options?: GridOptions;
} = {}) {
  const columnApi = shallowRef<ColumnApi | null>(null);
  const gridApi = shallowRef<GridApi | null>(null);

  const lazyOptions = lazy
    ? {
        cacheBlockSize: 50,
        cacheOverflowSize: 2,
        getRowId(item: any) {
          // the id can be any string, as long as it's unique within your dataset
          return item.id;
        },
        infiniteInitialRowCount: 1,
        maxConcurrentDatasourceRequests: 1,
        pagination: false,
        paginationPageSize: 50,
        rowModelType: 'infinite' as const
      }
    : {};

  const multipleOptions = multiple
    ? {
        multiSortKey: 'ctrl',
        rowMultiSelectWithClick: true,
        rowSelection: 'multiple'
      }
    : {};

  const state = reactive<AgTableState>({
    columnDefs: [],
    defaultColDef: {
      floatingFilterComponentParams: {
        suppressFilterButton: true
      }
    },
    gridOptions: {
      animateRows: true,
      rowDeselection: true,
      rowSelection,
      suppressPropertyNamesCheck: true,
      ...lazyOptions,
      ...multipleOptions,
      ...(options ? options : {})
    }
  });

  const setGridApi = (api: GridApi) => {
    gridApi.value = api;
  };

  const setColumnApi = (api: ColumnApi) => {
    columnApi.value = api;
  };

  return {
    gridApi,
    columnApi,
    ...toRefs(state),
    setColumnApi,
    setGridApi
  };
}

export function useAgFilters() {
  function selectFilter({
    itemText = 'name',
    itemValue = 'id',
    itemDisabled = 'disabled',
    filterItems,
    filterValue,
    multiple = true
  }: SelectFloatingArguments) {
    return {
      floatingFilter: true,
      filter: true, // Here we can apply the popup filter component as string
      floatingFilterComponent: 'PSelectFilter',
      floatingFilterComponentParams: {
        filterItems: () => ref(filterItems),
        filterValue: () => ref(filterValue),
        itemText,
        itemValue,
        itemDisabled,
        multiple,
        suppressFilterButton: true
      },
      suppressMenu: true
    };
  }

  function inputFilter({
    placeholder = '',
    type = 'text',
    size = 'small',
    icon,
    filterValue
  }: InputFloatingArguments) {
    return {
      floatingFilter: true,
      filter: true, // Here we can apply the popup filter component as string
      floatingFilterComponent: 'PInputFilter',
      floatingFilterComponentParams: {
        placeholder,
        size,
        icon,
        filterValue: () => ref(filterValue),
        suppressFilterButton: true,
        type
      },
      suppressMenu: true
    };
  }

  function dateFilter({
    placeholder = '',
    size = 'small',
    icon,
    filterValue
  }: DateFloatingArguments) {
    return {
      floatingFilter: true,
      filter: true, // Here we can apply the popup filter component as string
      floatingFilterComponent: 'PDateFilter',
      floatingFilterComponentParams: {
        filterValue: () => ref(filterValue),
        icon,
        placeholder,
        size,
        suppressFilterButton: true
      },
      suppressMenu: true
    };
  }

  function treeFilter({
    itemText = 'name',
    itemValue = 'id',
    itemChildren = 'children',
    searchable = false,
    size = 'small',
    multiple = false,
    showCheckbox = true,
    checkStrictly = false,
    checkOnClickNode = true,
    filterItems = noop,
    filterValue = noop
  }: TreeFloatingArguments) {
    return {
      floatingFilter: true,
      filter: true, // Here we can apply the popup filter component as string
      floatingFilterComponent: 'PTreeFilter',
      floatingFilterComponentParams: {
        filterItems: () => ref(filterItems),
        filterValue: () => ref(filterValue),
        size,
        multiple,
        showCheckbox,
        checkStrictly,
        checkOnClickNode,
        itemChildren,
        itemText,
        itemValue,
        searchable,
        suppressFilterButton: true
      },
      suppressMenu: true
    };
  }

  function checkboxFilter({
    defaultValue,
    icon,
    label = '',
    onChange = noop
  }: CheckboxFloatingArguments) {
    return {
      filter: true,
      floatingFilter: true, // Here we can apply the popup filter component as string
      floatingFilterComponent: 'PCheckboxFilter',
      floatingFilterComponentParams: {
        defaultValue,
        icon,
        label,
        onChange,
        suppressFilterButton: true
      },
      suppressMenu: true
    };
  }

  return {
    checkboxFilter,
    dateFilter,
    inputFilter,
    selectFilter,
    treeFilter
  };
}

export function useOverlay() {
  function noRowsOverlay({
    title = 'No Rows',
    description = 'No rows for current search criteria',
    hasButton = false,
    attrs = null
  }: NoRowsOverlayArguments) {
    return {
      noRowsOverlayComponent: 'PNoRows',
      noRowsOverlayComponentParams: {
        title,
        description,
        hasButton,
        attrs
      }
    };
  }

  return { noRowsOverlay };
}
