<template>
  <div
    v-if="!isEmpty(selectedValue)"
    :class="classComputed"
    :title="formatedValue"
  >
    {{ formatedValue }}
  </div>

  <div v-else :class="classComputed">
    <slot name="empty">-</slot>
  </div>
</template>

<script ts src="./p-number-render.component.ts"></script>
