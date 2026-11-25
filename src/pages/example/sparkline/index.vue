<script lang="ts" setup>
import type { CoinMarketRow } from "@/mock/marketCoins"
import { ref } from "vue"
import { MOCK_MARKET_COINS } from "@/mock/marketCoins"
import SparklineCell from "./SparklineCell.vue"

const coins = ref<CoinMarketRow[]>(MOCK_MARKET_COINS)

function formatUsd(num: number, decimals = 2) {
  return `$${num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`
}

const formatPct = (val: number) => `${val > 0 ? "+" : ""}${val.toFixed(1)}%`
</script>

<template>
  <div class="app-container">
    <el-table :data="coins" row-key="id" style="width: 100%">
      <el-table-column prop="rank" label="#" width="64" />

      <el-table-column label="货币" min-width="190">
        <template #default="{ row }">
          <div class="flex items-center gap-2">
            <img :src="row.icon" :alt="row.symbol" class="h-5 w-5 rounded-full object-cover">
            <span class="font-medium text-gray-900">{{ row.name }}</span>
            <span class="text-xs uppercase text-gray-400">{{ row.symbol }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="价格" align="right" min-width="120">
        <template #default="{ row }">
          {{ formatUsd(row.price, row.price < 1 ? 4 : 2) }}
        </template>
      </el-table-column>

      <el-table-column label="1小时" align="right" width="92">
        <template #default="{ row }">
          <span :class="row.change1h >= 0 ? 'text-green-600' : 'text-red-500'">
            {{ formatPct(row.change1h) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="24小时" align="right" width="92">
        <template #default="{ row }">
          <span :class="row.change24h >= 0 ? 'text-green-600' : 'text-red-500'">
            {{ formatPct(row.change24h) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="7天" align="right" width="92">
        <template #default="{ row }">
          <span :class="row.change7d >= 0 ? 'text-green-600' : 'text-red-500'">
            {{ formatPct(row.change7d) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="24小时交易量" align="right" min-width="155">
        <template #default="{ row }">
          {{ formatUsd(row.volume24h, 0) }}
        </template>
      </el-table-column>

      <el-table-column label="总市值" align="right" min-width="165">
        <template #default="{ row }">
          {{ formatUsd(row.marketCap, 0) }}
        </template>
      </el-table-column>

      <el-table-column label="最近 7 天" align="right" width="180" class-name="sparkline-col">
        <template #default="{ row }">
          <SparklineCell :values="row.sparkline7d" :change-7d="row.change7d" :width="128" :height="36" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
:deep(.sparkline-col .cell) {
  padding-right: 12px;
  overflow: visible;
  text-overflow: clip;
}
</style>
