<template>
  <p-form-control v-slot="{ on, error }" :form-control="fc">
    <el-form-item
      :label="label"
      :error="isEditMode ? error : null"
      :class="{ 'is-required': isEditMode ? isRequired : false }"
    >
      <div v-if="!isEditMode" class="p-form-switch__detail">
        {{ isEmpty(value) ? '-' : value }}
      </div>

      <el-switch v-else v-model="value" v-bind="{ ...on, ...$attrs }" />
    </el-form-item>
  </p-form-control>
</template>

<script ts src="./p-form-switch.component.ts"></script>

<style lang="scss" src="./p-form-switch.component.scss" />
