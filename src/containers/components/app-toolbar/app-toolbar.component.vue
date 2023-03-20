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

    <el-dropdown size="large">
      <el-icon :size="32" color="white">
        <MdiCog />
      </el-icon>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLang('pt-PT')">
            <el-icon><CircleFlagsPt /></el-icon>
            pt-PT - Português
          </el-dropdown-item>
          <el-dropdown-item @click="handleLang('en-US')">
            <el-icon><CircleFlagsUs /></el-icon>
            en-US - Inglês
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
<script lang="ts" src="./app-toolbar.component.ts"></script>

<style lang="scss" src="./app-toolbar.component.scss"></style>
