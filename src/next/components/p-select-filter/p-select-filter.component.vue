<template>
  <el-select-v2
    v-model="value"
    class="p-select-filter"
    :options="options"
    popper-class="p-select-filter__popper"
    filterable
    :filter-method="filterMethod"
    :placeholder="placeholder"
    :multiple="multiple"
    clearable
    :collapse-tags="true"
    :collapse-tags-tooltip="true"
    :size="size"
  />
</template>

<script lang="ts" src="./p-select-filter.component.ts"></script>

<style lang="scss" src="./p-select-filter.component.scss"></style>
