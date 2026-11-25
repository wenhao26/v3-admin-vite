<template>
  <div class="app-container">
    <el-card shadow="never" class="main-card">
      <!-- 1. 上方【上下文信息】与【插件信息】面板 -->
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="outer-card-box">
            <div class="section-title">
              上下文信息
            </div>
            <div class="context-grid">
              <!-- 1. 左上：输入输出 -->
              <div class="inner-block">
                <div class="block-header">
                  <span class="sub-title">输入输出</span>
                  <span class="count">123</span>
                </div>
                <div class="tags">
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    用户输入 ? 5
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    读取 57
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    写入 2
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    搜索 59
                  </el-tag>
                </div>
              </div>

              <!-- 2. 右上：工具调用 -->
              <div class="inner-block">
                <div class="block-header">
                  <span class="sub-title">工具调用</span>
                  <span class="count">35</span>
                </div>
                <div class="tags">
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    read 19
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    list_agents 7
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    pwsh 4
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    glob 3
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag">
                    edit 2
                  </el-tag>
                  <el-tag size="small" type="info" effect="plain" class="custom-tag text-gray-400">
                    其他 +0
                  </el-tag>
                </div>
              </div>

              <!-- 3. 左下：上下文事件 -->
              <div class="inner-block">
                <div class="block-header">
                  <span class="sub-title">上下文事件</span>
                  <span class="count">24</span>
                </div>
                <div class="tags">
                  <el-tag size="small" type="success" effect="light" class="custom-tag">
                    注入 19
                  </el-tag>
                  <el-tag size="small" type="danger" effect="light" class="custom-tag">
                    压缩 1
                  </el-tag>
                  <el-tag size="small" type="primary" effect="light" class="custom-tag">
                    剪枝 4
                  </el-tag>
                </div>
              </div>

              <!-- 4. 右下：Agent 网络 -->
              <div class="inner-block">
                <div class="block-header">
                  <span class="sub-title">Agent 网络 ?</span>
                  <span class="count-text">4.5M / ¥6.28</span>
                </div>
                <div class="agent-info">
                  <div class="info-row">
                    <span>当前 Agent</span>
                    <span>3.3M / ¥5.71</span>
                  </div>
                  <div class="info-row">
                    <span>子 Agent × 3 ?</span>
                    <span>1.1M / ¥0.57</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="outer-card-box plugin-box">
            <div class="section-title">
              插件信息
            </div>
            <div class="plugin-content">
              <div>
                <div class="plugin-header">
                  <span class="plugin-main-name">dsh-context</span>
                  <el-tag size="small" type="warning" effect="light" class="custom-tag">
                    v0.74.0
                  </el-tag>
                </div>
                <div class="plugin-desc">
                  The best DSH context plugin ⭐
                </div>
                <div class="plugin-version">
                  ↑ v0.83.1
                </div>
                <div class="plugin-author">
                  bowenliang123/dsh-context
                </div>
              </div>

              <el-button type="primary" plain class="w-full btn-small">
                打开插件设置
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 2. 下方新布局：【Token 统计】与【耗时统计】（1:1 平分，强制严格间距 10px） -->
      <el-row :gutter="10" class="row-spacing-fixed">
        <!-- 左侧：Token 统计 (占 12 栅格) -->
        <el-col :span="12">
          <div class="outer-card-box">
            <div class="section-header">
              <span class="section-title">Token 统计</span>
              <span class="header-extra">缓存命中 88.42%</span>
            </div>

            <div class="chart-content">
              <!-- 左侧环形图 -->
              <div class="donut-wrapper">
                <div class="donut-chart token-donut">
                  <div class="donut-inner">
                    <span class="donut-val">4.4M</span>
                    <span class="donut-label">总用量</span>
                  </div>
                </div>
              </div>

              <!-- 右侧数据指标图例（4列2行） -->
              <div class="token-legend-grid">
                <div class="legend-item">
                  <span class="dot bg-purple" />
                  <div class="legend-text">
                    <div class="legend-label">
                      系统提示词
                    </div>
                    <div class="legend-sub">
                      ≈108.4k
                    </div>
                  </div>
                  <span class="legend-pct">2.5%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-orange" />
                  <div class="legend-text">
                    <div class="legend-label">
                      工具定义
                    </div>
                    <div class="legend-sub">
                      ≈962.6k
                    </div>
                  </div>
                  <span class="legend-pct">22.0%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-green" />
                  <div class="legend-text">
                    <div class="legend-label">
                      用户消息
                    </div>
                    <div class="legend-sub">
                      ≈7.3k
                    </div>
                  </div>
                  <span class="legend-pct">0.2%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-violet" />
                  <div class="legend-text">
                    <div class="legend-label">
                      注入内容
                    </div>
                    <div class="legend-sub">
                      ≈632.4k
                    </div>
                  </div>
                  <span class="legend-pct">14.4%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-red-orange" />
                  <div class="legend-text">
                    <div class="legend-label">
                      技能注入
                    </div>
                    <div class="legend-sub">
                      ≈151.5k
                    </div>
                  </div>
                  <span class="legend-pct">3.5%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-blue" />
                  <div class="legend-text">
                    <div class="legend-label">
                      助手消息
                    </div>
                    <div class="legend-sub">
                      ≈962.5k
                    </div>
                  </div>
                  <span class="legend-pct">22.0%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-teal" />
                  <div class="legend-text">
                    <div class="legend-label">
                      工具结果
                    </div>
                    <div class="legend-sub">
                      ≈1.5M
                    </div>
                  </div>
                  <span class="legend-pct">34.8%</span>
                </div>

                <div class="legend-item">
                  <span class="dot bg-pink" />
                  <div class="legend-text">
                    <div class="legend-label">
                      输出
                    </div>
                    <div class="legend-sub">
                      30.9k · 含思考
                    </div>
                  </div>
                  <span class="legend-pct">0.7%</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 右侧：耗时统计 (占 12 栅格) -->
        <el-col :span="12">
          <div class="outer-card-box">
            <div class="section-header">
              <span class="section-title">耗时统计</span>
              <span class="header-extra text-muted">会话累计</span>
              <span class="header-extra font-bold ml-auto">输出速度 109 tok/s</span>
            </div>

            <div class="chart-content flex-col">
              <div class="time-stats-upper">
                <!-- 环形图 -->
                <div class="donut-wrapper">
                  <div class="donut-chart time-donut">
                    <div class="donut-inner">
                      <span class="donut-val text-dark">10m34s</span>
                      <span class="donut-label">活跃时长</span>
                    </div>
                  </div>
                </div>

                <!-- 图例指标网格（3列2行） -->
                <div class="time-legend-grid">
                  <div class="legend-item">
                    <span class="dot bg-blue" />
                    <div class="legend-text">
                      <div class="legend-label">
                        模型等待
                      </div>
                      <div class="legend-sub">
                        2m56s · 70次
                      </div>
                    </div>
                    <span class="legend-pct">27.8%</span>
                  </div>

                  <div class="legend-item">
                    <span class="dot bg-purple" />
                    <div class="legend-text">
                      <div class="legend-label">
                        模型思考
                      </div>
                      <div class="legend-sub">
                        1m28s · 48次
                      </div>
                    </div>
                    <span class="legend-pct">13.9%</span>
                  </div>

                  <div class="legend-item">
                    <span class="dot bg-pink" />
                    <div class="legend-text">
                      <div class="legend-label">
                        模型回复
                      </div>
                      <div class="legend-sub">
                        41.0s · 15次
                      </div>
                    </div>
                    <span class="legend-pct">6.5%</span>
                  </div>

                  <div class="legend-item">
                    <span class="dot bg-dark-orange" />
                    <div class="legend-text">
                      <div class="legend-label">
                        工具参数
                      </div>
                      <div class="legend-sub">
                        2m44s · 110次
                      </div>
                    </div>
                    <span class="legend-pct">26.0%</span>
                  </div>

                  <div class="legend-item">
                    <span class="dot bg-teal" />
                    <div class="legend-text">
                      <div class="legend-label">
                        工具执行
                      </div>
                      <div class="legend-sub">
                        2m33s · 110次
                      </div>
                    </div>
                    <span class="legend-pct">24.2%</span>
                  </div>

                  <div class="legend-item">
                    <span class="dot bg-gray" />
                    <div class="legend-text">
                      <div class="legend-label">
                        其他开销
                      </div>
                      <div class="legend-sub">
                        11.0s
                      </div>
                    </div>
                    <span class="legend-pct">1.7%</span>
                  </div>
                </div>
              </div>

              <!-- 底部时间轴色块与刻度线 -->
              <div class="timeline-wrapper">
                <div class="timeline-bar">
                  <span class="bar-seg bg-blue" style="width: 20%;" />
                  <span class="bar-seg bg-purple" style="width: 14%;" />
                  <span class="bar-seg bg-pink" style="width: 7%;" />
                  <span class="bar-seg bg-dark-orange" style="width: 26%;" />
                  <span class="bar-seg bg-teal" style="width: 25%;" />
                  <span class="bar-seg bg-gray" style="width: 8%;" />
                </div>
                <div class="timeline-ticks">
                  <span>0</span>
                  <span>2m38s</span>
                  <span>5m17s</span>
                  <span>7m56s</span>
                  <span>10m34s</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
