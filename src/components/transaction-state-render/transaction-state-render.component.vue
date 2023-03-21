<template>
  <div class="flex items-center justify-center grow">
    <el-tag size="small" :type="type">
      <span v-if="isBuy">
        {{ labels.buy }} ({{ stateLabel }}: {{ remain }} of {{ qty }})
      </span>
      <span v-else>{{ labels.sale }} ({{ qty }})</span>
    </el-tag>
  </div>
</template>

<script ts src="./transaction-state-render.component.ts"></script>
