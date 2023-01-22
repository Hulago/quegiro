<template>
  <el-container class="account" direction="vertical">
    <p-toolbar title="account">
      <template #content>
        <el-input
          v-model="searchCriteria"
          style="min-width: 400px"
          class="mr-3"
          :timeout="0"
          clearable
          placeholder="Search"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #append>
            <el-button :icon="icons.mdiSearch" @click="handleSearch" />
          </template>
        </el-input>

        <el-tooltip :content="'Setup table'">
          <el-button
            circle
            :icon="icons.mdiTableCog"
            @click="handleShowTableConfig"
          />
        </el-tooltip>
      </template>
    </p-toolbar>

    <el-container class="account__content" direction="vertical">
      <p-grid
        v-if="!isLoading"
        v-model:show-column-config="isAgTableModal"
        style="height: 100%"
        table-name="account-table"
        :column-defs="columnDefs"
        :default-col-def="defaultColDef"
        :grid-options="gridOptions"
        :row-data="selectedAccount"
        animate-rows="true"
        @view-detail="handleViewDetail"
        @api="setGridApi"
        @column-api="setColumnApi"
      />
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./account.page.ts" />

<style lang="scss" src="./account.page.scss" />
