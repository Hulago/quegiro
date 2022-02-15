<template>
  <v-menu position="bottom" class="app-menu">
    <template #activator="{ on }">
      <v-btn class="pk-mr-2" icon="mdi-apps" rounded v-on="on">
        <v-icon>{{ mdiApps }}</v-icon>
      </v-btn>
    </template>

    <template #default>
      <v-card class="app-menu__card">
        <v-row>
          <v-col
            v-for="menu in menuItems"
            :key="menu.label"
            class="app-menu-item"
            @click="handleModule(menu)"
          >
            <div class="app-menu-item__icon">
              <v-icon>{{ menu.icon }}</v-icon>
            </div>

            <div class="app-menu-item__wrapper">
              <div class="app-menu-item__title">
                {{ menu.label }}
              </div>
              <div class="app-menu-item__subtitle">
                Matrix Dashboard Indicators
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider v-if="appItems.length > 0" class="pk-my-6" />

        <v-row>
          <v-col
            v-for="app in appItems"
            :key="app.label"
            class="app-menu-item"
            @click="handleApp(app)"
          >
            <div class="app-menu-item__icon">
              <v-icon>{{ app.icon }}</v-icon>
            </div>

            <div class="app-menu-item__wrapper">
              <div class="app-menu-item__title">
                {{ app.label }}
              </div>
              <div class="app-menu-item__subtitle">
                {{ app.description }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-menu>
</template>
<script lang="ts" src="./app-menu.component.ts"></script>

<style lang="scss" src="./app-menu.component.scss"></style>
