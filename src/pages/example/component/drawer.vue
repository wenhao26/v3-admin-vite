<script setup>
import { ElMessageBox } from "element-plus"
import { ref } from "vue"

const drawer = ref(false)
const direction = ref("ltr")
function handleClose(done) {
  ElMessageBox.confirm("确定要关闭吗？")
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<template>
  <div class="app-container">
    <el-drawer v-model="drawer" title="标题" :direction="direction" :before-close="handleClose">
      <span>抽屉页面</span>
    </el-drawer>

    <div class="flex items-center gap-3">
      <el-radio-group v-model="direction">
        <el-radio value="ltr">
          👉 从左向右弹出
        </el-radio>
        <el-radio value="rtl">
          👈 从右向左弹出
        </el-radio>
        <el-radio value="ttb">
          👇 从上向下弹出
        </el-radio>
        <el-radio value="btt">
          👆 从下向上弹出
        </el-radio>
      </el-radio-group>
      <el-button type="primary" @click="drawer = true">
        打开抽屉
      </el-button>
    </div>
  </div>
</template>
