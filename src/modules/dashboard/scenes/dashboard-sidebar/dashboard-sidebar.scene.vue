<template>
  <v-list dense nav>
    <v-list-item v-for="item in items" :key="item.label" link :to="item.route">
      <v-list-item-icon>
        <v-icon color="primary">
          {{ item.icon }}
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" src="./dashboard-sidebar.scene.ts" />

<style lang="scss" src="./dashboard-sidebar.scene.scss" />
