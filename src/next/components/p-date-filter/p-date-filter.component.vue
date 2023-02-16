<template>
  <el-date-picker
    v-model="filterValue"
    class="p-date-filter"
    type="date"
    :placeholder="placeholder"
    :size="size"
  />
</template>

<script lang="ts" src="./p-date-filter.component.ts"></script>

<style lang="scss" src="./p-date-filter.component.scss"></style>
