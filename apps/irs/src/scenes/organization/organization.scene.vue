<template>
  <main-container
    v-model="drawer"
    :title="i18n('MAIN.LABEL.ORGANIZATION')"
    icon="mdi-sitemap"
    has-sidebar
  />
</template>

<script lang="ts" src="./organization.scene.ts" />

<style lang="scss" src="./organization.scene.scss" />
