<template>
  <div class="w-[390px] m-auto">
    <!-- 상단 상태표시 -->
    <div class="bg-[#373737] text-white p-4">
      <!-- 이너 -->
      <div class="w-[350px] mx-auto">
        <!-- 헤더 -->
        <div class="flex justify-between items-center mb-4">
          <button>
            <router-link to="/worker/ddashboard">
              <div class="logo">
                <img src="/public/images/logo_delivery.png" alt="로고" />
              </div>
            </router-link>
          </button>
          <div class="flex gap-2">
            <router-link to="/worker/assigned-jobs">
              <button>
                <img
                  src="/public/images/yr/delivery/check_icon.png"
                  alt="체크"
                  class="w-[20px] h-[20px]" />
              </button>
            </router-link>
            <router-link to="/worker/assign">
              <img
                src="/public/images/yr/delivery/alert.png"
                alt="알림"
                class="w-[20px] h-[20px]" />
            </router-link>
          </div>
        </div>

        <!-- 프로필 -->
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gray-700 rounded-full mr-3">
            <img
              src="/public/images/yr/delivery/profile.png"
              alt="프로필"
              class="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <router-link to="/worker/profile">
              <p class="text-lg font-semibold underline underline-offset-4">
                홍길동 기사님
              </p>
           </router-link>
            <p class="text-sm text-gray-300">오늘도 안전 운행 하세요!</p>
          </div>
        </div>

        <!-- 작업 대시보드 -->
        <div class="bg-white rounded-xl text-black p-4 space-y-3">
          <div class="flex justify-between text-sm">
            <span>총 작업수</span>
            <span>5 / 15건</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>완료율</span>
            <span class="text-blue-500">33.3%</span>
          </div>
          <!-- 진행 바 -->
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-orange-400" style="width: 33.3%"></div>
          </div>
          <!-- 수령금액 -->
          <div class="flex justify-between text-sm font-semibold">
            <span>수령금액</span>
            <span class="text-red-500">40,000원</span>
          </div>
        </div>

        <!-- 지도 보기 / 닫기 버튼 -->
        <button
          @click="showMap = !showMap"
          :class="[
            'w-full text-white text-sm mt-4 py-2 rounded-lg flex justify-center items-center gap-1',
            showMap
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600',
          ]">
          <img
            src="/public/images/yr/delivery/map_icon.png"
            alt="지도 아이콘"
            class="w-4 h-4" />
          {{ showMap ? "지도 닫기" : "지도 보기" }}
        </button>
      </div>
    </div>

    <KakaoMap v-if="showMap" />

    <!-- 버튼필터 -->
    <div class="w-[390px] bg-gray-800 text-white py-4">
      <!-- 내부 콘텐츠 wrapper (350px 고정) -->
      <div class="w-[350px] mx-auto">
        <!-- 상단 상태 탭 -->
        <!-- 상태 탭 -->
        <div
          class="flex justify-between text-sm font-semibold text-gray-400 mb-4">
          <button
            v-for="status in statusTabs"
            :key="status"
            @click="selectedStatus = status"
            :class="[
              'pb-1',
              selectedStatus === status
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'border-b-2 border-gray-800',
            ]">
            {{ status }}
          </button>
        </div>

        <!-- 위치 탭 -->
        <div class="flex gap-2 justify-center items-center">
          <button
            v-for="(location, index) in locationTabs"
            :key="location"
            @click="selectedLocation = location"
            :class="[
              'rounded-lg px-[20px] py-[10px] text-sm font-semibold shadow border',
              index === 0
                ? selectedLocation === location
                  ? 'border-blue-400 text-blue-500 bg-white'
                  : 'border-gray-300 text-gray-500 bg-white'
                : index === 1
                ? selectedLocation === location
                  ? 'border-orange-400 text-orange-500 bg-white'
                  : 'border-gray-300 text-gray-500 bg-white'
                : selectedLocation === location
                ? 'border-green-400 text-green-500 bg-white'
                : 'border-gray-300 text-gray-500 bg-white',
            ]">
            {{ location }}
          </button>
        </div>

        <!-- 필터링된 리스트 -->
        <div class="mt-6 space-y-2">
          <div
            v-for="item in filteredData"
            :key="item.id"
            class="p-4 bg-gray-100 rounded-md">
            {{ item.title }}
            <span class="text-xs text-gray-500"
              >({{ item.status }}, {{ item.location }})</span
            >
          </div>

          <div
            v-if="filteredData.length === 0"
            class="text-center text-gray-400 mt-4">
            해당 조건의 결과가 없습니다.
          </div>
        </div>
      </div>
    </div>

    <!-- 카드내용 -->
    <div class="w-[390px] bg-gray-800 text-sm py-4">
      <!-- 내부 콘텐츠 wrapper (350px 고정) -->

      <div
        class="w-[350px] mx-auto flex flex-col gap-3 mb-2"
        v-for="(card, index) in dummyCards"
        :key="index">
        <!-- 카드 구조 -->
        <div
          class="card w-[350px] bg-white rounded-lg shadow flex items-center px-2 py-1 gap-3">
          <!-- 시간 -->
          <div
            class="time text-red-500 text-sm font-medium w-[50px] ml-2 font-semibold">
            {{ card.시간 }}
          </div>

          <!-- 상세내용 -->
          <div class="detailContent flex flex-col gap-1 w-full">
            <!-- detail1: 상태 원 + 이름 -->
            <div class="detail1 flex items-center gap-2">
              <div class="circle w-2 h-2 bg-green-500 rounded-full"></div>
              <div class="name text-[15px] font-semibold">{{ card.이름 }}</div>
            </div>

            <!-- detail2: 사이즈 -->
            <div class="detail2 text-[13px] text-blue-500">
              {{ card.사이즈 }}사이즈 / {{ card.짐개수 }}개
            </div>

            <!-- detail3: 아이콘 + 주소 -->
            <div class="detail3 flex items-center text-xs text-black-700 gap-1">
              <div class="iconState">
                <img
                  src="/public/images/yr/delivery/home_icon.png"
                  alt="집아이콘"
                  class="w-4 h-4 text-green-600" />
              </div>
              <p class="truncate pt-1">{{ card.위치 }} 근처 주소...</p>
            </div>
          </div>

          <!-- 오른쪽버튼 -->
          <div class="rightButton flex items-center gap-3">
            <!-- 전화버튼 -->
            <button>
              <div class="callbuttuon w-[35px] h-[90px] pt-[30px]">
                <img
                  src="/public/images/yr/delivery/phone_icon.png"
                  alt="전화" />
              </div>
            </button>

            <!-- 시작버튼 -->
            <button>
              <div
                class="startButton bg-red-500 text-white text-sm w-[50px] h-[80px] rounded font-semibold flex items-center justify-center">
                <p class="text">시작</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- 모달 오버레이 -->
  <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <!-- 모달 박스 -->
    <div class="bg-white rounded-xl w-[340px] p-5 shadow-lg text-sm">
      <!-- 상태 -->
      <div class="flex justify-between items-center mb-3">
        <span class="text-gray-500 font-medium">작업상태</span>
        <span class="text-green-600 bg-green-100 text-xs font-semibold px-3 py-1 rounded-full">대기중</span>
      </div>

      <!-- 정보 리스트 -->
      <div class="space-y-2">
        <InfoRow label="이름" value="홍길동" />
        <InfoRow label="전화번호" value="010-1234-5678" />
        <InfoRow label="시간" value="17:00" />
        <InfoRow label="수화물" value="S사이즈 / 3개" />
        <InfoRow label="위치/주소" value="대구 중구 국채보상로 2길 121번지 🏠" />
      </div>

      <!-- 요청사항 -->
      <div class="bg-gray-100 p-3 rounded-md mt-4 text-gray-700 leading-relaxed">
        <span class="font-medium text-gray-600">요청사항</span><br />
        캐리어 안에 잘 깨지는 물건이 있어서<br />
        조심히 부탁드립니다.
      </div>

      <!-- 닫기 버튼 -->
      <div class="flex justify-end mt-4">
        <button @click="showModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded-md">
          닫기
        </button>
      </div>
    </div>
  </div>

  <!-- 테스트용 모달 열기 버튼 -->
  <button @click="showModal = true" class="mt-10 px-4 py-2 bg-blue-500 text-white rounded">모달 열기</button>
