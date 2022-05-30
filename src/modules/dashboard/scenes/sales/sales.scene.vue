/* eslint-disable vue/no-v-html */
<template>
  <v-col class="sales">
    <v-row>
      <v-toolbar flat dark dense>
        <v-toolbar-title>Sales</v-toolbar-title>

        <v-text-field
          v-model="searchCriteria"
          class="ml-2"
          label="Search"
          outlined
          rounded
          dense
          solo
          hide-details
        />

        <v-spacer />

        <div class="ml-3 mr-1">total buy:</div>
        <div v-html="currencyRender()(totalBuy)" />
        <div class="ml-3 mr-1">total sell:</div>
        <div v-html="currencyRender()(totalSell)" />
        <div class="ml-3 mr-1">total cost:</div>
        <div v-html="currencyRender()(totalCosts)" />
        <!-- <v-file-input
          v-model="file"
          :prepend-icon="icons.mdiCloudUpload"
          label="Upload transaction file csv"
          outlined
          rounded
          dense
          solo
          hide-details
        />

        <v-btn dark color="secondary" small class="mx-2" @click="debug">
          Debug
        </v-btn>

        <v-btn dark color="warning" small class="mx-2" @click="handleClear">
          clear
        </v-btn>

        <v-btn
          dark
          color="primary"
          small
          class="mx-2"
          @click="handleLoadTransations"
        >
          Load transations
        </v-btn> -->
      </v-toolbar>
    </v-row>
    <v-row>
      <v-list style="width: 100%">
        <v-list-item>
          <v-list-item-content class="sales-list__header sales-list__date">
            Sale date
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__date">
            Buy date
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__name">
            Name
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__exchange">
            Exchange
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__qty">
            Qty
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__price">
            SellPrice
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__price">
            BuyPrice
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__cost">
            Cost
          </v-list-item-content>

          <v-list-item-content class="sales-list__header sales-list__price">
            Delta
          </v-list-item-content>

          <v-list-item-action />
        </v-list-item>
      </v-list>
    </v-row>
    <v-row>
      <v-divider />
    </v-row>
    <v-row>
      <v-virtual-scroll
        :items="selectedSales"
        :item-height="56"
        style="height: calc(100vh - 185px)"
        class="sales-list"
      >
        <template #default="{ item }">
          <v-list-item>
            <v-list-item-content
              class="sales-list__item sales-list__date"
              v-html="dateRender(item.sellDate)"
            />

            <v-list-item-content
              class="sales-list__item sales-list__date"
              v-html="dateRender(item.buyDate)"
            />

            <v-list-item-content class="sales-list__item sales-list__name">
              {{ item.name }}
            </v-list-item-content>

            <v-list-item-content class="sales-list__item sales-list__exchange">
              {{ item.exchange }}
            </v-list-item-content>

            <v-list-item-content class="sales-list__item sales-list__qty">
              {{ item.qty }}
            </v-list-item-content>

            <v-list-item-content
              class="sales-list__item sales-list__price"
              v-html="
                currencyRender({ currency: item.currency })(item.totalSellPrice)
              "
            />

            <v-list-item-content
              class="sales-list__item sales-list__price"
              v-html="
                currencyRender({ currency: item.currency })(item.totalBuyPrice)
              "
            />

            <v-list-item-content
              class="sales-list__item sales-list__cost"
              v-html="currencyRender({ currency: item.currency })(item.cost)"
            />

            <v-list-item-content
              class="sales-list__item sales-list__price"
              v-html="
                currencyRender({ currency: item.currency })(
                  item.totalSellPrice - item.totalBuyPrice
                )
              "
            />
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-row>
  </v-col>
</template>

<script lang="ts" src="./sales.scene.ts" />

<style lang="scss" src="./sales.scene.scss" />
