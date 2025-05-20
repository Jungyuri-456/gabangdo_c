<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">가방 운반 고객 관리</h1>
        <p class="text-sm text-gray-500 mt-1">
          가방 운반 서비스를 이용하는 고객 정보를 관리하고 상태를 확인할 수
          있습니다.
        </p>
      </div>
      <button
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        @click="showAddCustomerModal">
        <i class="fas fa-user-plus mr-2"></i>고객 추가
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-users text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">전체 고객</h3>
            <p class="text-2xl font-semibold text-gray-800">24명</p>
            <span class="text-sm text-green-600">+5명</span>
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
            <h3 class="text-sm font-medium text-gray-500">활성 고객</h3>
            <p class="text-2xl font-semibold text-gray-800">18명</p>
            <span class="text-sm text-green-600">+3명</span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-suitcase text-2xl"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">평균 운반 건수</h3>
            <p class="text-2xl font-semibold text-gray-800">3.2건</p>
            <span class="text-sm text-green-600">+0.5건</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 및 필터 -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="고객명 또는 이메일로 검색"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="blocked">차단</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 고객 목록 -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">고객 목록</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                예약
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
              v-for="customer in paginatedCustomers"
              :key="customer.id"
              class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      :src="customer.avatar"
                      :alt="customer.name" />
                    <span
                      :class="getStatusDotClass(customer.status)"
                      class="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white"></span>
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 flex items-center">
                      {{ customer.name }}
                      <span
                        v-if="customer.tags.includes('VIP')"
                        class="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                        >VIP</span
                      >
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ customer.email }}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">
                      가입일: {{ customer.joinDate }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.phone }}</div>
                <div class="text-xs text-gray-500 mt-1">
                  마지막 방문: {{ customer.lastVisit }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-indigo-600">
                  <i class="fas fa-calendar mr-1"></i>
                  {{ customer.reservationCount }}건
                </div>
                <div class="text-sm text-gray-900 mt-1">
                  총 이용금액: {{ formatCurrency(customer.totalSpent) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(customer.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(customer.status) }}
                </span>
                <div class="mt-2 flex flex-wrap gap-1">
                  <span
                    v-for="tag in customer.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col space-y-2">
                  <button
                    @click="editCustomer(customer)"
                    class="text-indigo-600 hover:text-indigo-900 flex items-center">
                    <i class="fas fa-edit mr-1"></i>수정
                  </button>
                  <button
                    @click="showCustomerDetails(customer)"
                    class="text-blue-600 hover:text-blue-900 flex items-center">
                    <i class="fas fa-eye mr-1"></i>상세
                  </button>
                  <button
                    @click="confirmDelete(customer)"
                    class="text-red-600 hover:text-red-900 flex items-center">
                    <i class="fas fa-trash mr-1"></i>삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div
      class="flex justify-between items-center bg-white rounded-lg shadow p-4">
      <div class="text-sm text-gray-700">
        총 <span class="font-medium">{{ filteredCustomers.length }}</span
        >명의 고객
      </div>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="px-3 py-1 border rounded transition-colors"
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
          class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- 고객 추가/수정 모달 -->
    <div
      v-if="showCustomerForm"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingCustomer ? "고객 수정" : "고객 추가" }}
            </h3>
            <button
              @click="closeCustomerForm"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <form @submit.prevent="saveCustomer" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              v-model="customerForm.name"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >이메일</label
            >
            <input
              type="email"
              v-model="customerForm.email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >연락처</label
            >
            <input
              type="tel"
              v-model="customerForm.phone"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">상태</label>
            <select
              v-model="customerForm.status"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="blocked">차단</option>
            </select>
          </div>
        </form>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeCustomerForm"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            취소
          </button>
          <button
            @click="saveCustomer"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            저장
          </button>
        </div>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">고객 삭제</h3>
            <button
              @click="closeDeleteModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-gray-900">
            정말로 {{ customerToDelete?.name }} 고객을 삭제하시겠습니까?
          </p>
          <p class="text-sm text-gray-500 mt-1">
            삭제된 고객 정보는 복구할 수 없습니다.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            취소
          </button>
          <button
            @click="deleteCustomer"
            class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            삭제
          </button>
        </div>
      </div>
    </div>

    <!-- 고객 상세 보기 모달 -->
    <div
      v-if="showCustomerDetailsModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">고객 상세</h3>
            <button
              @click="closeCustomerDetailsModal"
              class="text-gray-400 hover:text-gray-500">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-6">
          <!-- 고객 상세 정보 표시 -->
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeCustomerDetailsModal"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const customers = ref([
  {
    id: 1,
    name: "김철수",
    email: "chulsoo@example.com",
    phone: "010-1234-5678",
    status: "active",
    reservationCount: 5,
    avatar: "/images/people1.png",
    joinDate: "2024-01-15",
    lastVisit: "2024-04-10",
    totalSpent: 1500000,
    favoriteItems: ["대형 가방", "특별 취급 가방"],
    notes: "VIP 고객, 정기 이용",
    tags: ["VIP", "정기이용"],
  },
  {
    id: 2,
    name: "이영희",
    email: "younghee@example.com",
    phone: "010-8765-4321",
    status: "active",
    reservationCount: 3,
    avatar: "/images/people2.png",
    joinDate: "2024-01-20",
    lastVisit: "2024-04-09",
    totalSpent: 800000,
    favoriteItems: ["중형 가방", "소형 가방"],
    notes: "단골 고객, 취급 주의 가방 있음",
    tags: ["단골", "취급주의"],
  },
  {
    id: 3,
    name: "박민수",
    email: "minsu@example.com",
    phone: "010-1111-2222",
    status: "inactive",
    reservationCount: 1,
    avatar: "/images/people4.png",
    joinDate: "2024-01-25",
    lastVisit: "2024-03-15",
    totalSpent: 300000,
    favoriteItems: ["소형 가방"],
    notes: "3개월 미이용",
    tags: ["휴면"],
  },
  {
    id: 4,
    name: "최지영",
    email: "jiyoung@example.com",
    phone: "010-3333-4444",
    status: "active",
    reservationCount: 7,
    avatar: "/images/people3.png",
    joinDate: "2024-02-01",
    lastVisit: "2024-04-11",
    totalSpent: 2100000,
    favoriteItems: ["대형 가방", "특별 취급 가방"],
    notes: "VIP 고객, 이벤트 참여 적극적",
    tags: ["VIP", "이벤트"],
  },
  {
    id: 5,
    name: "정민호",
    email: "minho@example.com",
    phone: "010-5555-6666",
    status: "blocked",
    reservationCount: 0,
    avatar: "/images/people5.png",
    joinDate: "2024-02-05",
    lastVisit: "2024-02-20",
    totalSpent: 0,
    favoriteItems: [],
    notes: "불량 고객, 환불 요청 다수",
    tags: ["차단"],
  },
  {
    id: 6,
    name: "한수진",
    email: "sujin@example.com",
    phone: "010-7777-8888",
    status: "active",
    reservationCount: 4,
    avatar: "/images/people2.png",
    joinDate: "2024-02-10",
    lastVisit: "2024-04-08",
    totalSpent: 1200000,
    favoriteItems: ["중형 가방", "소형 가방"],
    notes: "단골 고객, 친절함",
    tags: ["단골"],
  },
  {
    id: 7,
    name: "송지훈",
    email: "jihun@example.com",
    phone: "010-9999-0000",
    status: "active",
    reservationCount: 2,
    avatar: "/images/people1.png",
    joinDate: "2024-02-15",
    lastVisit: "2024-04-07",
    totalSpent: 600000,
    favoriteItems: ["소형 가방"],
    notes: "새 고객, 온라인 예약 선호",
    tags: ["신규"],
  },
  {
    id: 8,
    name: "강미영",
    email: "miyoung@example.com",
    phone: "010-2222-3333",
    status: "active",
    reservationCount: 6,
    avatar: "/images/people3.png",
    joinDate: "2024-02-20",
    lastVisit: "2024-04-06",
    totalSpent: 1800000,
    favoriteItems: ["대형 가방", "중형 가방"],
    notes: "VIP 고객, 리뷰 작성 적극적",
    tags: ["VIP", "리뷰어"],
  },
  {
    id: 9,
    name: "임동현",
    email: "donghyun@example.com",
    phone: "010-4444-5555",
    status: "inactive",
    reservationCount: 1,
    avatar: "/images/people4.png",
    joinDate: "2024-02-25",
    lastVisit: "2024-03-10",
    totalSpent: 300000,
    favoriteItems: ["중형 가방"],
    notes: "2개월 미이용",
    tags: ["휴면"],
  },
  {
    id: 10,
    name: "오서연",
    email: "seoyeon@example.com",
    phone: "010-6666-7777",
    status: "active",
    reservationCount: 3,
    avatar: "/images/people5.png",
    joinDate: "2024-03-01",
    lastVisit: "2024-04-05",
    totalSpent: 900000,
    favoriteItems: ["소형 가방", "중형 가방"],
    notes: "단골 고객, 친구 추천",
    tags: ["단골", "추천"],
  },
]);

