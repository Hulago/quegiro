<template>
  <p-form-control v-slot="{ on, error }" :form-control="fc">
    <el-form-item
      :label="label"
      :error="isEditMode ? error : null"
      :class="{ 'is-required': isEditMode ? isRequired : false }"
    >
      <div v-if="!isEditMode" class="p-form-input-number__detail">
        <el-tag>{{ isEmpty(value) ? '-' : formatter(value) }}</el-tag>
      </div>
      <el-input-number
        v-else
        v-model="value"
        show-stops
        show-input
        v-bind="{ ...on, ...$attrs }"
      />
    </el-form-item>
  </p-form-control>
</template>

<script ts src="./p-form-input-number.component.ts"></script>

<style lang="scss" src="./p-form-input-number.component.scss" />
