<template>
  <el-container class="dashboard" direction="vertical">
    <p-toolbar :title="labels.dashboard" @back="handleBack">
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
            :element-loading-text="labels.loading"
            :title="labels.buysAndSales"
          >
            <div ref="buysVsSalesChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="labels.loading"
            :title="labels.portfolio"
          >
            <div ref="totalPorfolioChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="labels.loading"
            :title="labels.buysAndSalesPerYear"
          >
            <div ref="buysVsSalesChartYearRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="labels.loading"
            :title="labels.gainsAndLossesPerMonth"
          >
            <div ref="gainsVsLossesMonthChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="labels.loading"
            :title="labels.gainsAndLossesPerYear"
          >
            <div ref="gainsVsLossesYearChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>

        <el-col :span="12">
          <p-fieldset
            :is-loading="isLoading"
            :element-loading-text="labels.loading"
            :title="labels.dividends"
          >
            <div ref="dividendChartRef" class="dashboard__graph" />
          </p-fieldset>
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./dashboard.page.ts" />

<style lang="scss" src="./dashboard.page.scss" />
