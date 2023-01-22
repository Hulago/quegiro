<template>
  <p-form-control v-slot="{ on, error }" :form-control="fc">
    <el-form-item
      :label="label"
      :error="isEditMode ? error : null"
      :class="{ 'is-required': isEditMode ? isRequired : false }"
    >
      <div v-if="!isEditMode" class="p-form-select__detail">
        {{ isEmpty(value) ? '-' : selectedValue.label }}
      </div>
      <el-select-v2
        v-else
        v-model="value"
        :options="options"
        filterable
        clearable
        style="width: 100%"
        v-bind="{ ...on, ...$attrs }"
      />
    </el-form-item>
  </p-form-control>
</template>

<script ts src="./p-form-select.component.ts"></script>

<style lang="scss" src="./p-form-select.component.scss" />
