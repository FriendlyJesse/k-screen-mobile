<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
// https://plus-pro-components.com/components/steps-form.html
import "plus-pro-components/es/components/steps-form/style/css"
import { PlusStepsForm } from "plus-pro-components"

const stepsFormRef = ref<InstanceType<typeof PlusStepsForm>>()

const stepForm = ref([
  {
    title: "第一步",
    form: {
      labelPosition: "top",
      style: {
        width: "300px",
        margin: "40px auto"
      },
      modelValue: {},
      columns: [
        {
          label: "名称",
          width: 120,
          prop: "name",
          valueType: "copy",
          tooltip: "名称最多显示6个字符"
        },
        {
          label: "状态",
          width: 120,
          prop: "status",
          valueType: "select",
          options: [
            {
              label: "未解决",
              value: "0",
              color: "red"
            },
            {
              label: "已解决",
              value: "1",
              color: "blue"
            },
            {
              label: "解决中",
              value: "2",
              color: "yellow"
            },
            {
              label: "失败",
              value: "3",
              color: "red"
            }
          ]
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称"
          }
        ]
      }
    }
  },
  {
    title: "第二步",
    form: {
      labelPosition: "top",
      style: {
        width: "300px",
        margin: "40px auto"
      },
      labelWidth: "100",
      modelValue: {},
      columns: [
        {
          label: "标签",
          width: 120,
          prop: "tag"
        },
        {
          label: "执行进度",
          width: 200,
          prop: "progress"
        },
        {
          label: "评分",
          width: 200,
          prop: "rate",
          valueType: "rate"
        },
        {
          label: "是否显示",
          width: 100,
          prop: "switch",
          valueType: "switch"
        }
      ],
      rules: {
        tag: [
          {
            required: true,
            message: "请输入标签"
          }
        ],
        progress: [
          {
            required: true,
            message: "请输入执行进度"
          }
        ]
      }
    }
  },
  {
    title: "第三步",
    form: {
      labelPosition: "top",
      style: {
        width: "300px",
        margin: "40px auto"
      },
      modelValue: {},
      columns: [
        {
          label: "时间",
          prop: "time",
          valueType: "date-picker"
        },
        {
          label: "要求",
          prop: "demand",
          valueType: "checkbox",
          options: [
            {
              label: "四六级",
              value: "0"
            },
            {
              label: "计算机二级证书",
              value: "1"
            },
            {
              label: "普通话证书",
              value: "2"
            }
          ]
        },
        {
          label: "奖励",
          prop: "price"
        },
        {
          label: "提成",
          prop: "percentage"
        },
        {
          label: "说明",
          prop: "desc",
          valueType: "textarea",
          fieldProps: {
            maxlength: 10,
            showWordLimit: true,
            autosize: { minRows: 2, maxRows: 4 }
          }
        }
      ],
      rules: {
        time: [
          {
            required: true,
            trigger: "change",
            message: "请选择时间"
          }
        ],
        demand: [
          {
            required: true,
            trigger: "change",
            message: "请选择要求"
          }
        ]
      }
    }
  }
])

const active = ref(1)

const next = (actives: number, values: any) => {
  active.value = actives
  console.log(active, values, stepForm.value)
}

/**
 * 点击步骤头部跳转到对应步骤
 * PlusStepsForm 底层使用 ElSteps/ElStep，不支持原生点击跳转，
 * 这里通过事件代理监听 .el-step__head 的点击事件来实现。
 */
onMounted(() => {
  nextTick(() => {
    const el = stepsFormRef.value?.$el as HTMLElement | undefined
    if (!el) return

    el.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // 向上查找最近的 .el-step 元素
      const stepEl = target.closest(".el-step") as HTMLElement | null
      if (!stepEl) return

      // 只在点击步骤头部区域时跳转（标题、图标、描述）
      const headEl = target.closest(
        ".el-step__head, .el-step__title, .el-step__description"
      )
      if (!headEl) return

      // 获取该 step 在兄弟节点中的索引
      const stepsContainer = stepEl.parentElement
      if (!stepsContainer) return
      const steps = Array.from(
        stepsContainer.querySelectorAll(":scope > .el-step")
      )
      const index = steps.indexOf(stepEl)
      if (index !== -1) {
        active.value = index + 1 // active 从 1 开始
      }
    })
  })
})
</script>

<template>
  <PlusStepsForm
    ref="stepsFormRef"
    v-model="active"
    class="w-[380px] m-auto clickable-steps"
    :data="stepForm as any"
    align-center
    @next="next"
  />
</template>

<style scoped>
/* 让步骤头部看起来可点击 */
.clickable-steps :deep(.el-step__head),
.clickable-steps :deep(.el-step__title),
.clickable-steps :deep(.el-step__description) {
  cursor: pointer;
}

.clickable-steps :deep(.el-step__head:hover) {
  color: var(--el-color-primary);
}

.clickable-steps :deep(.el-step__title:hover) {
  color: var(--el-color-primary);
}
</style>
