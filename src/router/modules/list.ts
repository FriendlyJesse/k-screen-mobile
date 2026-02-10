const { VITE_HIDE_HOME } = import.meta.env
const Layout = () => import("@/layout/index.vue")

export default {
  path: "/",
  name: "ListContainer",
  component: Layout,
  redirect: "/list",
  meta: {
    icon: "ep/home-filled",
    title: "列表",
    rank: 1
  },
  children: [
    {
      path: "/list",
      name: "List",
      component: () => import("@/views/list/index.vue"),
      meta: {
        title: "列表",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    },
    {
      path: "/steps",
      name: "Steps",
      component: () => import("@/views/list/steps.vue"),
      meta: {
        title: "步骤条",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable
