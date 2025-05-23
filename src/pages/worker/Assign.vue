<template>
  <!-- 전체 래퍼 -->
  <div class="w-[390px] bg-gray-900 text-white m-auto">
    <!-- 이너 -->
    <div class="w-[350px] mx-auto">
      <!-- 헤더 -->
      <div
        class="flex items-center justify-between py-3 bg-gray-900 text-white">
        <!-- 뒤로가기 -->
        <button @click="goBack">
          <img
            src="/public/images/yr/delivery/backIcon.png"
            alt="뒤로가기"
            class="w-4 h-4" />
        </button>
        <!-- 사용자명 -->
        <router-link to="/worker/ddashboard">
          <div class="text-blue-500 text-lg font-bold">
            <img src="/public/images/logo_delivery.png" alt="" />
          </div>
        </router-link>
        <!-- 알림/내역 -->
        <div class="flex gap-2">
          <router-link to="/worker/assigned-jobs">
            <img
              src="/public/images/yr/delivery/check_icon.png"
              alt="체크"
              class="w-4 h-4" />
          </router-link>
        </div>
      </div>

      <!-- 알림 타이틀 -->
      <h2 class="text-[#279BF3] text-xl mt-4 mb-2 font-semibold">알림</h2>

      <div class="space-y-3">
        <div class="relative bg-[#E9E9E9] border rounded-lg p-2">
          <!-- 알림1 -->
          <div
            class="relative bg-white border-solid border-gray-300 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-2">
            <img
              src="/public/images/yr/delivery/alert1.png"
              alt="알림"
              class="w-8 h-8 mr-2" />
            <div class="flex-1 text-sm text-black pt-1.5">
              교육 영상 수료일이 20일 남았습니다.
            </div>
            <button class="absolute top-2 right-2">
              <img
                src="/public/images/yr/delivery/Xicon.png"
                alt="닫기"
                class="w-3 h-3" />
            </button>
            <div class="absolute bottom-2 right-3 text-xs text-gray-400">
              17:55
            </div>
          </div>
          <!-- 알림4 -->
          <div
            class="relative bg-white border-solid border-gray-300 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-2">
            <img
              src="/public/images/yr/delivery/alert1.png"
              alt="알림"
              class="w-8 h-8 mr-2" />
            <div class="flex-1 text-sm text-black pt-1.5">
              리뷰가 등록되었습니다.
            </div>
            <button class="absolute top-2 right-2">
              <img
                src="/public/images/yr/delivery/Xicon.png"
                alt="닫기"
                class="w-3 h-3" />
            </button>
            <div class="absolute bottom-2 right-3 text-xs text-gray-400">
              14:58
            </div>
          </div>
          <!-- 알림3 -->
          <div
            class="relative bg-white border-solid border-gray-300 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-2">
            <img
              src="/public/images/yr/delivery/alert3.png"
              alt="알림"
              class="w-8 h-8 mr-2" />
            <div class="flex-1 text-sm text-black pt-1.5">
              예정된 작업이 30분 남았습니다.
            </div>
            <button class="absolute top-2 right-2">
              <img
                src="/public/images/yr/delivery/Xicon.png"
                alt="닫기"
                class="w-3 h-3" />
            </button>
            <div class="absolute bottom-2 right-3 text-xs text-gray-400">
              18:00
            </div>
          </div>
          <!-- 알림2 -->
          <div
            class="relative bg-white border-solid border-gray-300 border-[1px] rounded-lg px-4 py-4 flex items-start gap-2 mb-7">
            <img
              src="/public/images/yr/delivery/alert2.png"
              alt="알림"
              class="w-8 h-8 mr-2 mt-2" />
            <div class="flex-1 text-sm text-black pt-1.5">
              5월 정산이 마무리 되었습니다. <br />확인 부탁드립니다.
            </div>
            <button class="absolute top-2 right-2">
              <img
                src="/public/images/yr/delivery/Xicon.png"
                alt="닫기"
                class="w-3 h-3" />
            </button>
            <div class="absolute bottom-2 right-3 text-xs text-gray-400">
              2025.05.14
            </div>
          </div>
        </div>
      </div>

      <!-- 전체 지우기 버튼 -->
      <div class="mt-3 pb-3">
        <button
          class="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          <img
            src="/public/images/yr/delivery/trashIcon.png"
            alt="휴지통"
            class="w-5 h-5" />
          <span class="pt-0.5">전체 지우기</span>
        </button>
      </div>
    </div>
    <!-- ✅ 이 닫는 div를 여기로 이동해야 함 -->
  </div>
</template>
<style scoped>
.borderW {
  border-width: 1px !important;
}
</style>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back(); // 또는 router.go(-1)
};
</script>
