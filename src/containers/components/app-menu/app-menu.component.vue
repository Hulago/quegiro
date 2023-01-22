<template>
  <el-aside :width="isCollapsed ? '64px' : '200px'" class="app-menu">
    <el-scrollbar style="overflow-x: hidden">
      <div index="0" @click="$emit('toggle-menu')">
        <div
          class="app-menu__expand"
          :class="{ 'app-menu__expand--collapsed': isCollapsed }"
        >
          <el-icon :size="24">
            <i v-if="isCollapsed" inline-flex i="mdi-menu" />
            <i v-else inline-flex i="mdi-menu-close" />
          </el-icon>
          <div v-if="!isCollapsed" class="app-menu__expand-label">
            {{
              isCollapsed
                ? t('APP.LABEL.EXPAND_MENU')
                : t('APP.LABEL.COLLAPSE_MENU')
            }}
          </div>
        </div>
      </div>
      <el-menu
        :default-active="active"
        :collapse="isCollapsed"
        router
        @select="handleSelect"
      >
        <app-menu-item :menu-items="menuItems" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" src="./app-menu.component.ts"></script>

<style lang="scss" src="./app-menu.component.scss"></style>
