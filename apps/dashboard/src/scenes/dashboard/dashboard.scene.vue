<template>
  <main-container
    v-model="drawer"
    :title="i18n('MAIN.LABEL.DASHBOARD')"
    :icon="mdiViewDashboard"
    has-sidebar
  />
</template>

<script lang="ts" src="./dashboard.scene.ts" />

<style lang="scss" src="./dashboard.scene.scss" />
