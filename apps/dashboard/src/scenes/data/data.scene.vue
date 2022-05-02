<template>
  <v-col class="data">
    <v-row>
      <v-toolbar flat dark dense>
        <v-toolbar-title>Data</v-toolbar-title>

        <v-spacer />

        <v-btn dark color="warning" small class="mx-2" @click="handleClear">
          Clear all data
        </v-btn>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <h1>Transactions</h1>
          </v-row>

          <v-row>
            <v-col>
              <v-file-input
                v-model="file"
                :prepend-icon="icons.mdiCloudUpload"
                label="Upload transaction csv file"
                outlined
                rounded
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-btn
                dark
                color="primary"
                class="mx-2"
                @click="handleLoadTransations"
              >
                Load transations
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="pa-4">
            <v-progress-linear
              indeterminate
              v-if="isLoading"
            ></v-progress-linear>
          </v-row>

          <!-- <v-row>
            <h1>Account</h1>
          </v-row>

          <v-row>
            <v-col>
              <v-file-input
                v-model="file"
                :prepend-icon="icons.mdiCloudUpload"
                label="Upload account activity csv file"
                outlined
                rounded
                dense
                hide-details
              />
            </v-col>

            <v-col>
              <v-btn
                dark
                color="primary"
                class="mx-2"
                @click="handleLoadTransations"
              >
                Load Account Activity
              </v-btn>
            </v-col>
          </v-row> -->

          <!-- <v-row class="pa-4">
            <v-progress-linear value="15"></v-progress-linear>
          </v-row> -->
        </v-container>
      </v-col>
      <v-col class="pa-4">
        <v-container>
          <v-row>
            <h1>Data import</h1>
          </v-row>

          <v-row>
            <data-svg width="30vw" height="30vw" />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts" src="./data.scene.ts" />

<style lang="scss" src="./data.scene.scss" />
