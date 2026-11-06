<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import { CircleCloseFilled, WarningFilled } from "@element-plus/icons-vue"
import { reactive } from "vue"

const formRef = ref<FormInstance>()
const formResult = ref("")

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  online: false,
  type: [],
  resource: "",
  desc: ""
})

// 校验规则
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入活动名称",
      trigger: "blur"
    }
  ]
})

async function onSubmit() {
  console.log("submit!", form)

  if (!formRef.value) return

  // 调用 validate()，它会返回一个 Promise
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // ✅ 校验通过，执行你的提交逻辑
      console.log("submit success!", form)
      ElMessage.success(`提交成功！`)
      formResult.value = JSON.stringify(form, null, 2)
    } else {
      // ❌ 校验失败，此时页面上已经自动出现红字提示了
      console.log("校验失败:", fields)
      ElMessage.error(`提交失败！`)
    }
  })
}
</script>

<template>
  <div class="app-container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" />
        <!-- 自定义错误插槽 -->
        <!-- 加上你喜欢的图标，这里用 Element Plus 自带的 Warning 图标 -->
        <!-- <template #error="{ error }">
          <div class="flex items-center text-red-500 text-sm mt-1">
            <el-icon class="mr-1">
              <WarningFilled />
            </el-icon>
            <span>{{ error }}</span>
          </div>
        </template> -->
      </el-form-item>

      <el-form-item label="活动地区">
        <el-select v-model="form.region" placeholder="选择类型">
          <el-option label="广州天河" value="gz-tianhe" />
          <el-option label="广州海珠" value="gz-haizhu" />
        </el-select>
      </el-form-item>

      <el-form-item label="活动周期">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="开始时间" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.date2" placeholder="结束时间" style="width: 100%" />
        </el-col>
      </el-form-item>

      <el-form-item label="是否线上">
        <el-switch v-model="form.online" />
      </el-form-item>

      <el-form-item label="活动类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox value="t0" name="type">
            相亲活动
          </el-checkbox>
          <el-checkbox value="t1" name="type">
            爱心献血
          </el-checkbox>
          <el-checkbox value="t2" name="type">
            健康咨询
          </el-checkbox>
          <el-checkbox value="t3" name="type">
            歌唱比赛
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="活动赞助商">
        <el-radio-group v-model="form.resource">
          <el-radio value="sponsor">
            个人
          </el-radio>
          <el-radio value="venue">
            组织
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          创建
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <h3>{{ formResult }}</h3>
  </div>
</template>
