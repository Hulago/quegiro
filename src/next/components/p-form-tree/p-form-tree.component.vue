<template>
  <p-form-control v-slot="{ on, error }" :form-control="fc">
    <el-form-item
      :label="label"
      :error="isEditMode ? error : null"
      :class="{ 'is-required': isEditMode ? isRequired : false }"
    >
      <div v-if="!isEditMode" class="p-form-tree__detail">
        {{ isEmpty(value) ? '-' : selectedValue }}
      </div>

      <el-tree-select
        v-else
        v-model="value"
        :data="data"
        :placeholder="label"
        :multiple="multiple"
        :show-checkbox="multiple"
        :filterable="filterable"
        :clearable="clearable"
        :value-key="valueKey"
        :render-after-expand="renderAfterExpand"
        :collapse-tags="collapseTags"
        :collapse-tags-tooltip="collapseTagsTooltip"
        style="width: 100%"
        :filter-node-method="filterNodeMethod"
        v-on="on"
      />
    </el-form-item>
  </p-form-control>
</template>

<script ts src="./p-form-tree.component.ts"></script>

<style lang="scss" src="./p-form-tree.component.scss" />