/* 全局抗锯齿控制 */
.app-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* 强制死锁上下行之间的垂直间距为 10px */
.row-spacing-fixed {
  margin-top: 10px !important;
}

/* 外层卡片盒 */
.outer-card-box {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* 标题区排版 */
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.header-extra {
  font-size: 12px;
  color: #6b7280;
}

.text-muted {
  color: #9ca3af;
}

.ml-auto {
  margin-left: auto;
}

/* 上方 2x2 grid */
.context-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;
  flex: 1;
}

.inner-block {
  padding: 8px 10px;
  border: 1px solid #ebeeef;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.sub-title {
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
}

.count {
  font-weight: 700;
  font-size: 14px;
  color: #111827;
}

.count-text {
  font-weight: 700;
  font-size: 12px;
  color: #111827;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

:deep(.custom-tag) {
  font-size: 12px !important;
  height: 22px !important;
  padding: 0 6px !important;
}

.agent-info {
  font-size: 12px;
  color: #6b7280;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
}

.plugin-box {
  display: flex;
  flex-direction: column;
}

.plugin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plugin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plugin-main-name {
  font-size: 12px;
  font-weight: 700;
  color: #1f2937;
}

.plugin-desc {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

.plugin-version {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}

.plugin-author {
  font-size: 12px;
  color: #2563eb;
  margin-top: 6px;
  cursor: pointer;
}

.w-full {
  width: 100%;
}

.btn-small {
  font-size: 12px !important;
  height: 28px !important;
}

/* 图表内容区域 */
.chart-content {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.flex-col {
  flex-direction: column;
}

.donut-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-chart {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.token-donut {
  background: conic-gradient(
    #8b5cf6 0% 2.5%,
    #f97316 2.5% 24.5%,
    #10b981 24.5% 24.7%,
    #8b5cf6 24.7% 39.1%,
    #f43f5e 39.1% 42.6%,
    #3b82f6 42.6% 64.6%,
    #14b8a6 64.6% 99.3%,
    #ec4899 99.3% 100%
  );
}

.time-donut {
  background: conic-gradient(
    #3b82f6 0% 27.8%,
    #8b5cf6 27.8% 41.7%,
    #ec4899 41.7% 48.2%,
    #f97316 48.2% 74.2%,
    #14b8a6 74.2% 98.4%,
    #9ca3af 98.4% 100%
  );
}

.donut-inner {
  width: 58px;
  height: 58px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-val {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  line-height: 1.1;
}

.donut-label {
  font-size: 10px;
  color: #6b7280;
  margin-top: 1px;
}

.token-legend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px 12px;
  flex: 1;
}

.time-legend-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 12px;
  flex: 1;
}

.time-stats-upper {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  font-size: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  margin-top: 4px;
  flex-shrink: 0;
}

.legend-text {
  display: flex;
  flex-direction: column;
}

.legend-label {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  line-height: 1.2;
}

.legend-sub {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 1px;
}

.legend-pct {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  margin-left: auto;
  padding-left: 4px;
}

.bg-purple {
  background-color: #8b5cf6;
}

.bg-orange {
  background-color: #f97316;
}

.bg-green {
  background-color: #10b981;
}

.bg-violet {
  background-color: #a855f7;
}

.bg-red-orange {
  background-color: #f43f5e;
}

.bg-blue {
  background-color: #3b82f6;
}

.bg-teal {
  background-color: #14b8a6;
}

.bg-pink {
  background-color: #ec4899;
}

.bg-dark-orange {
  background-color: #ff9800;
}

.bg-gray {
  background-color: #9ca3af;
}

.timeline-wrapper {
  width: 100%;
  margin-top: 8px;
}

.timeline-bar {
  height: 8px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  background-color: #f3f4f6;
}

.bar-seg {
  height: 100%;
}

.timeline-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 3px;
}
</style>