const searchQuery = ref("");
const statusFilter = ref("all");
const showCustomerForm = ref(false);
const editingCustomer = ref(null);
const showDeleteModal = ref(false);
const customerToDelete = ref(null);
const showCustomerDetailsModal = ref(false);
const selectedCustomer = ref(null);

const customerForm = reactive({
  name: "",
  email: "",
  phone: "",
  status: "active",
});

// 페이지네이션 관련 상태
const currentPage = ref(1);
const itemsPerPage = ref(5);

// 페이지네이션 계산
const totalPages = computed(() => {
  return Math.ceil(filteredCustomers.value.length / itemsPerPage.value);
});

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCustomers.value.slice(start, end);
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

const filteredCustomers = computed(() => {
  let result = [...customers.value];

  // 검색어 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
    );
  }

  // 상태 필터링
  if (statusFilter.value !== "all") {
    result = result.filter(
      (customer) => customer.status === statusFilter.value
    );
  }

  return result;
});

const getStatusText = (status) => {
  const statusMap = {
    active: "활성",
    inactive: "비활성",
    blocked: "차단",
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    blocked: "bg-red-100 text-red-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
};

const getStatusDotClass = (status) => {
  const statusClasses = {
    active: "bg-green-400",
    inactive: "bg-yellow-400",
    blocked: "bg-red-400",
  };
  return statusClasses[status] || "bg-gray-400";
};

const showAddCustomerModal = () => {
  editingCustomer.value = null;
  Object.assign(customerForm, {
    name: "",
    email: "",
    phone: "",
    status: "active",
  });
  showCustomerForm.value = true;
};

const editCustomer = (customer) => {
  editingCustomer.value = customer;
  Object.assign(customerForm, { ...customer });
  showCustomerForm.value = true;
};

const closeCustomerForm = () => {
  showCustomerForm.value = false;
  editingCustomer.value = null;
};

const saveCustomer = () => {
  if (editingCustomer.value) {
    // 고객 수정
    const index = customers.value.findIndex(
      (c) => c.id === editingCustomer.value.id
    );
    if (index !== -1) {
      customers.value[index] = {
        ...customerForm,
        id: editingCustomer.value.id,
      };
    }
  } else {
    // 새 고객 추가
    const newCustomer = {
      ...customerForm,
      id: customers.value.length + 1,
      reservationCount: 0,
      avatar: "https://via.placeholder.com/50",
    };
    customers.value.push(newCustomer);
  }
  closeCustomerForm();
};

const confirmDelete = (customer) => {
  customerToDelete.value = customer;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  customerToDelete.value = null;
};

const deleteCustomer = () => {
  if (customerToDelete.value) {
    customers.value = customers.value.filter(
      (c) => c.id !== customerToDelete.value.id
    );
    closeDeleteModal();
  }
};

const showCustomerDetails = (customer) => {
  selectedCustomer.value = customer;
  showCustomerDetailsModal.value = true;
};

const closeCustomerDetailsModal = () => {
  showCustomerDetailsModal.value = false;
  selectedCustomer.value = null;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
};
</script>
