<template>
  <v-container>
    <v-row class="mt-8">
      <v-col class="text-center" cols="6">
        <div ref="buysVsSalesChartRef" class="home__graph" />
      </v-col>

      <v-col class="text-center" cols="6">
        <div ref="totalPorfolioChartRef" class="home__graph" />
      </v-col>

      <v-col class="text-center" cols="6">
        <div ref="buysVsSalesChartYearRef" class="home__graph" />
      </v-col>

      <v-col class="text-center" cols="6">
        <div ref="gainsVsLossesMonthChartRef" class="home__graph" />
      </v-col>

      <v-col class="text-center" cols="6">
        <div ref="gainsVsLossesYearChartRef" class="home__graph" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./home.scene.ts" />

<style lang="scss" src="./home.scene.scss" />
