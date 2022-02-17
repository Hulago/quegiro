<template>
  <pk-sidebar
    class="organization-sidebar"
    :title="i18n('ORGANIZATION.LABEL.ORGANIZATION')"
    icon="mdi-format-list-checks"
    :items="selectedSidebarItems"
  />
</template>

<script lang="ts" src="./organization-sidebar.scene.ts" />

<style lang="scss" src="./organization-sidebar.scene.scss" />
