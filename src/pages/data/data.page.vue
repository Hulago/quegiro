<template>
  <el-container class="data" direction="vertical">
    <p-toolbar :title="labels.importData" @back="handleBack">
      <template #content>
        <el-button type="warning" @click="handleClear">
          {{ labels.clearAllData }}
        </el-button>
      </template>
    </p-toolbar>

    <el-container class="mt-4" direction="vertical">
      <el-row :gutter="20">
        <el-col :span="12">
          <div
            style="font-size: var(--el-font-size-large)"
            class="mb-2 font-600"
          >
            {{ labels.transactions }}
          </div>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data1 }}
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data2 }}
          </p>

          <el-card shadow="never">
            <el-upload
              ref="uploadTransactions"
              v-model:file-list="transactionFiles"
              class="upload-transaction"
              :auto-upload="false"
            >
              <template #trigger>
                <el-button type="primary" plain>
                  {{ labels.selectTransactionFile }}
                </el-button>
              </template>

              <el-button
                class="ml-3"
                type="primary"
                round
                :disabled="!hasTransactionFile"
                @click="handleLoadTransations"
              >
                {{ labels.loadTransactions }}
              </el-button>

              <template #tip>
                <div class="el-upload__tip">
                  {{ labels.uploadTransactionCSVFile }}
                </div>
              </template>
            </el-upload>
          </el-card>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.toBeginGoTo }}
            <code>
              <b>inbox</b>
              ({{ labels.section }}) >
              <b>{{ labels.transactions }}</b>
              (tab)
            </code>
            &nbsp;

            {{ labels.inDegiroApplication }}.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data3 }}
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            <b>{{ labels.note }}:</b>
            {{ labels.sentence.data4 }}
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data5 }}
          </p>

          <el-divider></el-divider>

          <div
            style="font-size: var(--el-font-size-large)"
            class="mb-2 font-600"
          >
            {{ labels.accountAndBalance }}
          </div>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data6 }}
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data7 }}
          </p>

          <el-card shadow="never">
            <el-upload
              ref="uploadAccount"
              v-model:file-list="accountFiles"
              class="upload-Account"
              :auto-upload="false"
            >
              <template #trigger>
                <el-button type="primary" plain>
                  {{ labels.selectAccountFile }}
                </el-button>
              </template>

              <el-button
                class="ml-3"
                type="primary"
                round
                :disabled="!hasAccountFile"
                @click="handleLoadAccount"
              >
                {{ labels.loadAccount }}
              </el-button>

              <template #tip>
                <div class="el-upload__tip">
                  {{ labels.uploadAccountCSVFile }}
                </div>
              </template>
            </el-upload>
          </el-card>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.toBeginGoTo }}
            <code>
              <b>inbox</b>
              ({{ labels.section }}) >
              <b>{{ labels.accountOverview }}</b>
              (tab)
            </code>
            {{ labels.inDegiroApplication }}.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data8 }}
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            {{ labels.sentence.data9 }}
          </p>
        </el-col>

        <el-col
          :span="12"
          class="flex flex-col items-center justify-center"
          style="display: flex !important"
        >
          <h1>{{ labels.importData }}</h1>
          <DataSvg width="30vw" height="30vw" />
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./data.page.ts" />

<style lang="scss" src="./data.page.scss" />
