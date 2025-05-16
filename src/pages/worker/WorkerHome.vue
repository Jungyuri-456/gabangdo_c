<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 사이드바 -->
    <div class="fixed w-64 inset-y-0 left-0 bg-white shadow-lg">
      <div class="flex flex-col h-full">
        <!-- 로고 -->
        <div class="p-4 border-b">
          <h1 class="text-xl font-bold text-gray-800">작업자 대시보드</h1>
        </div>
        <!-- 네비게이션 메뉴 -->
        <nav class="flex-1 p-4 space-y-2">
          <router-link
            v-for="link in links"
            :key="links.path"
            :to="link.path"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'bg-indigo-100 text-indigo-700': isActive(link.path) }">
            <i :class="[link.icon, 'mr-3']"></i>
            {{ link.name }}
          </router-link>
        </nav>
        <!-- 로그아웃 -->
        <div class="p-4 border-t">
            <button @click="logout" class="w-full flex items-center justify-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
               <i class="fas fa-sign-out-alt mr-3"></i> 로그아웃
            </button>
        </div>
      </div>
    </div>
    <!-- 메인컨텐츠 -->
    <div class="md:ml-64 ml-0 min-h-screen">
      <div class="p-8">
        <p v-if="isLoggedIn">🛠{{userName}}기사님</p>
        <div class="driver-container">
          <main>
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";
const authStore = useAuthStore();
const { isLoggedIn, userName } = storeToRefs(authStore);
const route = useRoute();
const router = useRouter();
const links = [
  { name: "대시보드", path: "/worker/ddashboard", icon: "fas fa-home" },
  {
    name: "배정된 예약",
    path: "/worker/assigned-jobs",
    icon: "fas fa-calendar-check",
  },
  { name: "기사페이지", path: "/worker/assing", icon: "fas fa-user-tie" },
  { name: "작업 내역", path: "/worker/job-history", icon: "fas fa-history" },
  { name: "프로필", path: "/worker/profile", icon: "fas fa-user-circle" },
];
// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;
// logout기능
const logout = ()=>{
    authStore.logout()
    router.push("/")
}
</script>
<style scoped>
/* 반응형 스타일 */
@media (max-width: 768px) {
   .fixed{
    position: relative;
    width: 100%;
    height: auto;
   .ml-64{
    margin-left: 0;
   } 
   .w-64 {
    width: 100%;
  }
   .p-8{
    padding: 1rem;
   } 
   } 
}
</style>
