<template>
  <!-- 전체 래퍼 -->
  <div
    class="w-[390px] min-h-screen bg-gray-900 text-sm text-black font-medium mx-auto">
    <!-- 헤더 -->
    <div
      class="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
      <!-- 뒤로가기 -->
      <button @click="goBack">
        <img
          src="/public/images/yr/delivery/backIcon.png"
          alt="뒤로가기"
          class="w-4 h-4" />
      </button>
      <!-- 사용자명 -->
      <div class="text-blue-500 text-lg font-bold">
        홍길동<span class="text-white text-sm">기사님</span>
      </div>
      <!-- 알림/내역 -->

      <router-link to="/worker/assign">
        <img
          src="/public/images/yr/delivery/alert.png"
          alt="알림"
          class="w-4 h-4" />
      </router-link>
    </div>

    <!-- 타이틀 -->
    <h2 class="text-[#279BF3] text-xl mt-4 mb-2 font-semibold px-4">
      내역확인
    </h2>

    <!-- 대시보드 -->
    <div
      class="mx-auto w-[350px] bg-white rounded-xl p-2 flex justify-between items-center shadow">
      <!-- 평가 -->
      <div class="flex flex-col items-center text-xs">
        <p class="text-black mb-1 pl-4">평가</p>
        <img
          src="/public/images/yr/delivery/star.png"
          alt="평가별"
          class="w-16 ml-4" />
        <p class="text-base font-semibold pl-4">4.0</p>
      </div>
      <div class="w-px h-12 bg-gray-200"></div>
      <!-- 총 작업수 -->
      <div class="flex flex-col items-center text-xs">
        <p class="text-black mb-1">총 작업수</p>
        <p class="text-base font-semibold text-blue-600">58건</p>
      </div>
      <div class="w-px h-12 bg-gray-200"></div>
      <!-- 수령금액 -->
      <div class="flex flex-col items-center text-xs mr-5">
        <p class="text-black mb-1">수령금액</p>
        <p class="text-base font-semibold text-red-600">
          449,500<span class="text-xs text-gray-500">원</span>
        </p>
      </div>
    </div>

    <!-- 검색 필터 -->
    <div class="mx-auto w-[350px] mt-4 relative">
      <input
        type="text"
        placeholder="고객명 또는 주소, 전화번호 검색"
        class="w-full pl-10 pr-3 py-2 rounded border border-gray-300 text-sm focus:outline-none" />
      <img
        src="/public/images/yr/delivery/glass.png"
        alt="돋보기"
        class="absolute left-3 top-2.5 w-4 h-4" />
    </div>

    <!-- 날짜 필터 -->
    <div class="mx-auto w-[350px] mt-2">
      <select class="w-full py-2 px-3 rounded border text-sm">
        <option>최근 1주일</option>
        <option>최근 2개월</option>
        <option>최근 3개월</option>
      </select>
    </div>

    <!-- 카드 내역들 -->
    <div class="mx-auto w-[350px] mt-4 space-y-4 pb-10">
      <div class="p-2 bg-[#E9E9E9] rounded-lg">
        <!-- 카드 1 -->
        <div class="bg-white rounded-lg shadow p-3 mb-2">
          <div class="flex justify-between text-sm font-semibold text-gray-700">
            <p>05.14 (수)</p>
            <p class="text-red-600">13,000원</p>
          </div>
          <p class="mt-1 text-gray-900 font-medium text-[17px]">홍길동</p>
          <div
            class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
            <p>s사이즈 / 3개</p>
            <p class="text-black">4.5점</p>
          </div>
          <button
            class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
            상세
          </button>
        </div>

        <!-- 카드 2 (복제) -->
        <div class="bg-white rounded-lg shadow p-3 mb-2">
          <div class="flex justify-between text-sm font-semibold text-gray-700">
            <p>05.14 (수)</p>
            <p class="text-red-600">449,500원</p>
          </div>
          <p class="mt-1 text-gray-900 font-medium text-[17px]">홍길동</p>
          <div
            class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
            <p>s사이즈 / 3개</p>
            <p class="text-black">5.0점</p>
          </div>
          <button
            class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
            상세
          </button>
        </div>

        <!-- 카드 3 -->
        <div class="bg-white rounded-lg shadow p-3 mb-2">
          <div class="flex justify-between text-sm font-semibold text-gray-700">
            <p>05.14 (수)</p>
            <p class="text-red-600">449,500원</p>
          </div>
          <p class="mt-1 text-gray-900 font-medium text-[17px]">홍길동</p>
          <div
            class="flex justify-between text-sm text-blue-600 mt-1 text-[17px]">
            <p>s사이즈 / 3개</p>
            <p class="text-black">4.5점</p>
          </div>
          <button
            class="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white text-sm py-1.5 rounded">
            상세
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back(); // 또는 router.go(-1)
};
</script>
