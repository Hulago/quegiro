<template>
  <el-header class="app-toolbar">
    <h2 class="app-toolbar__name" @click="handleClickHome">QUEGIRO</h2>

    <el-breadcrumb separator="/" class="mr-a">
      <el-breadcrumb-item
        v-for="item in breadcrumb"
        :key="item.title"
        :to="item.to"
        :replace="item.replace"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>
<script lang="ts" src="./app-toolbar.component.ts"></script>

<style lang="scss" src="./app-toolbar.component.scss"></style>
