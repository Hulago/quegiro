<template>
  <el-tooltip>
    <div class="flex items-center">
      <p-avatar
        class="mr-1"
        style="--el-avatar-bg-color: var(--el-text-color-regular)"
        v-bind="selectedProps"
        :letters="initials"
        :photo="photo"
        :size="size"
      ></p-avatar>
      <span class="text-3">{{ name }}</span>
    </div>
    <template #content>
      <div class="flex items-center">
        <p-avatar
          class="mr-2"
          style="--el-avatar-bg-color: var(--el-text-color-regular)"
          v-bind="selectedProps"
          :letters="initials"
          :photo="photo"
          :size="56"
        ></p-avatar>
        <div flex flex-col>
          <span class="text-4 font-500">{{ name }}</span>
          <span class="text-3 font-400">{{ email }}</span>
        </div>
      </div>
    </template>
  </el-tooltip>
</template>

<script ts src="./p-avatar-render.component.ts"></script>
