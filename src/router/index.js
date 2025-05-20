import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Home.vue";
import Bangbeob1 from "../views/bangbeob/Bangbeob1.vue";
import Bangbeob2 from "../views/bangbeob/Bangbeob2.vue";
import Yeyak from "@/views/yeyak/Yeyak.vue";
import Yeyak2 from "../views/yeyak/Yeyak2.vue";
import Yeyak4 from "../views/yeyak/Yeyak4.vue";
import Yeyak5 from "../views/yeyak/Yeyak5.vue";
import YeyakLookup from "../views/yeyak/YeyakLookup.vue";
import YeyakLookup2 from "../views/yeyak/YeyakLookup2.vue";
import Yogeum from "@/views/yogeum/Yogeum.vue";
import Sotong from "@/views/sotong/Sotong.vue";
import Sotong2 from "../views/sotong/Sotong2.vue";
import Yeohaeng from "../views/yeohaeng/Yeohaeng.vue";
import Yh_Festival from "../views/yeohaeng/Yh_Festival.vue";
import Delivery from "../views/deliverylogin/Delivery.vue";
import Login from "../views/deliverylogin/Login.vue";
import Signup from "../views/deliverylogin/Signup.vue";
import findPassword from "../views/deliverylogin/findPassword.vue";
// 기사페이지
import WorkerHome from "@/pages/worker/WorkerHome.vue";
import Ddashboard from "@/pages/worker/DDashboard.vue";
import Assign from "../pages/worker/Assign.vue";
import AssignedJobs from "../pages/worker/AssignedJobs.vue";
import Jobhistory from "../pages/worker/Jobhistory.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/bangbeob1", component: Bangbeob1 },
  { path: "/bangbeob2", component: Bangbeob2 },
  { path: "/yeyak", component: Yeyak },
  { path: "/yeyak2", component: Yeyak2 },
  { path: "/yeyak4", component: Yeyak4 },
  { path: "/yeyak5", component: Yeyak5 },
  { path: "/yeyaklookup", component: YeyakLookup },
  { path: "/yeyaklookup2", component: YeyakLookup2 },
  { path: "/yogeum", component: Yogeum },
  { path: "/sotong", component: Sotong },
  { path: "/sotong2", component: Sotong2 },
  { path: "/yeohaeng", component: Yeohaeng },
  { path: "/yh_festival", component: Yh_Festival },
  { path: "/delivery", component: Delivery },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/findpassword", component: findPassword },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorPage",
    component: () => import("../views/ErrorPage.vue"),
  },
  // 기사페이지
  {
    path: "/worker",
    // component: WorkerHome,
    redirect: "/worker/Ddashboard", //경로 접근시 자동 리다이렉트
    children: [
      {
        path: "ddashboard",
        component: Ddashboard,
      },
      {
        path: "assigned-jobs",
        component: AssignedJobs,
      },
      {
        path: "assign",
        component: Assign,
      },
      {
        path: "job-history",
        component: Jobhistory,
      },


    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 맨 위로 스크롤
    return { top: 0 };
  },
});
export default router;
