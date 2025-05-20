<template>
     <!-- 검색 select바 -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- 날짜 선택 -->
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">기준일</label>
          <select
            v-model="item.rangeType"
            @change="updateDateRange(index)"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="today">오늘</option>
            <option value="week">일주일</option>
            <option value="month">한달</option>
            <option value="all">전체</option>
          </select>
          <input
            type="date"
            v-model="item.startDate"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          <span>~</span>
          <input
            type="date"
            v-model="item.endDate"
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <!-- 픽업위치 선택 -->
        <div
          v-for="(pick, index) in pickupArea"
          :key="index"
          class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">픽업위치</label>
          <select
            v-model="pick.atArea"
            @change="updatepickupArea(index)"
            class="rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="all">전체</option>
            <option value="대구공항">대구공항</option>
            <option value="동대구역">동대구역</option>
            <option value="서대구역">서대구역</option>
          </select>
        </div>

        <!-- 지역별 담당 구역 선택 -->
        <div
          v-for="(area, index) in workerArea"
          :key="index"
          class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">담당지역</label>
          <select
            @click="area.dutyArea"
            class="rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="all">전체</option>
            <option value="gu1">동구, 군위군</option>
            <option value="gu2">서구, 중구, 북구</option>
            <option value="gu3">중구, 수성구</option>
            <option value="gu4">달서구, 달성군</option>
          </select>
        </div>

        <!-- 운반 상태 -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">운반상태</label>
          <select
            class="rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="all">전체</option>
            <option value="waiting">대기중</option>
            <option value="assigned">기사배정</option>
            <option value="in_progress">운반중</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
        </div>

        <!-- 검색 버튼 -->
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          검색
        </button>
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>