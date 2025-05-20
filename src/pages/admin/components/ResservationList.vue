<template>
  <!-- 예약 현황 -->
  <div class="bg-white rounded-lg shadow">
    <!-- 운반 예약 현황 타이틀  -->
    <div class="p-4 pb-0 pb-0border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">운반 예약 현황</h2>
    </div>
     <!-- 검색 select바 -->
      <div class="p-4 font-light text-gray-500 border-b border-gray-200 flex flex-col md:flex-row gap-4">
        <div class="flex flex-col md:flex-row gap-2">
        <SearchSelect  label="기준일" v-model="date" :options="dateOptions" />
        <!-- 날짜 범위 선택 -->
        <DateRangePicker
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate" />
          <!-- 날짜 선택 인풋 -->
        <SearchDateSelect
          v-model="item.rangeType"
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate"
          @change="onRangeChange" />
        <SearchSelect
          label="픽업위치"
          v-model="pickup"
          :options="pickupOptions" />
        <SearchSelect label="담당지역" v-model="area" :options="areaOptions" />
        <SearchSelect
          label="운반상태"
          v-model="status"
          :options="statusOptions" />
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          검색
        </button>
      </div>
</div>
    
    <!-- 운반 메뉴바  -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="hover:bg-gray-50">
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              예약번호
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              고객명
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              픽업위치
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              가방수
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              예약일시
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              담당기사
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              액션
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="reservation in pagedReservations"
            :key="reservation.id"
            class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.customerName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.location }}
            </td>
            <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.bagCount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(reservation.date) }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span
                :class="getStatusClass(reservation.status)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ reservation.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ reservation.worker }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="showReservationDetails(reservation)"
                class="text-indigo-600 hover:text-indigo-900 mr-3">
                상세
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 예약 상세 모달 -->
    <div
      v-if="selectedReservation"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">예약 상세 정보</h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 기본 정보 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  기본 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >상태 *</label
                    >
                    <select
                      v-model="selectedReservation.status"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="대기중">대기중</option>
                      <option value="기사배정">기사배정</option>
                      <option value="운반중">운반중</option>
                      <option value="완료">완료</option>
                      <option value="취소">취소</option>
                    </select>
                  </div>
                  <!-- 픽업위치 -->
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >픽업위치 *</label
                    >
                    <select
                      v-model="selectedReservation.location"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="대구공항">대구공항</option>
                      <option value="동대구역">동대구역</option>
                      <option value="서대구역">서대구역</option>
                    </select>
                  </div>
                  <!-- 가방수
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >가방수 *</label
                    >
                    <input
                      type="number"
                      v-model="selectedReservation.bagCount"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div> -->
                  <!-- 고객 -->
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >고객명 *</label
                    >
                    <input
                      type="text"
                      v-model="selectedReservation.customerName"
                      class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >연락처 *</label
                    >
                    <input
                      type="text"
                      v-model="selectedReservation.phone"
                      class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>

              <!-- 운반 정보 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  운반 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >가방 수 *</label
                    >
                    <input
                      type="number"
                      v-model="selectedReservation.bagCount"
                      class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >특별 요청</label
                    >
                    <input
                      type="text"
                      v-model="selectedReservation.specialRequests"
                      placeholder="특별 취급 가방, 대형 가방 등"
                      class="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 일정 및 기타 정보 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  일정 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >예약일시 *</label
                    >
                    <input
                      type="datetime-local"
                      v-model="selectedReservation.preferredDateTime"
                      class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>

              <!-- 담당 정보 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  담당 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >담당기사 *</label
                    >
                    <div
                      @click="openTechnicianSearchModal"
                      class="flex-1 relative">
                      <input
                        type="text"
                        v-model="technicianSearch"
                        readonly
                        placeholder="기사 검색"
                        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer" />
                      <i
                        class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  추가 정보
                </h4>
                <div class="space-y-2">
                  <div>
                    <label class="text-sm font-medium text-gray-700"
                      >메모</label
                    >
                    <textarea
                      v-model="selectedReservation.memo"
                      rows="3"
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="추가 메모사항을 입력하세요"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 px-3 flex justify-end gap-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            예약취소
          </button>
          <button
            @click="saveReservation"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:text-white hover:bg-indigo-600 text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            저장
          </button>
        </div>
      </div>
    </div>

    <!-- 취소 확인 모달 -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">예약 취소 확인</h3>
            <button
              @click="closeCancelModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-900">
            정말로 이 예약을 취소하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 mt-1">
            취소된 예약은 복구할 수 없습니다.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeCancelModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            아니오
          </button>
          <button
            @click="cancelReservation"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            예, 취소합니다
          </button>
        </div>
      </div>
    </div>

    <!-- 기사 검색 모달 -->
    <div
      v-if="showTechnicianSearchModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">기사 검색</h3>
            <button
              @click="closeTechnicianSearchModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <!-- 검색 조건 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >구분</label
              >
              <select
                v-model="technicianSearchFilters.type"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="executive">임원</option>
                <option value="employee">사원</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >정산율</label
              >
              <select
                v-model="technicianSearchFilters.settlementRate"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="70">70%</option>
                <option value="75">75%</option>
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >활동지역</label
              >
              <select
                v-model="technicianSearchFilters.area"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">전체</option>
                <option value="gu1">동구, 군위군</option>
                <option value="gu2">서구, 중구, 북구</option>
                <option value="gu3">중구, 수성구</option>
                <option value="gu4">달서구, 달성군</option>
              </select>
            </div>
          </div>

          <!-- 검색어 입력 -->
          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                v-model="technicianSearchFilters.keyword"
                @input="handleInput"
                placeholder="기사명 또는 전화번호로 검색"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <!-- 기사 목록 테이블 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기사명
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    구분
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    휴대전화
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산율
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    활동지역
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선택
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="tech in paginatedTechnicians"
                  :key="tech.id"
                  class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getTechnicianTypeText(tech.type) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.phone }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ tech.settlementRate }}%
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ getAreaText(tech.area) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="selectTechnician(tech)"
                      class="text-indigo-600 hover:text-indigo-900">
                      선택
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 페이지네이션 -->
          <div class="flex justify-between items-center mt-6">
            <div class="text-sm text-gray-700">
              총
              <span class="font-medium">{{ filteredTechnicians.length }}</span
              >명의 기사
            </div>
            <div class="flex gap-2">
              <button
                @click="prevTechnicianPage"
                :disabled="currentTechnicianPage === 1"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button
                v-for="page in totalTechnicianPages"
                :key="page"
                @click="goToTechnicianPage(page)"
                :class="[
                  'px-3 py-1 border rounded',
                  currentTechnicianPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 hover:bg-gray-50',
                ]">
                {{ page }}
              </button>
              <button
                @click="nextTechnicianPage"
                :disabled="currentTechnicianPage === totalTechnicianPages"
                class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 페이지네이션 -->
    <div
      class="hidden w-full px-4 py-3 md:flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="relative inline-flex md:hidden items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          이전
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex md:hidden items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          다음
        </button>
      </div>
      <div
        class="w-full flex justify-between items-center max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-between">
        <div class="block">
          <p class="text-sm text-gray-700">
            총 <span class="font-medium">{{ totalItems }}</span
            >개 예약
            <span class="font-medium">{{
              (currentPage - 1) * itemsPerPage + 1
            }}</span
            >-
            <span class="font-medium">{{
              Math.min(currentPage * itemsPerPage, totalItems)
            }}</span
            >개 표시
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="sr-only">이전</span>
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                currentPage === page
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              ]">
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="sr-only">다음</span>
              <i class="fas fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { reactive } from "vue";
