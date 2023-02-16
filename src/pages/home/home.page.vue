<template>
  <el-container class="news-form" direction="vertical">
    <p-toolbar :back="'back'" :title="'Welcome'" @back="handleBack">
      <template #content></template>
    </p-toolbar>

    <el-container class="mt-4" direction="vertical">
      <el-row :gutter="20">
        <el-col :span="12">
          <h1>Welcome to Quegiro</h1>
          <p>
            Introducing our new tax calculation application for stock
            transactions. Our user-friendly platform makes it easy to import
            your transaction data in the form of a CSV file (
            <code>
              <a href="https://www.degiro.com/">Degiro</a>
              only for now
            </code>
            ). Our system will automatically process the information and
            calculate all of the necessary tax entries for you to declare to the
            tax authorities.
          </p>

          <p>
            One of the features of our application is that it uses the "first
            in, first out" method to process stock transactions, ensuring that
            the tax implications of each transaction are handled correctly.
            Additionally, our system takes transaction costs into account when
            calculating tax declaration, ensuring that you only pay the taxes
            you owe.
          </p>

          <p>
            We take the security of your data very seriously, which is why all
            information is stored locally on your device. This means that you
            don't have to worry about data breaches or external services
            accessing your information. Plus, once the page is loaded, it can
            run without internet and you can use it offline.
          </p>

          <p>
            With our application, you can rest easy knowing that your tax
            compliance is accurate, secure and up-to-date. Say goodbye to
            tedious manual calculations and hello to streamlined, efficient and
            safe tax compliance with our application.
          </p>

          <p class="font-600">
            Disclaimer: We are not responsible for any incorrect tax
            declarations. All values must be confirmed according to the rules
            and regulations set forth by the relevant tax authorities.
          </p>

          <el-button type="primary" round size="large" @click="handleStart">
            <b>Start here</b>
          </el-button>
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
