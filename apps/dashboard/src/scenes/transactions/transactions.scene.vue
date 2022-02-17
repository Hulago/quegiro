<template>
  <v-col class="transactions">
    <v-row>
      <v-toolbar flat dark dense>
        <v-toolbar-title>Transactions</v-toolbar-title>

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

        <v-file-input
          v-model="file"
          :prepend-icon="icons.mdiCloudUpload"
          label="Upload transaction file csv"
          outlined
          rounded
          dense
          solo
          hide-details
        />

        <v-btn dark color="secondary" small class="mx-2" @click="processSales">
          Process Sales
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
        </v-btn>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-list style="width: 100%">
        <v-list-item>
          <v-list-item-content
            class="transactions-list__header transactions-list__date"
          >
            Date
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__name"
          >
            Name
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__exchange"
          >
            Exchange
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__qty"
          >
            Qty
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__price"
          >
            Price
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__cost"
          >
            Cost
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__order"
          >
            OrderId
          </v-list-item-content>

          <v-list-item-content
            class="transactions-list__header transactions-list__state"
          >
            State
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
        :items="selectedTransactions"
        :item-height="56"
        style="height: calc(100vh - 185px)"
        class="transactions-list"
      >
        <template v-slot:default="{ item }">
          <v-list-item
            link
            :class="{
              'transactions-list__item--close': item.state === 'CLOSE'
            }"
          >
            <v-list-item-content
              class="transactions-list__item transactions-list__date"
              v-html="dateRender(item.transactionDate)"
            />

            <v-list-item-content
              class="transactions-list__item transactions-list__name"
            >
              {{ item.name }}
            </v-list-item-content>

            <v-list-item-content
              class="transactions-list__item transactions-list__exchange"
            >
              {{ item.exchange }}
            </v-list-item-content>

            <v-list-item-content
              class="transactions-list__item transactions-list__qty"
            >
              <v-chip
                small
                :color="item.buy > 0 ? 'success' : 'error'"
                text-color="white"
              >
                {{ item.buy ? 'Compra' : 'Venda' }} {{ item.qty }}
              </v-chip>
            </v-list-item-content>

            <v-list-item-content
              class="transactions-list__item transactions-list__price"
              v-html="
                currencyRender({ currency: item.transactionCurrency })(
                  item.transactionPrice
                )
              "
            />

            <v-list-item-content
              class="transactions-list__item transactions-list__cost"
              v-html="
                currencyRender({ currency: item.transactionCurrency })(
                  item.transactionCost
                )
              "
            />

            <v-list-item-content
              class="transactions-list__item transactions-list__order"
            >
              {{ item.orderId }}
            </v-list-item-content>

            <v-list-item-content
              class="transactions-list__item transactions-list__state"
            >
              {{ item.state }} {{ item.remain }}
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                icon
                small
                rounded
                color="secondary"
                @click="handleViewDetail(item)"
              >
                <v-icon>{{ icons.mdiEye }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-row>

    <v-dialog v-model="isDetailModalVisible" width="50vw">
      <v-card v-if="currentTransaction" class="transaction-modal">
        <v-card-title class="mb-2">
          {{ currentTransaction.name }} ({{ currentTransaction.isin }})
          <v-chip
            class="ml-2"
            small
            :color="currentTransaction.buy ? 'success' : 'error'"
            text-color="white"
          >
            {{ currentTransaction.buy ? 'Compra' : 'Venda' }}
          </v-chip>
        </v-card-title>

        <v-card-text>
          <v-row>
            <span class="transaction-modal__label">ISIN:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.isin }}
            </span>
            <span class="transaction-modal__label">Name:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.name }}
            </span>
          </v-row>

          <v-row>
            <span class="transaction-modal__label">Date:</span>
            <span
              class="transaction-modal__value"
              v-html="dateRender(currentTransaction.transactionDate)"
            />

            <span class="transaction-modal__label">OrderId:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.orderId }}
            </span>
          </v-row>

          <v-row>
            <span class="transaction-modal__label">Exchange:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.exchange }}
            </span>
            <span class="transaction-modal__label">ExchangeFrom:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.exchangeFrom }}
            </span>
          </v-row>

          <v-row>
            <span class="transaction-modal__label">Qty:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.qty }}
            </span>
            <span class="transaction-modal__label"
              >Local Transaction Price:</span
            >
            <span
              class="transaction-modal__value"
              v-html="
                currencyRender({
                  fontSize: 12,
                  currency: currentTransaction.localTransactionCurrency
                })(currentTransaction.localTransactionPrice)
              "
            />

            <span class="transaction-modal__label"
              >Total Transaction Price:</span
            >
            <span
              class="transaction-modal__value"
              v-html="
                currencyRender({
                  fontSize: 12,
                  currency: currentTransaction.localTransactionCurrency
                })(currentTransaction.localTotalTransactionPrice)
              "
            />
          </v-row>

          <v-row>
            <span class="transaction-modal__label">Qty:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.qty }}
            </span>
            <span class="transaction-modal__label">Total Price:</span>
            <span
              class="transaction-modal__value"
              v-html="
                currencyRender({
                  fontSize: 12,
                  currency: currentTransaction.totalCurrency
                })(currentTransaction.transactionPrice)
              "
            />

            <span class="transaction-modal__label">Transaction Cost:</span>
            <span
              class="transaction-modal__value"
              v-html="
                currencyRender({
                  fontSize: 12,
                  currency: currentTransaction.transactionCurrency
                })(currentTransaction.transactionCost)
              "
            />

            <span class="transaction-modal__label">Exchange Rate:</span>
            <span class="transaction-modal__value">{{
              currentTransaction.exchangeRate
            }}</span>
          </v-row>

          <v-row>
            <span class="transaction-modal__label">State:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.state }}
            </span>
            <span class="transaction-modal__label">Remain:</span>
            <span class="transaction-modal__value">
              {{ currentTransaction.remain }} of {{ currentTransaction.qty }}
            </span>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" @click="isDetailModalVisible = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts" src="./transactions.scene.ts" />

<style lang="scss" src="./transactions.scene.scss" />
