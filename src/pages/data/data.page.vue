<template>
  <el-container class="data" direction="vertical">
    <p-toolbar title="Import data">
      <template #content>
        <el-button type="warning" @click="handleClear">
          Clear all data
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
            Transaction
          </div>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Welcome to the Import Transactions section of our application.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Here, you will be able to import all of your transactions from your
            broker in CSV format.
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
                  select transaction file
                </el-button>
              </template>

              <el-button
                class="ml-3"
                type="primary"
                round
                :disabled="!hasTransactionFile"
                @click="handleLoadTransations"
              >
                Load transactions
              </el-button>

              <template #tip>
                <div class="el-upload__tip">Upload transaction csv file</div>
              </template>
            </el-upload>
          </el-card>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            To begin, go to
            <code>
              <b>inbox</b>
              (section) >
              <b>transaction</b>
              (tab)
            </code>
            in
            <b>Degiro</b>
            application.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Select the date range for the transactions you would like to export.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            <b>Note:</b>
            To proper calculate sell value, you should export all data.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Once you have selected date range, click export button and select
            CSV format. You can find the exported file in your downloads folder,
          </p>

          <el-divider></el-divider>

          <div
            style="font-size: var(--el-font-size-large)"
            class="mb-2 font-600"
          >
            Account
          </div>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Welcome to the Import Account information section of our
            application.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Here, you will be able to import all of your account information
            balance from your broker in CSV format.
          </p>

          <el-card shadow="never">
            <el-upload
              ref="uploadAccount"
              v-model:file-list="accountFiles"
              class="upload-Account"
              :auto-upload="false"
            >
              <template #trigger>
                <el-button type="primary" plain>select account file</el-button>
              </template>

              <el-button
                class="ml-3"
                type="primary"
                round
                :disabled="!hasAccountFile"
                @click="handleLoadAccount"
              >
                Load Account
              </el-button>

              <template #tip>
                <div class="el-upload__tip">Upload account csv file</div>
              </template>
            </el-upload>
          </el-card>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            To begin, go to
            <code>
              <b>inbox</b>
              (section) >
              <b>Account Overview</b>
              (tab)
            </code>
            in
            <b>Degiro</b>
            application.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Select the date range you would like to export.
          </p>

          <p style="font-size: var(--el-font-size-small)" class="mb-2">
            Once you have selected date range, click export button and select
            CSV format. You can find the exported file in your downloads folder.
          </p>
        </el-col>

        <el-col
          :span="12"
          class="flex flex-col items-center justify-center"
          style="display: flex !important"
        >
          <h1>Import data</h1>
          <DataSvg width="30vw" height="30vw" />
        </el-col>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts" src="./data.page.ts" />

<style lang="scss" src="./data.page.scss" />
