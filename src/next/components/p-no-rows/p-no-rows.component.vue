<template>
  <el-result :title="title" :sub-title="description" class="p-no-rows">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <g fill="var(--el-color-primary-light-5)" transform="translate(0 46)">
          <rect fill="var(--el-color-primary)" height="50" width="3.8" />

          <circle cx="24.3" cy="24.9" r="12.5" />

          <rect height="7.5" width="72.5" x="44" y="15.8" />

          <rect height="7.5" width="25" x="44" y="26.7" />

          <rect height="7.5" width="25" x="152.9" y="21.2" />
        </g>

        <g fill="var(--el-color-primary-light-5)" transform="translate(0 104)">
          <rect fill="var(--el-color-primary)" height="50" width="3.8" />

          <circle cx="24.3" cy="24.9" r="12.5" />

          <rect height="7.5" width="72.5" x="44" y="15.8" />

          <rect height="7.5" width="25" x="44" y="26.7" />

          <rect height="7.5" width="25" x="152.9" y="21.2" />
        </g>
      </svg>
    </template>

    <template v-if="hasButton" #extra>
      <el-button v-bind="buttonAttrs">{{ buttonAttrs.label }}</el-button>
    </template>
  </el-result>
</template>

<script lang="ts" src="./p-no-rows.component.ts"></script>

<style lang="scss" src="./p-no-rows.component.scss" scoped></style>
