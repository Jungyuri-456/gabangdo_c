<template>
  <div
    class="space-y-4 md:space-y-6 p-4 md:p-6 rounded-lg bg-slate-200 shadow-sm">
    <!-- 페이지 헤더 -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-800">
          나의 청소 예약 리스트
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          청소 예약 현황과 일정을 확인할 수 있습니다.
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <div class="relative w-full md:w-64">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleInput"
            placeholder="고객명 또는 주소로 검색"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white" />
          <i
            class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <select
          v-model="statusFilter"
          class="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
          <option value="all">전체 상태</option>
          <option value="예약대기">예약대기</option>
          <option value="청소중">청소중</option>
          <option value="완료">완료</option>
        </select>
      </div>
    </div>
    <!-- 배송목록 -->
    <div class="bg-white rounded-lg shadow-sm">
      <!-- 모바일 카드 뷰 -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="item in filteredDeliveries"
          :key="item.id"
          class="bg-white border rounded-lg p-4 space-y-4 hover:bg-gray-50 transition-all duration-200">
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getStatusClass(item.status),
                ]">
                <i :class="getStatusIcon(item.status)" class="mr-1"></i>
                {{ item.status }}
              </span>
              <div class="text-sm font-medium text-gray-900">
                예약번호: {{ item.id }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-900">{{ item.datetime }}</div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-900">
              <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
              {{ item.customer }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-phone text-gray-400 mr-2"></i>
              {{ item.phone }}
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-500">
              <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              주소: {{ item.address }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-snowflake text-gray-400 mr-2"></i>
              제빙기 모델: {{ item.model }}
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-calendar-alt text-gray-400 mr-2"></i>
              청소주기: {{ item.cycle }}개월
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <button
              v-if="item.status === '예약대기'"
              @click="updateStatus(item, '청소중')"
              class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              <i class="fas fa-play mr-1"></i>청소 시작
            </button>
            <button
              v-else-if="item.status === '청소중'"
              @click="updateStatus(item, '완료')"
              class="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
              <i class="fas fa-check mr-1"></i>청소 완료
            </button>
            <span
              v-else
              class="flex-1 px-3 py-1.5 text-gray-500 flex items-center justify-center">
              <i class="fas fa-check-circle text-green-500 mr-1"></i>
              완료
            </span>
          </div>
        </div>
      </div>
      <!-- 데스크톱 테이블 뷰 -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
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
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                주소
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제빙기 모델
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                청소주기
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
                처리
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="item in filteredDeliveries"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors duration-200">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <i class="fas fa-user-circle text-indigo-500 mr-2"></i>
                  {{ item.customer }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-phone text-gray-400 mr-2"></i>
                  {{ item.phone }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  {{ item.address }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-truck text-gray-400 mr-2"></i>
                  {{ item.model }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="fas fa-box text-gray-400 mr-2"></i>
                  {{ item.cycle }}개월
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <i class="far fa-calendar-alt text-gray-400 mr-2"></i>
                  {{ item.datetime }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusClass(item.status),
                  ]">
                  <i :class="getStatusIcon(item.status)" class="mr-1"></i>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  v-if="item.status === '예약대기'"
                  @click="updateStatus(item, '청소중')"
                  class="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                  <i class="fas fa-play"></i>
                  청소 시작
                </button>
                <button
                  v-else-if="item.status === '청소중'"
                  @click="updateStatus(item, '완료')"
                  class="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
                  <i class="fas fa-check"></i>
                  청소 완료
                </button>
                <span v-else class="text-gray-500 flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-500"></i>
                  완료
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
const searchQuery = ref("");
const statusFilter = ref("all");
// 예약 데이터 배열 (myDeliveries)
const myDeliveries = ref([
  // ref로 배열을 감싸서 반응형 데이터로 사용
  {
    id: "C123",
    customer: "홍길동",
    phone: "010-1234-5678",
    address: "서울시 강남구 역삼동 123-45",
    model: "ICE-2000",
    cycle: 3,
    datetime: "2025-04-10 10:00",
    status: "예약대기",
  },
  {
    id: "C124",
    customer: "김영희",
    phone: "010-9876-5432",
    address: "서울시 서초구 서초동 456-78",
    model: "ICE-3000",
    cycle: 6,
    datetime: "2025-04-10 12:30",
    status: "청소중",
  },
  {
    id: "C125",
    customer: "박준형",
    phone: "010-1111-2222",
    address: "서울시 송파구 잠실동 789-12",
    model: "ICE-1500",
    cycle: 3,
    datetime: "2025-04-11 09:00",
    status: "완료",
  },
  {
    id: "C126",
    customer: "이하늘",
    phone: "010-3333-4444",
    address: "서울시 마포구 합정동 345-67",
    model: "ICE-2500",
    cycle: 6,
    datetime: "2025-04-11 15:00",
    status: "예약대기",
  },
  {
    id: "C127",
    customer: "정지원",
    phone: "010-5555-6666",
    address: "서울시 용산구 이태원동 890-12",
    model: "ICE-4000",
    cycle: 3,
    datetime: "2025-04-12 07:30",
    status: "청소중",
  },
  {
    id: "C128",
    customer: "최민수",
    phone: "010-7777-8888",
    address: "서울시 종로구 인사동 234-56",
    model: "ICE-1800",
    cycle: 6,
    datetime: "2025-04-12 10:00",
    status: "완료",
  },
  {
    id: "C129",
    customer: "한예슬",
    phone: "010-9999-0000",
    address: "서울시 중구 명동 567-89",
    model: "ICE-2200",
    cycle: 3,
    datetime: "2025-04-13 09:00",
    status: "청소중",
  },
  {
    id: "C130",
    customer: "장민호",
    phone: "010-8888-7777",
    address: "서울시 강서구 화곡동 123-45",
    model: "ICE-3500",
    cycle: 6,
    datetime: "2025-04-13 13:30",
    status: "예약대기",
  },
  {
    id: "C131",
    customer: "송지효",
    phone: "010-6666-5555",
    address: "서울시 동작구 상도동 678-90",
    model: "ICE-2800",
    cycle: 3,
    datetime: "2025-04-14 08:45",
    status: "완료",
  },
  {
    id: "C132",
    customer: "김수현",
    phone: "010-4444-3333",
    address: "서울시 성북구 안암동 345-67",
    model: "ICE-3200",
    cycle: 6,
    datetime: "2025-04-14 10:15",
    status: "청소중",
  },
]);
// 검색어 및 상태 필터링 처리
const filteredDeliveries = computed(() => {
  let result = [...myDeliveries.value];
  //   검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase(); //대문자를 소문자로 변환
    result = result.filter(
      (item) =>
        item.customer.toLowerCase().includes(query) || //고객명에 검색어 포함
        item.address.toLowerCase().includes(query) // 주소에 검색어 포함
    );
  }
  // 상태 필터링
  if (statusFilter.value !== "all") {
    result = result.filter((item) => item.status === statusFilter.value);
  }
  return result;
});
// 한글이슈
function handleInput(event) {
  searchQuery.value = event.target.value; //입력된 값을 searchQuery에 반영
}
// 상태에 맞는 css적용
const getStatusClass = (status) => {
  const statusClasses = {
    // 상태별 클래스 설정
    완료: "bg-green-100 text-green-800", // 완료: 초록색
    청소중: "bg-blue-100 text-blue-800", // 청소중: 파란색
    예약대기: "bg-yellow-100 text-yellow-800", // 예약대기: 노란색
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};
// 상태에 맞는 아이콘적용
const getStatusIcon = (status) => {
  const statusIcons = {
    // 상태별 아이콘 설정
    완료: "fas fa-check-circle text-green-500", // 완료: 체크 아이콘
    청소중: "fas fa-broom text-blue-500", // 청소중: 빗자루 아이콘
    예약대기: "fas fa-clock text-yellow-500", // 예약대기: 시계 아이콘
  };
  return statusIcons[status] || "fas fa-circle text-gray-500";
};
// 특정 항목의 상태를 업데이트하는 함수
const updateStatus = (item, nextStatus) => {
  item.status = nextStatus; //항목의 상태를 nextStatus로 업데이트
  alert(`상태가 ${nextStatus}(으)로 변경 되었습니다.`);
};
</script>
