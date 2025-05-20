<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">공항 터미널 관리</h1>
        <p class="text-sm text-gray-500 mt-1">
          공항 터미널 정보와 운반 현황을 관리할 수 있습니다.
        </p>
      </div>
      <button
        @click="openTerminalModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
        <i class="fas fa-plus mr-2"></i>새 터미널 등록
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-terminal text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">전체 터미널</h3>
            <p class="text-2xl font-semibold text-gray-800">2개</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-suitcase text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">오늘의 운반 건수</h3>
            <p class="text-2xl font-semibold text-gray-800">156건</p>
            <span class="text-sm text-green-600">+12건</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <i class="fas fa-users text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">배정된 기사</h3>
            <p class="text-2xl font-semibold text-gray-800">8명</p>
            <span class="text-sm text-green-600">+2명</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 터미널 목록 -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">터미널 목록</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                터미널명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                위치
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                운반 구역
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                배정 기사
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                오늘 운반 건수
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                액션
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="terminal in terminals"
              :key="terminal.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ terminal.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ terminal.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ terminal.areas.join(", ") }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ terminal.assignedDrivers }}명
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ terminal.todayTransports }}건
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(terminal.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(terminal.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="editTerminal(terminal)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3">
                  <i class="fas fa-edit mr-1"></i>수정
                </button>
                <button
                  @click="viewDetails(terminal)"
                  class="text-blue-600 hover:text-blue-900">
                  <i class="fas fa-eye mr-1"></i>상세
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 터미널 등록/수정 모달 -->
    <div
      v-if="showTerminalModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">
              {{ isEditing ? "터미널 정보 수정" : "새 터미널 등록" }}
            </h3>
            <button
              @click="closeTerminalModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >터미널명 *</label
              >
              <input
                type="text"
                v-model="selectedTerminal.name"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="예: 제1터미널 출국장" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >위치 *</label
              >
              <input
                type="text"
                v-model="selectedTerminal.location"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="예: 인천공항 제1터미널 3층" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >운반 구역 *</label
              >
              <div class="mt-2 space-y-2">
                <div
                  v-for="(area, index) in selectedTerminal.areas"
                  :key="index"
                  class="flex items-center">
                  <input
                    type="text"
                    v-model="selectedTerminal.areas[index]"
                    class="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="예: 출국장 A구역" />
                  <button
                    @click="removeArea(index)"
                    class="ml-2 text-red-600 hover:text-red-900">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button
                  @click="addArea"
                  class="text-indigo-600 hover:text-indigo-900 text-sm">
                  <i class="fas fa-plus mr-1"></i>구역 추가
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >상태 *</label
              >
              <select
                v-model="selectedTerminal.status"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="active">운영중</option>
                <option value="maintenance">점검중</option>
                <option value="inactive">비활성</option>
              </select>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeTerminalModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            취소
          </button>
          <button
            @click="saveTerminal"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            저장
          </button>
        </div>
      </div>
    </div>

    <!-- 터미널 상세 모달 -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div
        class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">터미널 상세 정보</h3>
            <button
              @click="closeDetailsModal"
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
                      >터미널명</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedTerminal.name
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >위치</label
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedTerminal.location
                    }}</span>
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >상태</label
                    >
                    <span
                      :class="getStatusClass(selectedTerminal.status)"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ getStatusText(selectedTerminal.status) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 운반 구역 정보 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  운반 구역
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="(area, index) in selectedTerminal.areas"
                    :key="index"
                    class="flex items-center">
                    <span class="text-sm text-gray-900">{{ area }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 운반 현황 -->
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  운반 현황
                </h4>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >배정 기사</label
                    >
                    <span class="text-sm text-gray-900"
                      >{{ selectedTerminal.assignedDrivers }}명</span
                    >
                  </div>
                  <div class="flex items-center">
                    <label class="w-32 text-sm font-medium text-gray-700"
                      >오늘 운반 건수</label
                    >
                    <span class="text-sm text-gray-900"
                      >{{ selectedTerminal.todayTransports }}건</span
                    >
                  </div>
                </div>
              </div>

              <!-- 최근 운반 기록 -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">
                  최근 운반 기록
                </h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          시간
                        </th>
                        <th
                          class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          구역
                        </th>
                        <th
                          class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          가방 수
                        </th>
                        <th
                          class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="record in recentTransports"
                        :key="record.id"
                        class="hover:bg-gray-50">
                        <td class="px-4 py-2 text-sm text-gray-900">
                          {{ record.time }}
                        </td>
                        <td class="px-4 py-2 text-sm text-gray-900">
                          {{ record.area }}
                        </td>
                        <td class="px-4 py-2 text-sm text-gray-900">
                          {{ record.bagCount }}개
                        </td>
                        <td class="px-4 py-2 text-sm">
                          <span
                            :class="getTransportStatusClass(record.status)"
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                            {{ getTransportStatusText(record.status) }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end">
          <button
            @click="closeDetailsModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 터미널 목록 데이터
const terminals = ref([
  {
    id: 1,
    name: "제1터미널 출국장",
    location: "인천공항 제1터미널 3층",
    areas: ["A구역", "B구역", "C구역"],
    assignedDrivers: 4,
    todayTransports: 78,
    status: "active",
  },
  {
    id: 2,
    name: "제2터미널 입국장",
    location: "인천공항 제2터미널 1층",
    areas: ["D구역", "E구역"],
    assignedDrivers: 4,
    todayTransports: 68,
    status: "active",
  },
]);

// 모달 관련 상태
const showTerminalModal = ref(false);
const isEditing = ref(false);
const selectedTerminal = ref({
  name: "",
  location: "",
  areas: [""],
  status: "active",
});

// 상태 텍스트 변환
const getStatusText = (status) => {
  const statusMap = {
    active: "운영중",
    maintenance: "점검중",
    inactive: "비활성",
  };
  return statusMap[status] || status;
};

// 상태 클래스 변환
const getStatusClass = (status) => {
  const statusClasses = {
    active: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    inactive: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

// 모달 열기
const openTerminalModal = () => {
  isEditing.value = false;
  selectedTerminal.value = {
    name: "",
    location: "",
    areas: [""],
    status: "active",
  };
  showTerminalModal.value = true;
};

// 모달 닫기
const closeTerminalModal = () => {
  showTerminalModal.value = false;
  selectedTerminal.value = null;
};

// 터미널 수정
const editTerminal = (terminal) => {
  isEditing.value = true;
  selectedTerminal.value = { ...terminal };
  showTerminalModal.value = true;
};

// 상세 모달 관련 상태
const showDetailsModal = ref(false);

// 최근 운반 기록 데이터
const recentTransports = ref([
  {
    id: 1,
    time: "14:30",
    area: "A구역",
    bagCount: 2,
    status: "completed",
  },
  {
    id: 2,
    time: "14:15",
    area: "B구역",
    bagCount: 3,
    status: "in_progress",
  },
  {
    id: 3,
    time: "14:00",
    area: "C구역",
    bagCount: 1,
    status: "completed",
  },
]);

// 운반 상태 텍스트 변환
const getTransportStatusText = (status) => {
  const statusMap = {
    completed: "완료",
    in_progress: "진행중",
    waiting: "대기중",
  };
  return statusMap[status] || status;
};

// 운반 상태 클래스 변환
const getTransportStatusClass = (status) => {
  const statusClasses = {
    completed: "bg-green-100 text-green-800",
    in_progress: "bg-blue-100 text-blue-800",
    waiting: "bg-yellow-100 text-yellow-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

// 상세 모달 열기
const viewDetails = (terminal) => {
  selectedTerminal.value = { ...terminal };
  showDetailsModal.value = true;
};

// 상세 모달 닫기
const closeDetailsModal = () => {
  showDetailsModal.value = false;
  selectedTerminal.value = null;
};

// 구역 추가
const addArea = () => {
  selectedTerminal.value.areas.push("");
};

// 구역 제거
const removeArea = (index) => {
  selectedTerminal.value.areas.splice(index, 1);
};

// 터미널 저장
const saveTerminal = () => {
  // 필수 항목 검증
  if (!selectedTerminal.value.name || !selectedTerminal.value.location) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }

  if (isEditing.value) {
    // 수정 로직
    const index = terminals.value.findIndex(
      (t) => t.id === selectedTerminal.value.id
    );
    if (index !== -1) {
      terminals.value[index] = { ...selectedTerminal.value };
    }
  } else {
    // 새 터미널 추가 로직
    const newTerminal = {
      ...selectedTerminal.value,
      id: terminals.value.length + 1,
      assignedDrivers: 0,
      todayTransports: 0,
    };
    terminals.value.push(newTerminal);
  }

  closeTerminalModal();
};
</script>