import { format, addDays, subMonths } from "date-fns";
import SearchSelect from "./SearchSelect.vue";
import SearchDateSelect from "./SearchDateSelect.vue";
const date = ref("오늘");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");
// 기준일 선택
const dateOptions = [
  { value: "all", label: "전체" },
  { value: "오늘", label: "오늘" },
  { value: "일주일", label: "일주일" },
  { value: "한달", label: "한달" },
];
// 날짜선택

const item = ref({
  rangeType: "today",
  startDate: "2025-05-20",
  endDate: "2025-05-20",
});

const rangeOptions = [
  { value: "today", label: "오늘" },
  { value: "week", label: "일주일" },
  { value: "month", label: "한달" },
  { value: "all", label: "전체" },
];
// 픽업위치
const pickupOptions = [
  { value: "all", label: "전체" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];
// 담당지역선택
const areaOptions = [
  { value: "all", label: "전체" },
  { value: "gu1", label: "동구, 군위군" },
  { value: "gu2", label: "서구, 중구, 북구" },
  { value: "gu3", label: "중구, 수성구" },
  { value: "gu4", label: "달서구, 달성군" },
];

const statusOptions = [
  { value: "all", label: "전체" },
  { value: "waiting", label: "대기중" },
  { value: "assigned", label: "기사배정" },
  { value: "in_progress", label: "운반중" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

const formatDate = (date) => format(date, "yyyy-MM-dd");
const searchQuery = ref("");
const statusFilter = ref("all");
const sortBy = ref("date-desc");
const selectedReservation = ref(null);
const showCancelModal = ref(false);
const reservationToCancel = ref(null);

const items = reactive([
  {
    rangeType: "today",
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
  },
]);

const updateDateRange = (index) => {
  const item = items[index];
  const today = new Date();

  switch (item.rangeType) {
    case "today":
      item.startDate = formatDate(today);
      item.endDate = formatDate(today);
      break;
    case "week":
      item.startDate = formatDate(addDays(today, -7));
      item.endDate = formatDate(today);
      break;
    case "month":
      item.startDate = formatDate(subMonths(today, 1));
      item.endDate = formatDate(today);
      break;
    case "all":
      item.startDate = "";
      item.endDate = "";
      break;
  }
};
// 지역별 담당구역
const pickupArea = reactive([
  {
    atArea: "all",
  },
]);
// 지역별 담당구역
const workerArea = reactive([
  {
    dutyArea: "all",
  },
]);

// 기사 검색 관련 상태
const showTechnicianSearchModal = ref(false);
const technicianSearchFilters = ref({
  type: "all",
  settlementRate: "all",
  area: "all",
  keyword: "",
});

// 기사 목록 (실제로는 API에서 가져와야 함)
const technicians = ref([
  {
    id: 1,
    name: "김지훈",
    type: "executive",
    phone: "010-1111-2222",
    settlementRate: 80,
    area: "gu1",
  },
  {
    id: 2,
    name: "이수민",
    type: "employee",
    phone: "010-3333-4444",
    settlementRate: 75,
    area: "gu2",
  },
  {
    id: 3,
    name: "박서준",
    type: "executive",
    phone: "010-5555-6666",
    settlementRate: 85,
    area: "gu3",
  },
  {
    id: 4,
    name: "한예슬",
    type: "employee",
    phone: "010-7777-8888",
    settlementRate: 70,
    area: "gu4",
  },
  {
    id: 5,
    name: "정우성",
    type: "executive",
    phone: "010-9999-0000",
    settlementRate: 90,
    area: "gu1",
  },
  {
    id: 6,
    name: "김태희",
    type: "employee",
    phone: "010-2222-3333",
    settlementRate: 75,
    area: "gu2",
  },
  {
    id: 7,
    name: "이준호",
    type: "executive",
    phone: "010-4444-5555",
    settlementRate: 80,
    area: "gu3",
  },
  {
    id: 8,
    name: "유인나",
    type: "employee",
    phone: "010-6666-7777",
    settlementRate: 85,
    area: "gu4",
  },
  {
    id: 9,
    name: "이병헌",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu1",
  },
  {
    id: 10,
    name: "한가인",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu2",
  },
  {
    id: 11,
    name: "정해인",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu1",
  },
  {
    id: 12,
    name: "남주혁",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu4",
  },
  {
    id: 13,
    name: "송중기",
    type: "executive",
    phone: "010-8888-9999",
    settlementRate: 70,
    area: "gu2",
  },
  {
    id: 14,
    name: "고아라",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu3",
  },
  {
    id: 15,
    name: "전지현",
    type: "employee",
    phone: "010-0000-1111",
    settlementRate: 90,
    area: "gu4",
  },
]);

// 기사 페이지네이션 관련 상태
const currentTechnicianPage = ref(1);
const techniciansPerPage = ref(5);
const technicianSearch = ref("");

// 필터링된 기사 목록
const filteredTechnicians = computed(() => {
  return technicians.value.filter((tech) => {
    const matchesType =
      technicianSearchFilters.value.type === "all" ||
      tech.type === technicianSearchFilters.value.type;
    const matchesRate =
      technicianSearchFilters.value.settlementRate === "all" ||
      tech.settlementRate.toString() ===
        technicianSearchFilters.value.settlementRate;
    const matchesArea =
      technicianSearchFilters.value.area === "all" ||
      tech.area === technicianSearchFilters.value.area;
    const matchesKeyword =
      !technicianSearchFilters.value.keyword ||
      tech.name.includes(technicianSearchFilters.value.keyword) ||
      tech.phone.includes(technicianSearchFilters.value.keyword);

    return matchesType && matchesRate && matchesArea && matchesKeyword;
  });
});

// 페이지네이션 계산
const totalTechnicianPages = computed(() => {
  return Math.ceil(filteredTechnicians.value.length / techniciansPerPage.value);
});

const paginatedTechnicians = computed(() => {
  const start = (currentTechnicianPage.value - 1) * techniciansPerPage.value;
  const end = start + techniciansPerPage.value;
  return filteredTechnicians.value.slice(start, end);
});

// 페이지 이동 함수
const goToTechnicianPage = (page) => {
  if (page >= 1 && page <= totalTechnicianPages.value) {
    currentTechnicianPage.value = page;
  }
};

const nextTechnicianPage = () => {
  if (currentTechnicianPage.value < totalTechnicianPages.value) {
    currentTechnicianPage.value++;
  }
};

const prevTechnicianPage = () => {
  if (currentTechnicianPage.value > 1) {
    currentTechnicianPage.value--;
  }
};

// 기사 유형 텍스트 변환
const getTechnicianTypeText = (type) => {
  const typeMap = {
    executive: "임원",
    employee: "사원",
  };
  return typeMap[type] || type;
};

// 지역 텍스트 변환
const getAreaText = (area) => {
  const areaMap = {
    gu1: "동구, 군위군",
    gu2: "서구, 중구, 북구",
    gu3: "중구, 수성구",
    gu4: "달서구, 달성군",
  };
  return areaMap[area] || area;
};

// 기사 검색 모달 열기/닫기
const openTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeTechnicianSearchModal = () => {
  showTechnicianSearchModal.value = false;
  document.body.style.overflow = "";
};

// 기사 선택
const selectTechnician = (technician) => {
  selectedReservation.value.technician = technician;
  technicianSearch.value = technician.name;
  closeTechnicianSearchModal();
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!selectedReservation.value.photos) {
        selectedReservation.value.photos = [];
      }
      selectedReservation.value.photos.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = (index) => {
  selectedReservation.value.photos.splice(index, 1);
};

const saveReservation = () => {
  // 필수 항목 검증
  const requiredFields = [
    "status",
    "location",
    "customerName",
    "phone",
    "bagCount",
    "specialRequests",
    "preferredDateTime",
    "createdAt",
    "technician",
  ];

  const missingFields = requiredFields.filter(
    (field) => !selectedReservation.value[field]
  );

  if (missingFields.length > 0) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }

  // 저장 로직 구현
  console.log("저장된 예약 정보:", selectedReservation.value);
  closeModal();
};

const reservations = ref([
  {
    id: "#1001",
    customerName: "김철수",
    phone: "010-1234-1001",
    bagCount: "2",
    location: "대구공항",
    date: "2025-05-31",
    time: "10:00",
    status: "대기중",
    worker: "김지훈",
    specialRequests: "특별 취급 가방 1개 포함",
  },
  {
    id: "#1002",
    customerName: "박영희",
    phone: "010-1234-1002",
    bagCount: "3",
    location: "동대구역",
    date: "2025-06-01",
    time: "09:00",
    status: "운반중",
    worker: "이수민",
    specialRequests: "휠체어 포함",
  },
  {
    id: "#1003",
    customerName: "이민수",
    phone: "010-1234-1003",
    bagCount: "4",
    location: "서대구역",
    date: "2025-06-01",
    time: "13:00",
    status: "완료",
    worker: "박서준",
    specialRequests: "빠른 운반 요청",
  },
  {
    id: "#1004",
    customerName: "최지혜",
    phone: "010-1234-1004",
    bagCount: "1",
    location: "대구공항",
    date: "2025-06-02",
    time: "15:30",
    status: "대기중",
    worker: "한예슬",
    specialRequests: "",
  },
  {
    id: "#1005",
    customerName: "정유진",
    phone: "010-1234-1005",
    bagCount: "3",
    location: "동대구역",
    date: "2025-06-03",
    time: "08:00",
    status: "운반중",
    worker: "정우성",
    specialRequests: "고가 장비 포함",
  },
  {
    id: "#1006",
    customerName: "윤성호",
    phone: "010-1234-1006",
    bagCount: "5",
    location: "서대구역",
    date: "2025-06-03",
    time: "16:00",
    status: "완료",
    worker: "김태희",
    specialRequests: "유아용 카시트 포함",
  },
  {
    id: "#1007",
    customerName: "장하늘",
    phone: "010-1234-1007",
    bagCount: "1",
    location: "대구공항",
    date: "2025-06-04",
    time: "11:00",
    status: "대기중",
    worker: "이준호",
    specialRequests: "취급 주의: 깨지기 쉬움",
  },
  {
    id: "#1008",
    customerName: "백지원",
    phone: "010-1234-1008",
    bagCount: "2",
    location: "동대구역",
    date: "2025-06-05",
    time: "14:00",
    status: "운반중",
    worker: "유인나",
    specialRequests: "",
  },
  {
    id: "#1009",
    customerName: "오하영",
    phone: "010-1234-1009",
    bagCount: "1",
    location: "서대구역",
    date: "2025-06-05",
    time: "18:00",
    status: "완료",
    worker: "이병헌",
    specialRequests: "무거운 짐 주의",
  },
  {
    id: "#1010",
    customerName: "김영수",
    phone: "010-1234-1010",
    bagCount: "3",
    location: "대구공항",
    date: "2025-06-06",
    time: "09:30",
    status: "대기중",
    worker: "한가인",
    specialRequests: "냉장 보관 요청",
  },
  {
    id: "#1011",
    customerName: "송지은",
    phone: "010-1234-1011",
    bagCount: "2",
    location: "동대구역",
    date: "2025-06-06",
    time: "12:00",
    status: "운반중",
    worker: "정해인",
    specialRequests: "",
  },
  {
    id: "#1012",
    customerName: "노현우",
    phone: "010-1234-1012",
    bagCount: "1",
    location: "서대구역",
    date: "2025-06-07",
    time: "10:00",
    status: "완료",
    worker: "고아라",
    specialRequests: "고가 장비 포함",
  },
  {
    id: "#1013",
    customerName: "황지민",
    phone: "010-1234-1013",
    bagCount: "6",
    location: "대구공항",
    date: "2025-06-08",
    time: "08:30",
    status: "대기중",
    worker: "남주혁",
    specialRequests: "대형 가방 2개 포함",
  },
  {
    id: "#1014",
    customerName: "배진수",
    phone: "010-1234-1014",
    bagCount: "2",
    location: "동대구역",
    date: "2025-06-08",
    time: "14:30",
    status: "운반중",
    worker: "전지현",
    specialRequests: "",
  },
  {
    id: "#1015",
    customerName: "이선호",
    phone: "010-1234-1015",
    bagCount: "1",
    location: "서대구역",
    date: "2025-06-09",
    time: "16:30",
    status: "완료",
    worker: "송중기",
    specialRequests: "",
  },
  {
    id: "#1016",
    customerName: "조은비",
    phone: "010-1234-1016",
    bagCount: "2",
    location: "대구공항",
    date: "2025-06-10",
    time: "11:15",
    status: "대기중",
    worker: "김지훈",
    specialRequests: "우산 포함",
  },
  {
    id: "#1017",
    customerName: "구본혁",
    phone: "010-1234-1017",
    bagCount: "1",
    location: "동대구역",
    date: "2025-06-10",
    time: "13:45",
    status: "운반중",
    worker: "이수민",
    specialRequests: "",
  },
  {
    id: "#1018",
    customerName: "임하늘",
    phone: "010-1234-1018",
    bagCount: "1",
    location: "서대구역",
    date: "2025-06-11",
    time: "10:45",
    status: "완료",
    worker: "박서준",
    specialRequests: "",
  },
  {
    id: "#1019",
    customerName: "양진아",
    phone: "010-1234-1019",
    bagCount: "2",
    location: "대구공항",
    date: "2025-06-11",
    time: "15:00",
    status: "대기중",
    worker: "한예슬",
    specialRequests: "우산 포함",
  },
  {
    id: "#1020",
    customerName: "최은석",
    phone: "010-1234-1020",
    bagCount: "3",
    location: "동대구역",
    date: "2025-06-12",
    time: "09:00",
    status: "운반중",
    worker: "정우성",
    specialRequests: "",
  },
  {
    id: "#1021",
    customerName: "문지호",
    phone: "010-1234-1021",
    bagCount: "2",
    location: "서대구역",
    date: "2025-06-13",
    time: "10:30",
    status: "완료",
    worker: "김태희",
    specialRequests: "냉장 보관 요청",
  },
  {
    id: "#1022",
    customerName: "이경아",
    phone: "010-1234-1022",
    bagCount: "3",
    location: "대구공항",
    date: "2025-06-14",
    time: "12:30",
    status: "대기중",
    worker: "이준호",
    specialRequests: "특별 취급 가방 1개 포함",
  },
  {
    id: "#1023",
    customerName: "홍기훈",
    phone: "010-1234-1023",
    bagCount: "4",
    location: "동대구역",
    date: "2025-06-15",
    time: "14:15",
    status: "운반중",
    worker: "유인나",
    specialRequests: "",
  },
  {
    id: "#1024",
    customerName: "강지민",
    phone: "010-1234-1024",
    bagCount: "5",
    location: "서대구역",
    date: "2025-06-15",
    time: "17:00",
    status: "완료",
    worker: "이병헌",
    specialRequests: "대형 가방 2개 포함",
  },
  {
    id: "#1025",
    customerName: "조윤서",
    phone: "010-1234-1025",
    bagCount: "1",
    location: "대구공항",
    date: "2025-06-16",
    time: "10:00",
    status: "대기중",
    worker: "한가인",
    specialRequests: "",
  },
]);

// 페이지네이션 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(25);

// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / itemsPerPage.value);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const pagedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return reservations.value.slice(start, end);
});

