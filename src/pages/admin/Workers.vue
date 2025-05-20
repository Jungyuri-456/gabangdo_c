<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">기사 관리</h1>
        <p class="text-sm text-gray-500 mt-1">
          기사 정보를 관리하고 상태를 확인할 수 있습니다.
        </p>
      </div>
      <button
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
        <i class="fas fa-plus mr-2"></i>기사 추가
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-user-tie text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">전체 기사</h3>
            <p class="text-2xl font-semibold text-gray-800">
              {{ totalWorkers }}
            </p>
            <span class="text-sm text-green-600">+3명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-check-circle text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">활동중</h3>
            <p class="text-2xl font-semibold text-gray-800">4명</p>
            <span class="text-sm text-green-600">+1명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-star text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">평균 평점</h3>
            <p class="text-2xl font-semibold text-gray-800">4.6</p>
            <span class="text-sm text-green-600">+0.1</span>
          </div>
        </div>
      </div>
    </div>
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

    <!-- 검색 및 필터 -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              placeholder="기사명 또는 연락처로 검색..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">상태 필터</option>
            <option value="active">활동중</option>
            <option value="inactive">비활성화</option>
          </select>
          <select
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">평점 필터</option>
            <option value="4">4점 이상</option>
            <option value="3">3점 이상</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 기사 목록 -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">기사 목록</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                기사ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                평점
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                담당예약
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="worker in paginatedWorkers"
              :key="worker.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1">
                    <i class="fas fa-star"></i>
                  </span>
                  {{ worker.rating }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(worker.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ worker.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ worker.reservations }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="showWorkerDetails(worker)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3">
                  <i class="fas fa-eye mr-1"></i>상세
                </button>
                <button class="text-yellow-600 hover:text-yellow-900 mr-3">
                  <i class="fas fa-edit mr-1"></i>수정
                </button>
                <button class="text-red-600 hover:text-red-900">
                  <i class="fas fa-ban mr-1"></i>비활성화
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      class="flex justify-between items-center bg-white rounded-lg shadow p-4">
     <div
          class="w-full flex justify-between  items-center  max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-between">
          <div class="block">
            <p class="text-sm text-gray-700">
              총 <span class="font-medium">{{ totalItems }}</span
              >명 중
              <span 
              class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
              }}</span
              >-
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, totalItems)
              }}</span
              >개 표시
            </p>
          </div>         
        </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="px-3 py-1 border rounded"
          :class="[
            currentPage === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 hover:bg-gray-50',
          ]">
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 기사 상세 모달 -->
    <div
      v-if="selectedWorker"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop>
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">기사 상세 정보</h3>
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
                      >기사ID</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.id
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >이름</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.name
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >연락처</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.phone
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >평점</label
                    >
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">
                        <i class="fas fa-star"></i>
                      </span>
                      <span class="text-sm text-gray-900">{{
                        selectedWorker.rating
                      }}</span>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >상태</label
                    >
                    <span
                      :class="getStatusClass(selectedWorker.status)"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ selectedWorker.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 담당 예약 정보 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  담당 예약
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >현재 예약</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.reservations
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >총 예약</label
                    >
                    <span class="text-sm text-gray-900">15건</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 추가 정보 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  활동 정보
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >가입일</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.joinDate
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >마지막 활동</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.lastActivity
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >활동 지역</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedWorker.area
                    }}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">메모</h4>
                <textarea
                  v-model="selectedWorker.memo"
                  rows="3"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="기사에 대한 메모를 입력하세요"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            닫기
          </button>
          <button
            @click="saveWorker"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const totalWorkers = ref(15);
// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(15);
const selectedWorker = ref(null);

