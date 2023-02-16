<template>
  <el-tree-select
    v-model="value"
    class="p-tree-filter"
    :data="data"
    :multiple="multiple"
    :show-checkbox="showCheckbox"
    :check-strictly="checkStrictly"
    :check-on-click-node="checkOnClickNode"
    :placeholder="placeholder"
    filterable
    clearable
    :size="size"
    :render-after-expand="false"
    :filter-node-method="filterNodeMethod"
    :collapse-tags="true"
    :collapse-tags-tooltip="true"
  />
</template>

<script lang="ts" src="./p-tree-filter.component.ts"></script>

<style lang="scss" src="./p-tree-filter.component.scss"></style>
