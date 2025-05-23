<template>
  <!-- 기사 목록 -->
  <div class="bg-white rounded-lg shadow dark:bg-gray-600">
    <div class="p-4 pb-0 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
        기사 목록
      </h2>
    </div>
    <!-- 검색 select바 -->
    <div 
      class="p-4 py-6 font-light text-gray-500 dark:text-black text-sm border-b border-gray-200 flex flex-col md:flex-row gap-4">
      <div
        class="flex flex-wrap md:flex-row justify-center md:justify-start gap-2 items-center">
        <!-- 날짜 시작 끝 선택 -->
        <DateRangePicker
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate" />
        <!-- 날짜 선택 일일이 선택 -->
        <SearchDateSelect
          class="p-2"
          v-model="item.rangeType"
          v-model:startDate="item.startDate"
          v-model:endDate="item.endDate" />
        <!-- 오늘/주/한달 선택  -->
        <SearchSelect
          v-model="date"
          :options="dateOptions"
          class="block max-[1010px]:hidden" />
        <SearchSelect v-model="pickup" :options="pickupOptions" />
        <SearchSelect v-model="area" :options="areaOptions" />
        <SearchSelect v-model="status" :options="statusOptions" />
        <button
          class="px-4 py-1 bg-indigo-600 dark:bg-indigo-300 text-white dark:text-black rounded-md hover:bg-indigo-700">
          검색
        </button>
      </div>
    </div>
    <!-- 기사 data -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr class="allpadding">
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
              상태
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              예약
            </th>
            <th
              class="w-[90px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              액션
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="worker in paginatedWorkers"
            :key="worker.id"
            class="hover:bg-gray-50 allpadding">
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
                  <i class="max-[1090px]:hidden fas fa-star"></i>
                </span>
                {{ worker.rating }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="getStatusClass(worker.status)"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-xl">
                {{ worker.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ worker.reservations }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="relative group inline-block mr-3">
                <button
                  @click="showWorkerDetails(worker)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3">
                  <i class="fas fa-eye mr-1"></i>
                  <span class="max-[1090px]:hidden">상세</span>
                </button>
                <!-- 툴팁 호버시 보임 -->
                <div
                  class="hidden max-[1090px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10">
                  상세보기
                </div>
              </div>
              <!-- 수정 -->
              <div class="relative group inline-block mr-3">
                <button class="text-yellow-600 hover:text-yellow-900">
                  <i class="fas fa-edit mr-1"></i>
                  <span class="max-[1090px]:hidden">수정</span>
                </button>
                <!-- 툴팁 호버시 보임 -->
                <div
                  class="hidden max-[1090px]:group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/70 text-white text-xs z-10">
                  수정클릭
                </div>
              </div>

              <!-- 대기중/활동중 -->
              <div
                @click="activeStatus(worker)"
                class="relative group inline-block">
                <button
                  :class="[
                    'px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-xl',
                    worker.status === '대기중'
                      ? 'text-green-600 hover:text-green-600'
                      : 'text-red-600 hover:text-red-900',
                  ]">
                  <i class="fas fa-ban mr-1"></i>
                  <span class="max-[1090px]:hidden">{{
                    worker.status === "대기중" ? "활동중" : "대기중"
                  }}</span>
                </button>

                <!-- 툴팁: 호버시만 보임 -->
                <div
                  class="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 rounded bg-black/80 text-white text-xs z-10">
                  <span
                    :class="[
                      worker.status === '대기중'
                        ? 'text-red-600 hover:text-red-900'
                        : 'text-green-600 hover:text-green-600',
                    ]">
                    {{ worker.status === "대기중" ? "활동중지" : "활동클릭" }}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 페이지네이션 -->
      <div
        class="flex justify-between items-center bg-white rounded-lg shadow p-4 px-6 dark:bg-gray-600">
        <div
          class="w-full flex justify-between items-center max-[768px]:flex-1 max-[768px]:flex max-[768px]:items-center max-[768px]:justify-between">
          <div class="block">
            <p class="text-sm text-gray-700 dark:text-white">
              총 <span class="font-medium">{{ totalItems }}</span
              >명 중
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
        </div>
        <div class="flex gap-2 dark:text-white">
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
                : 'border-gray-300  text-gray-500 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-700',
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
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 기본 정보 -->
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-medium text-gray-500 mb-2">기본 정보</h4>
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
              <h4 class="text-sm font-medium text-gray-500 mb-2">담당 예약</h4>
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
              <h4 class="text-sm font-medium text-gray-500 mb-2">활동 정보</h4>
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
</template>

