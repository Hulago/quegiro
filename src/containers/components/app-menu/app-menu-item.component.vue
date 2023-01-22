<template>
  <template v-for="menuItem of menuItems" :key="menuItem.id">
    <el-menu-item
      v-if="!hasChildren(menuItem) && !menuItem.isGroup"
      :route="menuItem.to"
      :index="menuItem.id"
    >
      <div class="app-menu-item__content">
        <el-icon v-if="menuItem.icon" :size="35">
          <Component :is="menuItem.icon" />
        </el-icon>
      </div>

      <template #title>{{ menuItem.label }}</template>
    </el-menu-item>

    <el-menu-item-group v-if="!hasChildren(menuItem) && menuItem.isGroup">
      <div>
        <el-icon v-if="menuItem.icon" :size="35">
          <Component :is="menuItem.icon" />
        </el-icon>
      </div>

      <template #title>
        <span>{{ menuItem.label }}</span>
      </template>
    </el-menu-item-group>

    <el-sub-menu v-if="hasChildren(menuItem)" :index="menuItem.id">
      <template #title>
        <div>
          <el-icon v-if="menuItem.icon" :size="35">
            <Component :is="menuItem.icon" />
          </el-icon>
        </div>

        <span>{{ menuItem.label }}</span>
      </template>

      <app-menu-item :menu-items="menuItem.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" src="./app-menu-item.component.ts"></script>

<style lang="scss" src="./app-menu-item.component.scss"></style>
