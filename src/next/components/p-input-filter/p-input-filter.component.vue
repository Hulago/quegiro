<template>
  <el-input
    :data-colid="colId"
    v-model="filterValue"
    class="p-text-filter"
    :type="type"
    :placeholder="placeholder"
    :size="size"
    :prefix-icon="icon"
    clearable
  />
</template>

<script lang="ts" src="./p-input-filter.component.ts"></script>

<style lang="scss" src="./p-input-filter.component.scss"></style>
