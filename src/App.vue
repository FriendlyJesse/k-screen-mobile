<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { ElConfigProvider } from "element-plus"
import { ReDialog } from "@/components/ReDialog"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import plusZhCn from "plus-pro-components/es/locale/lang/zh-cn"

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn
}

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return zhCnLocales
    }
  }
})
</script>
