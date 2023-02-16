<template>
  <el-icon v-bind="iconsAttrs">
    <Component :is="iconsAttrs.component" />
  </el-icon>
</template>

<script ts src="./p-icon-render.component.ts"></script>
