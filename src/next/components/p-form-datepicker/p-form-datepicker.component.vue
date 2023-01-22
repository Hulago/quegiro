<template>
  <p-form-control v-slot="{ on, error }" :form-control="fc">
    <el-form-item
      :label="label"
      :error="isEditMode ? error : null"
      :class="{ 'is-required': isEditMode ? isRequired : false }"
    >
      <div v-if="!isEditMode" class="p-form-datepicker__detail">
        <el-icon class="mr-2 p-form-datepicker__icon">
          <Clock v-if="type.includes('time')" />
          <Calendar v-else />
        </el-icon>
        <span>{{ isEmpty(value) ? '-' : formatDate(value) }}</span>
      </div>
      <el-date-picker
        v-else
        v-model="value"
        v-bind="{ ...on, ...$attrs }"
        :editable="false"
        :format="format"
        style="width: 100%"
        :type="type"
      />
    </el-form-item>
  </p-form-control>
</template>

<script ts src="./p-form-datepicker.component.ts"></script>

<style lang="scss" src="./p-form-datepicker.component.scss" />
