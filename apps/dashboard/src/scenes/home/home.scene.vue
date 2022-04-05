<template>
  <!-- <v-parallax
    dark
    src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
  >
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="text-h4 font-weight-thin mb-4">QUEGIRO</h1>
        <h4 class="subheading">Track your transactions</h4>
      </v-col>
    </v-row>
    
  </v-parallax> -->
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
