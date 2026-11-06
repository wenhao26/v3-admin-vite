<script lang="ts" setup>
import { usePagination } from "@@/composables/usePagination"
import { Refresh, Search } from "@element-plus/icons-vue"
import { computed, ref } from "vue"

// 定义 loading 状态
const loading = ref(true) // 默认设为 true，一进来就显示
const isDataLoaded = ref(false) // 控制数据是否真正渲染到表格

// 使用 computed 拦截数据
const displayData = computed(() => {
  // 如果还没加载完，返回空数组，表格什么都不显示
  if (!isDataLoaded.value) return []
  // 加载完后，返回你原本的分页数据
  return paginatedData.value
})

// 页面加载前模拟请求数据
onMounted(() => {
  setTimeout(() => {
    isDataLoaded.value = true // 允许显示数据
    loading.value = false // 关闭 Loading
  }, 1000)
})

const tableData = [
  {
    id: 1688,
    cover: "https://noveliax.oss-us-west-1.aliyuncs.com/h5novel/book/2026/10/228c7d01f6afb2579b85b49d0249f0c713.jpg",
    title: "His Best Friend Ruined Every Bride—Until Me",
    base_info: "短篇/已完结/女频/14章/9.75千字",
    pay_chapter_info: "千字/第4章",
    serial_status: 1,
    source: "AI创作",
    on_sale_time: "2026-11-06 14:35:03",
    update_time: "2026-11-06 14:35:03"
  },
  {
    id: 1689,
    cover: "https://noveliax.oss-us-west-1.aliyuncs.com/h5novel/book/2026/10/22aca9ce67642c8eef41686f149bb2421a.jpg",
    title: "He Signed Our Divorce Papers Without Reading Them",
    base_info: "短篇/已完结/女频/14章/9.38千字",
    pay_chapter_info: "千字/第4章",
    serial_status: 1,
    source: "AI创作",
    on_sale_time: "2026-11-06 14:35:03",
    update_time: "2026-11-06 14:35:03"
  },
  {
    id: 1690,
    cover: "https://noveliax.oss-us-west-1.aliyuncs.com/h5novel/book/2026/10/22e5cd8fbff83f51eccd67295af55d6a72.jpg",
    title: "Reborn, I Let My Husband Keep His Brother Widow",
    base_info: "短篇/已完结/女频/14章/9.28千字",
    pay_chapter_info: "千字/第4章",
    serial_status: 0,
    source: "AI创作",
    on_sale_time: "2026-11-06 14:35:03",
    update_time: "2026-11-06 14:35:03"
  },
  {
    id: 1691,
    cover: "https://noveliax.oss-us-west-1.aliyuncs.com/h5novel/book/2026/10/22e05bea492a007539ba92945c4d2c1439.jpg",
    title: "He Said She Comes First. So I Smiled.",
    base_info: "短篇/已完结/女频/14章/9.44千字",
    pay_chapter_info: "千字/第4章",
    serial_status: 1,
    source: "AI创作",
    on_sale_time: "2026-11-06 14:35:02",
    update_time: ""
  }
]

// 搜索表单数据
const searchFormRef = ref()
const searchData = reactive({
  id: "",
  title: ""
})

// 使用 usePagination
const {
  paginationData,
  handleCurrentChange,
  handleSizeChange
} = usePagination({
  pageSize: 10,
  pageSizes: [10, 20, 50]
})

// 手动计算当前页要渲染的数据（因为数据是本地硬编码的）
// const paginatedData = computed(() => {
//   const start = (paginationData.currentPage - 1) * paginationData.pageSize
//   return tableData.slice(start, start + paginationData.pageSize)
// })

// 先根据搜索条件过滤，再分页
const filteredData = computed(() => {
  return tableData.filter((item) => {
    const matchId = searchData.id ? String(item.id).includes(searchData.id) : true
    const matchTitle = searchData.title
      ? item.title.toLowerCase().includes(searchData.title.toLowerCase())
      : true
    return matchId && matchTitle
  })
})

const paginatedData = computed(() => {
  const start = (paginationData.currentPage - 1) * paginationData.pageSize
  return filteredData.value.slice(start, start + paginationData.pageSize)
})

function handleClick() {
  console.log("click")
}

function handleSearch() {
  // 直接重置到第一页
  paginationData.currentPage = 1
}

function resetSearch() {
  searchFormRef.value?.resetFields()
  // 直接重置到第一页
  paginationData.currentPage = 1
}

// 通知
function openSuccess() {
  ElNotification({
    title: "成功",
    message: "操作成功！",
    type: "success"
  })
}

function openSuccess1() {
  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
    plain: true, // 开启素色背景（背景呈淡色，文字和图标是深色）
    duration: 3000, // 显示时间（毫秒），默认3000，设为0则不自动关闭
    showClose: true // 显示关闭按钮（可选）
  })
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item label="ID" prop="id">
          <el-input v-model="searchData.id" placeholder="请输入小说 ID" clearable style="width: 160px" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="searchData.title" placeholder="请输入小说标题" clearable style="width: 160px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mock-wrapper">
      <div class="flex items-center gap-3">
        <el-button type="success" @click="openSuccess">
          成功
        </el-button>
        <el-button class="!ml-0" :plain="true" @click="openSuccess1">
          Success
        </el-button>
      </div>
    </el-card>

    <el-table v-loading="loading" :data="displayData" style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="100" />
      <el-table-column prop="cover" label="封面" width="120">
        <template #default="{ row }">
          <!-- 使用 el-image 组件 -->
          <el-image
            :src="row.cover" :preview-src-list="[row.cover]" preview-teleported fit="cover"
            style="width: 45px; height: 60px; object-fit: cover; border-radius: 4px;"
          >
            <!-- 加载失败或无图片时的占位 -->
            <template #error>
              <div class="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-xs">
                暂无图片
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="base_info" label="基础信息" width="240" />
      <el-table-column prop="pay_chapter_info" label="起始收费章节" width="150" />
      <!-- 标签处理 -->
      <el-table-column prop="serial_status" label="连载状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.serial_status === 1 ? 'success' : 'info'">
            {{ row.serial_status === 0 ? '连载中' : '已完结' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="来源" width="150" />
      <el-table-column prop="on_sale_time" label="上架时间" width="200" />
      <el-table-column prop="update_time" label="最近更新于" width="200" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button link type="primary" size="small">
            章节
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :layout="paginationData.layout" :page-sizes="paginationData.pageSizes" :total="tableData.length"
      :page-size="paginationData.pageSize" :current-page="paginationData.currentPage"
      @current-change="handleCurrentChange" @size-change="handleSizeChange"
      style="margin-top: 16px; justify-content: flex-end"
    />
  </div>
</template>

<style>
.search-wrapper,
.mock-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}
</style>
