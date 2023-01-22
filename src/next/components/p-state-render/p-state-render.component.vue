<template>
  <div class="flex items-center justify-center grow">
    <el-tag v-bind="selectedProps">
      {{ selectedProps.stateName }}
    </el-tag>
  </div>
</template>

<script ts src="./p-state-render.component.ts"></script>
