<template>
  <v-menu close-on-content-click bottom>
    <template #activator="{ on }">
      <v-avatar dark v-on="on">
        <v-btn class="pk-mr-2" icon="mdi-apps" rounded v-on="on">
          <v-icon>{{ mdiDotsVertical }}</v-icon>
        </v-btn>
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item border @click="handleClickProfile">
          <pk-list-item-action>icon</pk-list-item-action>

          <pk-list-item-content>Option1</pk-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script lang="ts" src="./profile-menu.component.ts"></script>
