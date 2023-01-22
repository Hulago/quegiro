<template>
  <el-container class="dashboard" direction="vertical">
    <p-toolbar :title="'Categories'">
      <template #content>
        <!-- <el-button type="warning" @click="handleClear">
          Clear all data
        </el-button> -->
      </template>
    </p-toolbar>

    <el-container class="mt-4" direction="vertical">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input
            v-model="input3"
            class="w-50 m-2"
            placeholder="Please Input"
            :prefix-icon="Search"
          />
          <el-table :data="[]" style="width: 100%">
            <el-table-column prop="date" label="Product" />
            <el-table-column fixed="right" label="Operations" width="120">
              <template #default>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="handleClick"
                >
                  Detail
                </el-button>
                <el-button link type="primary" size="small">Edit</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :span="12">Category list</el-col>
      </el-row>
    </el-container>
  </el-container>

  <!-- <v-col class="categories">
    <v-row>
      <v-col class="categories__product-list">
        <v-toolbar flat dark dense class="categories__toolbar">
          <v-toolbar-title>Map Products into categories</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-list dense>
          <v-list-item v-for="product in products" :key="product.isin" link>
            <v-list-item-content>
              <v-list-item-title>
                {{ product.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-select
                v-model="product.categoryId"
                :items="categories"
                style="width: 200px"
                item-text="name"
                item-value="categoryId"
                dense
                hide-details
                clearable
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col class="categories__category-list">
        <v-toolbar flat dark dense class="categories__toolbar">
          <v-toolbar-title>Categories</v-toolbar-title>

          <v-spacer />

          <v-text-field
            v-model="categoryName"
            label="Add Category"
            outlined
            rounded
            dense
            solo
            hide-details
          />

          <v-btn
            dark
            :disabled="!categoryName"
            color="primary"
            small
            class="mx-2"
            @click="handleCreateCategory"
          >
            create category
          </v-btn>
        </v-toolbar>
        <v-list dense>
          <v-list-item
            v-for="category in categories"
            :key="category.categoryId"
            link
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ category.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                icon
                small
                rounded
                color="secondary"
                @click="handleRemoveCategory(category)"
              >
                <v-icon>{{ icons.mdiDelete }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="isNotificationVisible"
      :color="notificationColor"
      :timeout="2000"
    >
      {{ notificationText }}

      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="isNotificationVisible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-col> -->
</template>

<script lang="ts" src="./categories.page.ts" />

<style lang="scss" src="./categories.page.scss" />
