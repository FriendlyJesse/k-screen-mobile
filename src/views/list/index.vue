<script setup lang="ts">
import { useRouter } from "vue-router"
import { tableData } from "./data"

const router = useRouter()

const columns: TableColumnList = [
  {
    label: "日期",
    prop: "date"
  },
  {
    label: "姓名",
    prop: "name"
  },
  {
    label: "地址",
    prop: "address"
  }
]

const toStpes = () => {
  router.push("/steps")
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <el-button @click="toStpes">新增</el-button>
    </template>
    <pure-table
      :data="tableData.concat(tableData).concat(tableData)"
      :columns="columns"
      height="360"
    />
  </el-card>
</template>
