<template>
  <el-container class="transactions" direction="vertical">
    <p-toolbar :title="labels.transactions" @back="handleBack">
      <template #content>
        <el-tag class="mr-2" type="success">
          Total {{ labels.buys }}: {{ totalBuy }}€
        </el-tag>
        <el-tag class="mr-2" type="error">
          Total {{ labels.sales }}: {{ totalSell }}€
        </el-tag>

        <el-date-picker
          v-model="dateFilter"
          type="datetimerange"
          :start-placeholder="labels.startDate"
          :end-placeholder="labels.endDate"
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
          :placeholder="labels.search"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #append>
            <el-button :icon="icons.mdiSearch" @click="handleSearch" />
          </template>
        </el-input>

        <el-tooltip :content="labels.setupTable">
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
      :title="labels.transactionDetail"
      class="transaction-modal"
      @close="isTransactionModalVisible = false"
    >
      <el-descriptions class="margin-top" :column="4" border>
        <template #title>
          {{ labels.transactionDetail }}
          <el-tag
            size="small"
            class="ml-4"
            :type="currentTransaction?.isBuy ? 'success' : 'error'"
          >
            <span v-if="currentTransaction?.isBuy">
              {{ labels.buy }}
            </span>
            <span v-else>{{ labels.sale }}</span>
          </el-tag>
        </template>
        <template #extra>
          <el-button type="primary" @click="handleAccountData">
            {{ labels.accountMovementsDetail }}
          </el-button>
        </template>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.date }}</div>
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
            <div class="cell-item">{{ labels.orderId }}</div>
          </template>
          <b>{{ currentTransaction?.orderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.product }}</div>
          </template>
          <b>
            {{ currentTransaction?.name }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.isin }}</div>
          </template>
          <b>
            {{ currentTransaction?.isin }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.state }}</div>
          </template>
          <b>
            {{ currentTransaction?.state }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">{{ labels.remain }}</div>
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
            <div class="cell-item">{{ labels.stockExchange }}</div>
          </template>
          <b>
            {{ currentTransaction?.exchange }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">{{ labels.stockExchangeFrom }}</div>
          </template>
          <b>
            {{ currentTransaction?.exchangeFrom }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="1">
          <template #label>
            <div class="cell-item">{{ labels.quantity }}</div>
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
            <div class="cell-item">{{ labels.localPrice }}</div>
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
            <div class="cell-item">Total {{ labels.localPrice }}</div>
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
            <div class="cell-item">{{ labels.exchangeRate }}</div>
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
            <div class="cell-item">{{ labels.transactionCost }}</div>
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
            <div class="cell-item">{{ labels.totalPrice }}</div>
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
          <el-table-column prop="date" :label="labels.date" width="120">
            <template #default="{ row }">
              <p-date-render
                :value="row.date"
                align="left"
                date-format="DD MMM YYYY, HH:mm"
              />
            </template>
          </el-table-column>
          <el-table-column prop="product" :label="labels.product" width="200" />
          <el-table-column
            prop="description"
            :label="labels.descripton"
            width="300"
          />
          <el-table-column prop="value" :label="labels.value">
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
            :label="labels.exchangeRate"
          ></el-table-column>
        </el-table>

        <template #footer>
          <el-button type="primary" @click="isAccountModalVisible = false">
            {{ labels.action.close }}
          </el-button>
        </template>
      </el-dialog>

      <template #footer>
        <el-button type="primary" @click="isTransactionModalVisible = false">
          {{ labels.action.close }}
        </el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" src="./transactions.page.ts" />

<style lang="scss" src="./transactions.page.scss" />
