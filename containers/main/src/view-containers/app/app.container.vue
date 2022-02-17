<template>
  <v-app>
    <v-navigation-drawer
      v-if="selectedValue && hasSidebar"
      app
      permanent
      clipped
    >
      <router-view name="sidebar" />
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense
      outlined
      clipped-left
      elevate-on-scroll
      color="primary"
    >
      <div class="app__logo">
        <v-app-bar-nav-icon
          v-if="hasSidebar"
          class="pk-mr-4"
          @click.stop="selectedValue = !selectedValue"
        />
        <h2>QUEGIRO</h2>
      </div>

      <div class="app__breadcrumb">
        <v-icon dark class="mr-3">
          {{ icon }}
        </v-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </div>

      <v-spacer />

      <app-menu
        :columns="3"
        :menu-items="selectedSidebarItems"
        :app-items="appItems"
        @selectModule="handleSelectModule"
      />

      <profile-menu :user="user" />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid style="height: 100%; padding: 0px">
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="app__footer">
      <b>{{ mode }}</b>
      &nbsp; / Version 1.0
    </v-footer>
  </v-app>
</template>

<script lang="ts" src="./app.container.ts" />

<style lang="scss" src="./app.container.scss" />
