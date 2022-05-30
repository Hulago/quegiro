<template>
  <router-view v-if="!loading" :key="locale" />

  <div v-else class="root__loading">Loading</div>
</template>

<script lang="ts" src="./root.container.ts" />

<style lang="scss" src="./root.container.scss" />