</template>
<script setup>
import KakaoMap from "@/components/KakaoMap.vue";
import { ref, computed } from "vue";

const showMap = ref(false);
// 탭 상태값
const statusTabs = ["전체", "진행중", "대기중", "완료"];
const locationTabs = ["공항", "기차역", "숙소"];

const selectedStatus = ref("전체");
const selectedLocation = ref("공항");

// 예시 데이터
const allData = ref([
  { id: 1, title: "공항 픽업", status: "진행중", location: "공항" },
  { id: 2, title: "기차역 도착", status: "대기중", location: "기차역" },
  { id: 3, title: "숙소 배달", status: "완료", location: "숙소" },
  { id: 4, title: "공항 도착", status: "대기중", location: "공항" },
  { id: 5, title: "숙소 도착", status: "진행중", location: "숙소" },
]);

// 필터링된 데이터
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const statusMatch =
      selectedStatus.value === "전체" || item.status === selectedStatus.value;
    const locationMatch = item.location === selectedLocation.value;
    return statusMatch && locationMatch;
  });
});

const dummyCards = ref([
  {
    시간: "09:00",
    이름: "김민준",
    사이즈: "S",
    짐개수: 2,
    위치: "기차",
    상태: "green",
  },
  {
    시간: "10:00",
    이름: "이서연",
    사이즈: "M",
    짐개수: 5,
    위치: "공항",
    상태: "red",
  },
  { 시간: "11:00", 이름: "박지후", 사이즈: "L", 짐개수: 1, 위치: "숙소" },
  {
    시간: "12:00",
    이름: "최윤서",
    사이즈: "XL",
    짐개수: 3,
    위치: "공항",
    상태: "green",
  },
  {
    시간: "13:00",
    이름: "정하윤",
    사이즈: "M",
    짐개수: 6,
    위치: "기차",
    상태: "red",
  },
  { 시간: "14:00", 이름: "한도윤", 사이즈: "S", 짐개수: 4, 위치: "숙소" },
  {
    시간: "15:00",
    이름: "윤시우",
    사이즈: "L",
    짐개수: 2,
    위치: "공항",
    상태: "green",
  },
  {
    시간: "16:00",
    이름: "장예은",
    사이즈: "M",
    짐개수: 5,
    위치: "기차",
    상태: "red",
  },
  { 시간: "17:00", 이름: "백준호", 사이즈: "XL", 짐개수: 1, 위치: "숙소" },
  {
    시간: "18:00",
    이름: "노서진",
    사이즈: "S",
    짐개수: 6,
    위치: "공항",
    상태: "green",
  },
  {
    시간: "09:00",
    이름: "이하늘",
    사이즈: "L",
    짐개수: 3,
    위치: "기차",
    상태: "red",
  },
  {
    시간: "10:00",
    이름: "김다은",
    사이즈: "M",
    짐개수: 2,
    위치: "숙소",
    상태: "green",
  },
  { 시간: "11:00", 이름: "홍지훈", 사이즈: "XL", 짐개수: 5, 위치: "공항" },
  {
    시간: "12:00",
    이름: "신유진",
    사이즈: "S",
    짐개수: 4,
    위치: "기차",
    상태: "red",
  },
  {
    시간: "13:00",
    이름: "임도현",
    사이즈: "M",
    짐개수: 1,
    위치: "숙소",
    상태: "green",
  },
  { 시간: "14:00", 이름: "조하린", 사이즈: "L", 짐개수: 6, 위치: "공항" },
  { 시간: "15:00", 이름: "배현우", 사이즈: "XL", 짐개수: 3, 위치: "기차" },
  {
    시간: "16:00",
    이름: "서유나",
    사이즈: "M",
    짐개수: 2,
    위치: "숙소",
    상태: "green",
  },
  { 시간: "17:00", 이름: "문세진", 사이즈: "S", 짐개수: 5, 위치: "공항" },
  { 시간: "18:00", 이름: "오지후", 사이즈: "L", 짐개수: 4, 위치: "기차" },
  {
    시간: "09:00",
    이름: "유채은",
    사이즈: "XL",
    짐개수: 6,
    위치: "숙소",
    상태: "green",
  },
  { 시간: "10:00", 이름: "강시우", 사이즈: "S", 짐개수: 1, 위치: "공항" },
  { 시간: "11:00", 이름: "남지안", 사이즈: "M", 짐개수: 4, 위치: "기차" },
  {
    시간: "12:00",
    이름: "서지우",
    사이즈: "L",
    짐개수: 2,
    위치: "숙소",
    상태: "green",
  },
]);
</script>
