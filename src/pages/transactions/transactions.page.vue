<template>
  <el-container class="transactions" direction="vertical">
    <p-toolbar title="Transactions" @back="handleBack">
      <template #content>
        <el-tag class="mr-2" type="success">Total Buy: {{ totalBuy }}€</el-tag>
        <el-tag class="mr-2" type="error">Total Sell: {{ totalSell }}€</el-tag>

        <el-date-picker
          v-model="dateFilter"
          type="datetimerange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-time="defaultTime"
          style="min-width: 300px"
          class="mr-2"
        />

        <el-input
          v-model="searchCriteria"
          style="min-width: 400px"
          class="mr-3"
          :timeout="0"
          clearable
          placeholder="Search"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #append>
            <el-button :icon="icons.mdiSearch" @click="handleSearch" />
          </template>
        </el-input>

        <el-tooltip :content="'Setup table'">
          <el-button
            circle
            :icon="icons.mdiTableCog"
            @click="handleShowTableConfig"
          />
        </el-tooltip>
      </template>
    </p-toolbar>

    <el-container class="transactions__content" direction="vertical">
      <p-grid
        v-if="!isLoading"
        v-model:show-column-config="isAgTableModal"
        style="height: 100%"
        table-name="transactions-table"
        :column-defs="columnDefs"
        :default-col-def="defaultColDef"
        :grid-options="gridOptions"
        :row-data="selectedTransactions"
        animate-rows="true"
        @view-detail="handleViewDetail"
        @api="setGridApi"
        @column-api="setColumnApi"
      />
    </el-container>

    <el-dialog
      v-model="isTransactionModalVisible"
      :title="'Transaction detail'"
      class="transaction-modal"
      @close="isTransactionModalVisible = false"
    >
      <el-descriptions
        class="margin-top"
        title="Transaction detail"
        :column="4"
        border
      >
        <template #extra>
          <el-button type="primary" @click="handleAccountData">
            Account details
          </el-button>
        </template>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Date</div>
          </template>
          <b>
            <p-date-render
              :value="currentTransaction?.transactionDate"
              align="left"
              date-format="DD MMM YYYY, HH:mm"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Order Id</div>
          </template>
          <b>{{ currentTransaction?.orderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Name</div>
          </template>
          <b>
            {{ currentTransaction?.name }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">ISIN</div>
          </template>
          <b>
            {{ currentTransaction?.isin }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">State</div>
          </template>
          <b>
            {{ currentTransaction?.state }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Remain</div>
          </template>
          <b>
            <p-number-render
              :value="currentTransaction?.remain"
              :decimal-scale="0"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Exchange</div>
          </template>
          <b>
            {{ currentTransaction?.exchange }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Exchange From</div>
          </template>
          <b>
            {{ currentTransaction?.exchangeFrom }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Qty</div>
          </template>
          <b>
            <p-number-render
              :value="currentTransaction?.qty"
              :decimal-scale="0"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Local price</div>
          </template>
          <b>
            <p-currency-render
              :value="currentTransaction?.localTransactionPrice"
              :currency="currentTransaction?.localTransactionCurrency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Total Local price</div>
          </template>
          <b>
            <p-currency-render
              :value="currentTransaction?.localTotalTransactionPrice"
              :currency="currentTransaction?.localTotalTransactionCurrency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Exchange Rate</div>
          </template>
          <b>
            <p-number-render
              :value="currentTransaction?.exchangeRate"
              :decimal-scale="3"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Transaction Cost</div>
          </template>
          <b>
            <p-currency-render
              :value="currentTransaction?.transactionCost"
              :currency="currentTransaction?.transactionCostCurrency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">Total Price</div>
          </template>
          <b>
            <p-currency-render
              :value="currentTransaction?.transactionPrice"
              :currency="currentTransaction?.transactionCurrency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>
      </el-descriptions>

      <el-dialog v-model="isAccountModalVisible" title="Account information">
        <el-table :data="accountData" height="250" style="width: 100%">
          <el-table-column prop="date" label="Date" width="120">
            <template #default="{ row }">
              <p-date-render
                :value="row.date"
                align="left"
                date-format="DD MMM YYYY, HH:mm"
              />
            </template>
          </el-table-column>
          <el-table-column prop="product" label="Product" width="200" />
          <el-table-column prop="description" label="Description" width="300" />
          <el-table-column prop="value" label="Value">
            <template #default="{ row }">
              <p-currency-render
                :value="row.value"
                :currency="row.currencyValue"
                :decimal-scale="2"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="exchangeRate"
            label="Exchange Rate"
          ></el-table-column>
        </el-table>

        <template #footer>
          <el-button type="primary" @click="isAccountModalVisible = false">
            Close
          </el-button>
        </template>
      </el-dialog>

      <template #footer>
        <el-button type="primary" @click="isTransactionModalVisible = false">
          Close
        </el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" src="./transactions.page.ts" />

<style lang="scss" src="./transactions.page.scss" />