const workers = ref([
  { id: "#C001", name: "김지훈", phone: "010-1234-5678", rating: 4.8, status: "활동중", reservations: "2건", memo: "", joinDate: "2024-01-15", lastActivity: "2025-05-15", area: "서울, 경기" },
  { id: "#C002", name: "이수민", phone: "010-8765-4321", rating: 4.5, status: "활동중", reservations: "1건", memo: "", joinDate: "2024-01-20", lastActivity: "2025-05-14", area: "인천" },
  { id: "#C003", name: "박서준", phone: "010-5555-6666", rating: 4.2, status: "비활성화", reservations: "0건", memo: "", joinDate: "2024-01-25", lastActivity: "2025-04-20", area: "부산" },
  { id: "#C004", name: "한예슬", phone: "010-7777-8888", rating: 4.9, status: "활동중", reservations: "3건", memo: "", joinDate: "2024-02-01", lastActivity: "2025-05-18", area: "서울" },
  { id: "#C005", name: "정우성", phone: "010-9999-0000", rating: 4.6, status: "활동중", reservations: "1건", memo: "", joinDate: "2024-02-05", lastActivity: "2025-05-10", area: "경기" },
  { id: "#C006", name: "김태희", phone: "010-1111-2222", rating: 4.7, status: "활동중", reservations: "2건", memo: "", joinDate: "2024-02-10", lastActivity: "2025-05-09", area: "서울, 인천" },
  { id: "#C007", name: "이준호", phone: "010-3333-4444", rating: 4.4, status: "활동중", reservations: "1건", memo: "", joinDate: "2024-02-15", lastActivity: "2025-05-08", area: "경기" },
  { id: "#C008", name: "유인나", phone: "010-5555-7777", rating: 4.8, status: "활동중", reservations: "3건", memo: "", joinDate: "2024-02-20", lastActivity: "2025-05-07", area: "서울" },
  { id: "#C009", name: "이병헌", phone: "010-7777-9999", rating: 4.3, status: "비활성화", reservations: "0건", memo: "", joinDate: "2024-02-25", lastActivity: "2025-04-15", area: "부산" },
  { id: "#C010", name: "한가인", phone: "010-9999-1111", rating: 4.9, status: "활동중", reservations: "2건", memo: "", joinDate: "2024-03-01", lastActivity: "2025-05-06", area: "서울, 경기" },
  { id: "#C011", name: "정해인", phone: "010-2222-3333", rating: 4.5, status: "활동중", reservations: "1건", memo: "", joinDate: "2024-03-05", lastActivity: "2025-05-05", area: "인천" },
  { id: "#C012", name: "고아라", phone: "010-4444-5555", rating: 4.7, status: "활동중", reservations: "2건", memo: "", joinDate: "2024-03-10", lastActivity: "2025-05-04", area: "서울" },
  { id: "#C013", name: "남주혁", phone: "010-6666-7777", rating: 4.2, status: "비활성화", reservations: "0건", memo: "", joinDate: "2024-03-15", lastActivity: "2025-04-18", area: "부산" },
  { id: "#C014", name: "전지현", phone: "010-8888-9999", rating: 4.8, status: "활동중", reservations: "3건", memo: "", joinDate: "2024-03-20", lastActivity: "2025-05-03", area: "서울, 경기" },
  { id: "#C015", name: "송중기", phone: "010-0000-1111", rating: 4.6, status: "활동중", reservations: "1건", memo: "", joinDate: "2024-03-25", lastActivity: "2025-05-02", area: "인천" },
]);


// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(workers.value.length / itemsPerPage.value);
});

const paginatedWorkers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return workers.value.slice(start, end);
});

// 페이지 이동 함수
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

const getStatusClass = (status) => {
  const statusClasses = {
    활동중: "bg-green-100 text-green-800",
    비활성화: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

// 기사 상세 모달 관련 함수
const showWorkerDetails = (worker) => {
  selectedWorker.value = { ...worker };
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedWorker.value = null;
  document.body.style.overflow = "";
};

const saveWorker = () => {
  // 저장 로직 구현
  console.log("저장된 기사 정보:", selectedWorker.value);
  closeModal();
};
</script>
