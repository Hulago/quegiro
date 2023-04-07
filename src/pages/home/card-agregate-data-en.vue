<template>
  <el-card class="mt-4">
    <template #header>
      <div class="card-header">
        <span>Data aggregation</span>
      </div>
    </template>
    <p>
      To better calculate capital gains and losses, in the sales section you can
      restrict data by dates.
    </p>
    <p>
      And you can also aggregate the data. This data aggregation is done when
      the month of sale and month of purchase are the same for the same stock.
    </p>
    <img src="/public/img/sales-agregate-data.jpg" style="width: 200px" />
    <p>Example:</p>

    <img src="/public/img/sales-agregate-sale-1.jpg" style="width: 100%" />

    <p>After agregation.</p>

    <img src="/public/img/sales-agregate-sale-2.jpg" style="width: 100%" />
  </el-card>
</template>
