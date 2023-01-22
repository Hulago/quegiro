<template>
  <el-page-header
    class="p-toolbar"
    :class="{
      'p-toolbar--no-back': !back,
      'p-toolbar--no-breadcrumb': !showBreadcrumb
    }"
    @back="handleBack"
  >
    <template #title>{{ back }}</template>

    <template #content>
      <slot name="title" :title="title">
        <div class="flex items-center">
          {{ title }}
        </div>
      </slot>
    </template>
    <template #extra>
      <div class="flex items-center">
        <slot name="content"></slot>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts" src="./p-toolbar.component.ts"></script>

<style lang="scss" src="./p-toolbar.component.scss"></style>
