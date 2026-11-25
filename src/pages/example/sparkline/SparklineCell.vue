<script setup lang="ts">
import { computed } from "vue"

interface Props {
  values: number[]
  change7d?: number
  width?: number
  height?: number
  padding?: number
  /** 相对振幅低于该阈值时按最小幅度展示，避免微幅噪点被拉满高度 */
  minRelativeSpan?: number
  /** 最多保留的采样点数（越小线条越舒展，建议 24~48） */
  maxPoints?: number
  /** 移动平均平滑窗口（1 表示不平滑，建议 2~4） */
  smoothWindow?: number
}

const props = withDefaults(defineProps<Props>(), {
  change7d: undefined,
  width: 128,
  height: 36,
  padding: 3,
  minRelativeSpan: 0.015,
  maxPoints: 36,
  smoothWindow: 3
})

const isPositive = computed(() => {
  if (typeof props.change7d === "number") {
    return props.change7d >= 0
  }
  if (props.values.length < 2) return true
  return props.values[props.values.length - 1] >= props.values[0]
})

const strokeColor = computed(() => (isPositive.value ? "#16a34a" : "#ef4444"))

/** 轻量移动平均平滑，削弱高频锯齿 */
function smoothSeries(data: number[], win: number): number[] {
  if (win <= 1 || data.length <= 2) return [...data]
  const half = Math.floor(win / 2)
  return data.map((_, idx) => {
    const start = Math.max(0, idx - half)
    const end = Math.min(data.length - 1, idx + half)
    let sum = 0
    for (let i = start; i <= end; i++) {
      sum += data[i]
    }
    return sum / (end - start + 1)
  })
}

/** 等间隔抽稀并保留首尾点 */
function downsampleSeries(data: number[], targetCount: number): number[] {
  if (data.length <= targetCount || targetCount <= 2) return [...data]
  const sampled: number[] = []
  const step = (data.length - 1) / (targetCount - 1)
  for (let i = 0; i < targetCount; i++) {
    const idx = i === targetCount - 1 ? data.length - 1 : Math.round(i * step)
    sampled.push(data[idx])
  }
  return sampled
}

const pathData = computed(() => {
  const raw = props.values
  if (!raw || raw.length === 0) return ""

  const smoothed = smoothSeries(raw, props.smoothWindow)
  const list = downsampleSeries(smoothed, props.maxPoints)

  const innerW = Math.max(1, props.width - props.padding * 2)
  const innerH = Math.max(1, props.height - props.padding * 2)
  const midY = props.padding + innerH / 2

  if (list.length === 1) {
    return `M ${props.padding.toFixed(1)} ${midY.toFixed(1)} L ${(props.padding + innerW).toFixed(1)} ${midY.toFixed(1)}`
  }

  const rawMin = Math.min(...list)
  const rawMax = Math.max(...list)
  const rawSpan = rawMax - rawMin

  if (rawSpan === 0) {
    return `M ${props.padding.toFixed(1)} ${midY.toFixed(1)} L ${(props.padding + innerW).toFixed(1)} ${midY.toFixed(1)}`
  }

  const minAllowedSpan = Math.abs(rawMax) * props.minRelativeSpan
  let min = rawMin
  let max = rawMax

  if (rawSpan < minAllowedSpan) {
    const center = (rawMax + rawMin) / 2
    const half = Math.max(minAllowedSpan / 2, 1e-8)
    min = center - half
    max = center + half
  }

  const span = max - min || 1
  const stepX = innerW / (list.length - 1)

  return list
    .map((val, index) => {
      const x = props.padding + index * stepX
      const ratio = (val - min) / span
      const y = props.padding + (1 - ratio) * innerH
      const cmd = index === 0 ? "M" : "L"
      return `${cmd} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
})
</script>

<template>
  <div class="sparkline-cell">
    <svg
      v-if="pathData" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" class="sparkline-svg"
      aria-hidden="true"
    >
      <path
        :d="pathData" fill="none" :stroke="strokeColor" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span v-else class="sparkline-empty">--</span>
  </div>
</template>

<style scoped>
.sparkline-cell {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
}

.sparkline-svg {
  display: block;
  flex-shrink: 0;
  overflow: visible;
  user-select: none;
}

.sparkline-empty {
  font-size: 12px;
  color: #9ca3af;
}
</style>