<script setup>
import SearchDateSelect from "./SearchDateSelect.vue";
import SearchSelect from "./SearchSelect.vue";
import { ref, computed, onMounted } from "vue";

const selectedWorker = ref(null);
const addWorker = ref(null);

// 기사
const workers = ref([
  {
    id: "#C001",
    name: "김지훈",
    phone: "010-1234-5678",
    phone1: "1234-5678",
    rating: 4.8,
    status: "활동중",
    reservations: "11건",
    memo: "",
    joinDate: "2024-01-15",
    lastActivity: "2025-05-15",
    area: "동구, 군위군",
    areaGroup: "gu1",
  },
  {
    id: "#C002",
    name: "이수민",
    phone: "010-8765-4321",
    phone1: "8765-4321",
    rating: 4.5,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-01-20",
    lastActivity: "2025-05-14",
    area: "서구, 중구, 북구",
    areaGroup: "gu2",
  },
  {
    id: "#C003",
    name: "박서준",
    phone: "010-5555-6666",
    phone1: "5555-6666",
    rating: 4.2,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-01-25",
    lastActivity: "2025-04-20",
    area: "중구, 수성구",
    areaGroup: "gu3",
  },
  {
    id: "#C004",
    name: "한예슬",
    phone: "010-7777-8888",
    phone1: "7777-8888",
    rating: 4.9,
    status: "활동중",
    reservations: "11건",
    memo: "",
    joinDate: "2024-02-01",
    lastActivity: "2025-05-18",
    area: "달서구, 달성군",
    areaGroup: "gu4",
  },
  {
    id: "#C005",
    name: "정우성",
    phone: "010-9999-0000",
    phone1: "9999-0000",
    rating: 4.6,
    status: "활동중",
    reservations: "9건",
    memo: "",
    joinDate: "2024-02-05",
    lastActivity: "2025-05-10",
    area: "동구, 군위군",
    areaGroup: "gu1",
  },
  {
    id: "#C006",
    name: "김태희",
    phone: "010-1111-2222",
    phone1: "1111-2222",
    rating: 4.7,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-02-10",
    lastActivity: "2025-05-09",
    area: "서구, 중구, 북구",
    areaGroup: "gu2",
  },
  {
    id: "#C007",
    name: "이준호",
    phone: "010-3333-4444",
    phone1: "3333-4444",
    rating: 4.4,
    status: "활동중",
    reservations: "9건",
    memo: "",
    joinDate: "2024-02-15",
    lastActivity: "2025-05-08",
    area: "중구, 수성구",
    areaGroup: "gu3",
  },
  {
    id: "#C008",
    name: "유인나",
    phone: "010-5555-7777",
    phone1: "5555-7777",
    rating: 4.8,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-02-20",
    lastActivity: "2025-05-07",
    area: "달서구, 달성군",
    areaGroup: "gu4",
  },
  {
    id: "#C009",
    name: "이병헌",
    phone: "010-7777-9999",
    phone1: "7777-9999",
    rating: 4.3,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-02-25",
    lastActivity: "2025-04-15",
    area: "동구, 군위군",
    areaGroup: "gu1",
  },
  {
    id: "#C010",
    name: "한가인",
    phone: "010-9999-1111",
    phone1: "9999-1111",
    rating: 4.9,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-01",
    lastActivity: "2025-05-06",
    area: "서구, 중구, 북구",
    areaGroup: "gu2",
  },
  {
    id: "#C011",
    name: "정해인",
    phone: "010-2222-3333",
    phone1: "2222-3333",
    rating: 4.5,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-05",
    lastActivity: "2025-05-05",
    area: "중구, 수성구",
    areaGroup: "gu3",
  },
  {
    id: "#C012",
    name: "고아라",
    phone: "010-4444-5555",
    phone1: "4444-5555",
    rating: 4.7,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-10",
    lastActivity: "2025-05-04",
    area: "달서구, 달성군",
    areaGroup: "gu4",
  },
  {
    id: "#C013",
    name: "남주혁",
    phone: "010-6666-7777",
    phone1: "6666-7777",
    rating: 4.2,
    status: "대기중",
    reservations: "0건",
    memo: "",
    joinDate: "2024-03-15",
    lastActivity: "2025-04-18",
    area: "동구, 군위군",
    areaGroup: "gu1",
  },
  {
    id: "#C014",
    name: "전지현",
    phone: "010-8888-9999",
    phone1: "8888-9999",
    rating: 4.8,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-20",
    lastActivity: "2025-05-03",
    area: "서구, 중구, 북구",
    areaGroup: "gu2",
  },
  {
    id: "#C015",
    name: "송중기",
    phone: "010-0000-1111",
    phone1: "0000-1111",
    rating: 4.6,
    status: "활동중",
    reservations: "10건",
    memo: "",
    joinDate: "2024-03-25",
    lastActivity: "2025-05-02",
    area: "중구, 수성구",
    areaGroup: "gu3",
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

// 반응형 전화번호 표시
const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  windowWidth.value = window.innerWidth;
});

// 필터 데이터
const item = ref({
  startDate: "",
  endDate: "",
  rangeType: "all", // 'all' | 'today' | 'week' | 'month'
});
// 날짜
const date = ref("오늘");
const pickup = ref("all");
const area = ref("all");
const status = ref("all");

// 필터 옵션
const dateOptions = [
  { value: "all", label: "전체" },
  { value: "today", label: "오늘" },
  { value: "week", label: "이번주" },
  { value: "month", label: "이번달" },
];
const pickupOptions = [
  { value: "all", label: "픽업위치" },
  { value: "대구공항", label: "대구공항" },
  { value: "동대구역", label: "동대구역" },
  { value: "서대구역", label: "서대구역" },
];
const areaOptions = [
  { value: "all", label: "담당구역" },
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

// 상태값 매핑
const statusMap = {
  waiting: "대기중",
  assigned: "기사배정",
  in_progress: "운반중",
  completed: "완료",
  cancelled: "취소",
};

// 상태별 색상 클래스 리턴
function getStatusClass(status) {
  switch (status) {
    case "대기중":
      return "bg-green-100 text-green-700";
    case "기사배정":
      return "bg-indigo-100 text-indigo-700";
    case "운반중":
      return "bg-yellow-100 text-yellow-700";
    case "완료":
      return "bg-blue-100 text-blue-700";
    case "취소":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// 필터링된 workers
const filteredWorkers = computed(() => {
  return workers.value.filter((worker) => {
    // 날짜 필터링 (lastActivity 기준)
    if (
      item.value.rangeType !== "all" &&
      item.value.startDate &&
      item.value.endDate
    ) {
      const workerDate = new Date(worker.lastActivity);
      const start = new Date(item.value.startDate);
      const end = new Date(item.value.endDate);
      if (workerDate < start || workerDate > end) {
        return false;
      }
    }

    // 픽업 위치 필터링 (area 필드에 포함되어 있는지 체크)
    if (pickup.value !== "all" && !worker.area.includes(pickup.value)) {
      return false;
    }

    // 담당 지역 필터링
    if (area.value !== "all") {
      if (
        area.value === "gu1" &&
        !["동구", "군위군"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu2" &&
        !["서구", "중구", "북구"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu3" &&
        !["중구", "수성구"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
      if (
        area.value === "gu4" &&
        !["달서구", "달성군"].some((loc) => worker.area.includes(loc))
      ) {
        return false;
      }
    }

    // 상태 필터링
    if (status.value !== "all") {
      if (worker.status !== statusMap[status.value]) {
        return false;
      }
    }

    return true;
  });
});

// 페이지네이션
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() =>
  Math.ceil(filteredWorkers.value.length / itemsPerPage.value)
);
const paginatedWorkers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredWorkers.value.slice(start, start + itemsPerPage.value);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function goToPage(page) {
  currentPage.value = page;
}

// 검색 버튼 클릭 시 페이지 초기화
function onSearch() {
  currentPage.value = 1;
}

// 기사 상태 토글: 대기중 ↔ 활동중(기사배정)
const activeStatus = (worker) => {
  const index = workers.value.findIndex((w) => w.id === worker.id);
  if (index !== -1) {
    const currentStatus = workers.value[index].status;
    workers.value[index].status =
      currentStatus === "대기중" ? "활동중" : "대기중";
  }
};

// 기사 추가 모달 관련 함수
const isAddModalOpen = ref(false);
const openAddModal = () => {
  isAddModalOpen.value = true;
  addWorker.value = {
    id: "",
    name: "",
    phone: "",
    rating: 0,
    status: "활동중",
    reservations: "0건",
    memo: "",
    joinDate: new Date().toISOString().split("T")[0],
    lastActivity: "",
    area: "",
  };
  document.body.style.overflow = "hidden";
};

const profileImage = ref("/images/people1.png");
const showImageModal = ref(false);
const driverName = ref("");
const driverPhone = ref("");
const driverEmail = ref("");
const vehicleInfo = ref("");
const isEditing = ref(true);
const imagePreview = ref(null);
const fileInput = ref(null);
const averageRating = ref(4.8);
// 이미지 업로드 모달 열기
const uploadImage = () => {
  showImageModal.value = true;
};
// 이미지 모달 닫기
const closeImageModal = () => {
  showImageModal.value = false;
};
// 파일선택 다이얼로그 트리거
// 숨겨진 파일 입력 요소를 클릭하여 파일 선택 창 열기
const triggerFileInput = () => {
  fileInput.value.click();
};
// /선택된 이미지 파일을 base64형식으로 변환하여 미리보기 표기
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
      return;
    }

    // 이미지 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
// 프로필 이미지 저장
const saveImage = () => {
  if (imagePreview.value) {
    profileImage.value = imagePreview.value;
  }
  closeImageModal();
};
// 프로필 수정 모드 시작
const startEditing = () => {
  isEditing.value = true;
};
const saveProfile = () => {
  // 실제 API 호출 로직 추가 예정
  const profile = {
    name: driverName.value,
    phone: driverPhone.value,
    email: driverEmail.value,
    vehicle: vehicleInfo.value,
  };
  alert(
    `프로필 저장 완료 :이름 : ${profile.name}전화번호 : ${profile.phone} 이메일:${profile.email} 차랑종류:${profile.vehicle}`
  );
  isEditing.value = false;
};
const cancelEditing = () => {
  driverName.value = oring.value.name;
  driverPhone.value = oring.value.phone;
  driverEmail.value = oring.value.email;
  vehicleInfo.value = oring.value.vehicle;
  isEditing.value = false;
};
const oring = ref({
  name: driverName.value,
  phone: driverPhone.value,
  email: driverEmail.value,
  vehicle: vehicleInfo.value,
});

// 기사 상세 모달 관련 함수
const showWorkerDetails = (worker) => {
  addWorker.value = { ...worker };
  document.body.style.overflow = "hidden";
  selectedWorker.value = { ...worker };
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedWorker.value = null;
  addWorker.value = null;
  isAddModalOpen.value = false;
  document.body.style.overflow = "";
};

const saveWorker = () => {
  // 저장 로직 구현
  console.log("저장된 기사 정보:", addWorker.value);
  console.log("저장된 기사 정보:", selectedWorker.value);
  closeModal();
};
</script>

<style scoped>
.allpadding {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
@media screen and (max-width: 1010px) {
  .cardtxt {
    margin-left: 0px !important;
    text-align: center;
  }
  th {
    padding-left: 5px;
    padding-right: 5px;
  }
  td {
    padding-left: 5px;
    padding-right: 5px;
  }
}

</style>
