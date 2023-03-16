<template>
  <el-container class="transactions" direction="vertical">
    <p-toolbar :title="labels.sales" @back="handleBack">
      <template #content>
        <el-tag class="mr-2" type="info">
          Total {{ labels.buys }}: {{ totalBuy }}€
        </el-tag>
        <el-tag class="mr-2" type="info">
          Total {{ labels.sales }}: {{ totalSell }}€
        </el-tag>
        <el-tag class="mr-2" :type="totalSell > totalBuy ? 'success' : 'error'">
          Delta: {{ Math.round(totalSell - totalBuy) }}€
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

        <el-tooltip :content="labels.aggregatedDataTooltip">
          <el-switch
            v-model="isAggregated"
            style="min-width: 160px"
            :active-text="labels.aggregatedData"
            :inactive-text="labels.fullData"
            class="mr-2"
          />
        </el-tooltip>

        <el-input
          v-model="searchCriteria"
          style="min-width: 200px"
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

    <el-container class="sales__content" direction="vertical">
      <p-grid
        v-if="!isLoading"
        v-model:show-column-config="isAgTableModal"
        style="height: 100%"
        table-name="sales-table"
        :column-defs="columnDefs"
        :default-col-def="defaultColDef"
        :grid-options="gridOptions"
        :row-data="selectedSales"
        animate-rows="true"
        @view-detail="handleViewDetail"
        @api="setGridApi"
        @column-api="setColumnApi"
      />
    </el-container>

    <el-dialog
      v-model="isSalesModalVisible"
      :title="labels.saleDetail"
      class="sales-modal"
      @close="isSalesModalVisible = false"
    >
      <el-descriptions
        class="margin-top"
        :title="labels.transactionDetail"
        :column="2"
        border
      >
        <!-- <template #extra>
          <el-button type="primary">Account details</el-button>
        </template> -->

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.product }}</div>
          </template>
          <b>
            {{ currentSale?.name }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.sellDate }}</div>
          </template>
          <b>
            <p-date-render
              :value="currentSale?.sellDate"
              align="left"
              date-format="DD MMM YYYY, HH:mm"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.buyDate }}</div>
          </template>
          <b>
            <p-date-render
              :value="currentSale?.buyDate"
              align="left"
              date-format="DD MMM YYYY, HH:mm"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.sellOrderId }}</div>
          </template>
          <b>{{ currentSale?.sellOrderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.buyOrderId }}</div>
          </template>
          <b>{{ currentSale?.buyOrderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.transactionCost }}</div>
          </template>
          <b>
            <p-currency-render
              :value="currentSale?.cost"
              :currency="currentSale?.currency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">{{ labels.quantity }}</div>
          </template>
          <b>
            <p-number-render :value="currentSale?.qty" :decimal-scale="0" />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.sellPrice }}</div>
          </template>
          <b>
            <p-currency-render
              :value="currentSale?.sellPrice"
              :currency="currentSale?.currency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.buyPrice }}</div>
          </template>
          <b>
            <p-currency-render
              :value="currentSale?.buyPrice"
              :currency="currentSale?.currency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.sellTotalPrice }}</div>
          </template>
          <b>
            <p-currency-render
              :value="currentSale?.totalSellPrice"
              :currency="currentSale?.currency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">{{ labels.buyTotalPrice }}</div>
          </template>
          <b>
            <p-currency-render
              :value="currentSale?.totalBuyPrice"
              :currency="currentSale?.currency"
              :decimal-scale="2"
            />
          </b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Delta</div>
          </template>
          <div flex items-center justify-end>
            <el-tag
              :type="
                currentSale?.totalSellPrice > currentSale?.totalBuyPrice
                  ? 'success'
                  : 'error'
              "
            >
              <b>
                <p-currency-render
                  :value="
                    currentSale?.totalSellPrice - currentSale?.totalBuyPrice
                  "
                  :currency="currentSale?.currency"
                  :decimal-scale="2"
                />
              </b>
            </el-tag>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <el-button type="primary" @click="isSalesModalVisible = false">
          Close
        </el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" src="./sales.page.ts" />

<style lang="scss" src="./sales.page.scss" />
