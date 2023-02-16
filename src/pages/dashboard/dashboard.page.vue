<template>
  <el-container class="dashboard" direction="vertical">
    <p-toolbar :title="'Dashboard'" @back="handleBack">
      <template #content>
        <!-- <el-button type="warning" @click="handleClear">
          Clear all data
        </el-button> -->
      </template>
    </p-toolbar>

    <el-container class="mt-4" direction="vertical">
      <el-row :gutter="20">
        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="'Loading'"
            :title="'Sales & Buys'"
          >
            <div ref="buysVsSalesChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="'Loading'"
            :title="'Portfolio'"
          >
            <div ref="totalPorfolioChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="'Loading'"
            :title="'Sales & Buys / Year'"
          >
            <div ref="buysVsSalesChartYearRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="'Loading'"
            :title="'Gain & Losses / Month'"
          >
            <div ref="gainsVsLossesMonthChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="'Loading'"
            :title="'Gain & Losses / Year'"
          >
            <div ref="gainsVsLossesYearChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./dashboard.page.ts" />

<style lang="scss" src="./dashboard.page.scss" />
