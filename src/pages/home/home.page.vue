<template>
  <el-container class="news-form" direction="vertical">
    <p-toolbar
      :back="labels.action.back"
      :title="labels.welcome"
      @back="handleBack"
    >
      <template #content></template>
    </p-toolbar>

    <el-container class="mt-4" direction="vertical">
      <el-row :gutter="20">
        <el-col :span="12">
          <h1>{{ labels.welcome }}</h1>
          <el-alert :title="labels.sentence.newVersion" type="warning" />
          <p>
            {{ labels.sentence.home1 }}
            <code>
              <a href="https://www.degiro.com/">Degiro</a>
              {{ labels.sentence.home2 }}
            </code>
            {{ labels.sentence.home3 }}
          </p>

          <p>
            {{ labels.sentence.home4 }}
          </p>

          <p>
            {{ labels.sentence.home5 }}
          </p>

          <p>
            {{ labels.sentence.home6 }}
          </p>

          <p class="font-600">
            {{ labels.sentence.home7 }}
          </p>

          <el-button type="primary" round size="large" @click="handleStart">
            <b>{{ labels.sentence.home8 }}</b>
          </el-button>

          <p>
            <code>{{ labels.note }}:</code>
            {{ labels.sentence.home9 }}
            <span>
              <a href="mailto:quegiro.mail@gmail.com">
                ({{ labels.contact }}: quegiro.mail@gmail.com)
              </a>
            </span>
          </p>
        </el-col>

        <el-col
          :span="12"
          class="flex items-center justify-center"
          style="display: flex !important"
        >
          <HomeSvg style="width: 80%; height: 80%" />
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./home.page.ts" />

<style lang="scss" src="./home.page.scss" />