const filteredReservations = computed(() => {
  let result = [...reservations.value];

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (r) =>
        r.user.toLowerCase().includes(query) || r.id.toString().includes(query)
    );
  }

  // 상태 필터링
  if (statusFilter.value !== "all") {
    result = result.filter((r) => r.status === statusFilter.value);
  }

  // 정렬
  switch (sortBy.value) {
    case "date-asc":
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "name-asc":
      result.sort((a, b) => a.user.localeCompare(b.user));
      break;
  }

  return result;
});

// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString("ko-KR", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     weekday: "long",
//   });
// };

const getStatusText = (status) => {
  const statusMap = {
    waiting: "대기중",
    assigned: "기사배정",
    in_progress: "운반중",
    completed: "완료",
    cancelled: "취소",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    대기중: "bg-yellow-100 text-yellow-800",
    운반중: "bg-blue-100 text-blue-800",
    완료: "bg-green-100 text-green-800",
    취소: "bg-red-100 text-red-800",
    기사배정: "bg-purple-100 text-purple-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const showReservationDetails = (reservation) => {
  // 기존 예약 데이터를 복사하여 새로운 객체 생성
  selectedReservation.value = {
    ...reservation,
    // 기본값 설정
    cafeName: reservation.cafeName || "",
    businessNumber: reservation.businessNumber || "",
    modelName: reservation.modelName || "",
    estimatedPrice: reservation.estimatedPrice || "",
    createdAt: reservation.createdAt || new Date().toISOString().slice(0, 16),
    preferredDateTime:
      reservation.preferredDateTime || new Date().toISOString().slice(0, 16),
    photos: reservation.photos || [],
    requirements: reservation.requirements || "",
    memo: reservation.memo || "",
    technician: reservation.technician || null,
  };

  // 모달이 즉시 표시되도록 함
  nextTick(() => {
    document.body.style.overflow = "hidden";
  });
};

const closeModal = () => {
  selectedReservation.value = null;
  document.body.style.overflow = "";
};

const confirmCancel = (reservation) => {
  reservationToCancel.value = reservation;
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
  reservationToCancel.value = null;
};

const cancelReservation = () => {
  if (reservationToCancel.value) {
    const index = reservations.value.findIndex(
      (r) => r.id === reservationToCancel.value.id
    );
    if (index !== -1) {
      reservations.value[index].status = "cancelled";
    }
  }
  closeCancelModal();
};

// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value;
}
</script>

<style lang="scss" scoped></style>
