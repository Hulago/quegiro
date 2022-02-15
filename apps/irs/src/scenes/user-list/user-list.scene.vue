<template>
  <v-container fluid>
    <h1>User List</h1>
    <h2>{{ message }}</h2>
    <pk-button @click="getUserList"> Get User list </pk-button>
  </v-container>
</template>

<script lang="ts" src="./user-list.scene.ts" />

<style lang="scss" src="./user-list.scene.scss" />
