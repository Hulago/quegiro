<template>
  <el-container class="transactions" direction="vertical">
    <p-toolbar title="Sales" @back="handleBack">
      <template #content>
        <el-tag class="mr-2" type="info">Total Buy: {{ totalBuy }}€</el-tag>
        <el-tag class="mr-2" type="info">Total Sell: {{ totalSell }}€</el-tag>
        <el-tag class="mr-2" :type="totalSell > totalBuy ? 'success' : 'error'">
          Delta: {{ Math.round(totalSell - totalBuy) }}€
        </el-tag>

        <el-date-picker
          v-model="dateFilter"
          type="datetimerange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          :default-time="defaultTime"
          style="min-width: 300px"
          class="mr-2"
        />

        <el-tooltip :content="'Show agregate data by month'">
          <el-switch
            v-model="isAggregated"
            active-text="Aggregated data"
            inactive-text="Full data"
            class="mr-2"
          />
        </el-tooltip>

        <el-input
          v-model="searchCriteria"
          style="min-width: 200px"
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
      :title="'Sale detail'"
      class="sales-modal"
      @close="isSalesModalVisible = false"
    >
      <el-descriptions
        class="margin-top"
        title="Transaction detail"
        :column="2"
        border
      >
        <!-- <template #extra>
          <el-button type="primary">Account details</el-button>
        </template> -->

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Name</div>
          </template>
          <b>
            {{ currentSale?.name }}
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Sell Date</div>
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
            <div class="cell-item">Buy Date</div>
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
            <div class="cell-item">Sell Order Id</div>
          </template>
          <b>{{ currentSale?.sellOrderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Buy Order Id</div>
          </template>
          <b>{{ currentSale?.buyOrderId }}</b>
        </el-descriptions-item>

        <el-descriptions-item :span="2">
          <template #label>
            <div class="cell-item">Transaction Cost</div>
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
            <div class="cell-item">Qty</div>
          </template>
          <b>
            <p-number-render :value="currentSale?.qty" :decimal-scale="0" />
          </b>
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Sell Price</div>
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
            <div class="cell-item">Buy Price</div>
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
            <div class="cell-item">Total Sell Price</div>
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
            <div class="cell-item">Total Buy Price</div>
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
