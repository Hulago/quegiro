<template>
  <div v-if="isMultiple">
    <template v-for="(buttonProp, index) in selectedProps" :key="index">
      <el-button v-bind="buttonProp">
        <template v-if="!buttonProp.icon" #default>
          {{ buttonProp.label }}
        </template>
      </el-button>
    </template>
  </div>

  <el-button v-else v-bind="selectedProps">
    <template v-if="!selectedProps.icon" #default>
      {{ selectedProps.label }}
    </template>
  </el-button>
</template>

<script ts src="./p-button-render.component.ts"></script>
