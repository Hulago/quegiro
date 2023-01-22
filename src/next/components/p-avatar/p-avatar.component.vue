<template>
  <el-avatar :size="size" :src="photo" @error="handleError">
    <span v-if="!photo && !selectedIcon">{{ letters }}</span>

    <el-icon v-if="selectedIcon" :size="iconSize">
      <Component :is="selectedIcon"></Component>
    </el-icon>
  </el-avatar>
</template>

<script ts src="./p-avatar.component.ts"></script>
