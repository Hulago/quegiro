<template>
  <el-config-provider namespace="el" :size="size">
    <el-container class="app" direction="vertical">
      <app-toolbar :breadcrumb="breadcrumb" :name="name" @home="handleHome" />

      <el-container direction="horizontal">
        <app-menu
          :active="active"
          :menu-items="menuItems"
          :is-collapsed="miniSidebar"
          @toggle-menu="toggleSidebar"
          @select="handleSelect"
        />

        <el-main class="app__main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script lang="ts" src="./app.container.ts" />

<style lang="scss" src="./app.container.scss" />
