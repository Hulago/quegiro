<template>
  <main-container
    v-model="drawer"
    has-sidebar
    :title="i18n('MAIN.LABEL.DASHBOARD')"
    :icon="mdiViewDashboard"
  />
</template>

<script lang="ts" src="./dashboard.scene.ts" />

<style lang="scss" src="./dashboard.scene.scss" />
