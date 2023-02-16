<template>
  <div class="flex items-center justify-center grow">
    <el-tag size="small" :type="type">
      <span v-if="isBuy">Buy ({{ state }}: {{ remain }} of {{ qty }})</span>
      <span v-else>Sell ({{ qty }})</span>
    </el-tag>
  </div>
</template>

<script ts src="./transaction-state-render.component.ts"></script>
