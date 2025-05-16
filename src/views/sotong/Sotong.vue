<style>
/*푸터 .fixed-buttons 영역을 클릭 투명하게*/
:deep(.fixed-buttons) {
  pointer-events: none !important;
  z-index: 0 !important;
}
/*푸터 안의 a, button 만 클릭 허용*/
:deep(.fixed-buttons) a,
:deep(.fixed-buttons) button {
  pointer-events: auto !important;
}
</style>

<script setup>
import { computed, ref, onBeforeUnmount } from "vue";

const itemsPerPage = 15;
const currentPage = ref(1);
const activeIndex = ref(null);

// dummy 데이터
const notices = ref([
  {
    title: "가방도 서비스오픈",
    content: "사전예약시 2,000원 할인",
    category: "서비스관련",
  },
  {
    title: "수하물 크기 제한 변경 안내",
    content:
      "2025년 4월 1일부터 수하물의 크기 제한이 변경됩니다. 기내 수하물은 최대 55cm x 40cm x 20cm로 제한되며, 체크인 수하물은 최대 23kg까지 허용됩니다. 이를 초과하는 수하물은 추가 요금이 부과될 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보험 서비스 추가 안내",
    content:
      "새롭게 수하물 보험 서비스가 추가되었습니다. 여행 중 분실, 파손, 지연 등 사고에 대비하여 최대 100만원까지 보상받을 수 있습니다. 보험 서비스는 결제 시 선택 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 시 처리 절차 안내",
    content:
      "수하물이 분실된 경우, 고객 서비스센터에 즉시 신고해 주세요. 분실된 수하물은 최대 14일 이내에 추적되며, 분실 확인 후 보상 절차가 진행됩니다. 보상 관련 자세한 내용은 홈페이지에서 확인하실 수 있습니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 규격 초과 시 추가 요금 안내",
    content:
      "수하물 규격 초과 시, 초과된 무게와 크기에 따라 추가 요금이 부과됩니다. 추가 요금은 공항에서 결제 가능하며, 사전 예약을 통해 할인된 가격으로 처리할 수 있습니다.",
    category: "결제관련",
  },
  {
    title: "수하물 픽업 서비스 안내",
    content:
      "2025년 5월부터 수하물 픽업 서비스가 도입됩니다. 공항까지 수하물을 가져가실 필요 없이, 집에서 공항까지 수하물을 안전하게 운반해 드리는 서비스입니다. 예약은 웹사이트에서 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 지연 안내 및 보상",
    content:
      "수하물이 지연된 경우, 지연된 시간에 따라 보상 정책이 적용됩니다. 3시간 이상 지연된 경우, 식사 및 숙박 비용의 일부를 보상해 드리며, 24시간 이상 지연 시 추가 보상 혜택이 제공됩니다.",
    category: "취소/환불",
  },
  {
    title: "기내 수하물 제한 품목 안내",
    content:
      "기내 수하물에 반입할 수 없는 품목에 대한 규정이 강화되었습니다. 액체, 젤, 스프레이 등 100ml 이상은 기내 반입이 금지되며, 해당 품목은 반드시 체크인 수하물로 보내셔야 합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 안전 검사 강화 안내",
    content:
      "2025년 6월부터 수하물 안전 검사가 강화됩니다. 모든 수하물은 X-ray 검사와 추가적인 수동 검사를 거칠 수 있으며, 검사가 완료되기 전에는 출발이 지연될 수 있습니다. 협조 부탁드립니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 손상 시 보상 절차 안내",
    content:
      "수하물이 손상된 경우, 공항에서 즉시 신고해야 합니다. 손상된 수하물에 대해서는 최대 50만원까지 보상받을 수 있으며, 보상 절차는 고객 서비스 센터를 통해 진행됩니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 프리미엄 서비스 출시 안내",
    content:
      "2025년 7월부터 프리미엄 수하물 서비스가 제공됩니다. 우선 처리, 전용 수하물 취급, 추가 보험 서비스 등 다양한 혜택이 포함되어 있으며, 사전 예약을 통해 저렴한 가격에 이용 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보관 서비스 확대 안내",
    content:
      "혼잡한 공항에서의 편의를 위해 수하물 보관 서비스가 확대됩니다. 주요 국제공항 내 신규 보관소가 추가 설치되며, 1일 단위로 이용 요금이 부과됩니다. 자세한 정보는 모바일 앱에서 확인하세요.",
    category: "서비스관련",
  },
  {
    title: "가방 파손 예방 포장 서비스 제공",
    content:
      "2025년 5월부터 수하물 파손을 방지하기 위한 포장 서비스가 도입됩니다. 내구성이 뛰어난 특수 포장재로 가방을 감싸 손상 위험을 줄이며, 포장 서비스는 체크인 카운터에서 신청할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "애완동물 수하물 운송 서비스 안내",
    content:
      "애완동물과의 여행을 위한 수하물 운송 서비스가 개선되었습니다. 전용 이동장과 적정 온도 유지 시스템을 갖춘 화물칸을 제공하며, 출발 24시간 전까지 사전 예약이 필요합니다.",
    category: "예약관련",
  },
  {
    title: "국제선 수하물 무료 허용량 변경",
    content:
      "2025년 8월부터 일부 국제선 노선의 수하물 무료 허용량이 변경됩니다. 노선별로 최대 허용 중량 및 크기가 다르므로, 항공권 예약 시 확인해 주세요. 초과 시 요금이 발생할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 실시간 위치 추적 기능 제공",
    content:
      "고객 편의를 위해 실시간 수하물 위치 추적 기능이 추가됩니다. 모바일 앱에서 수하물의 현재 위치와 상태를 확인할 수 있으며, 등록된 탑승권과 연동하여 자동 추적됩니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 무게 자동 측정 키오스크 도입",
    content:
      "공항 터미널에 수하물 무게를 빠르고 정확하게 측정할 수 있는 자동 키오스크가 설치되었습니다. 셀프 체크인 시 편리하게 이용하세요.",
    category: "서비스관련",
  },
  {
    title: "여름 성수기 특별 할인 이벤트",
    content:
      "2025년 7월 1일부터 8월 31일까지 여름 성수기 기간 동안 수하물 예약 시 1개당 1,000원 할인이 적용됩니다. 놓치지 말고 예약하세요!",
    category: "결제관련",
  },
  {
    title: "밤늦은 수하물 픽업 서비스 연장",
    content:
      "고객 편의를 위해 2025년 6월부터 야간 수하물 픽업 가능 시간을 기존 21시에서 23시로 연장하였습니다.",
    category: "예약관련",
  },
  {
    title: "무인 보관함 QR 코드 결제 지원",
    content:
      "수하물 보관 서비스를 더욱 간편하게! 무인 보관함 내 QR 코드를 스캔하여 Toss·KakaoPay·NaverPay 등 간편결제가 가능합니다.",
    category: "결제관련",
  },
  {
    title: "긴급 수하물 회수 서비스 안내",
    content:
      "항공편 지연·결항 시 고객의 수하물이 다른 공항으로 잘못 배송된 경우, 긴급 회수 서비스를 통해 최대 2시간 내에 찾아드립니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 알러지 프리 패키지 출시",
    content:
      "항균·무향 처리된 특별 포장재를 사용한 알러지 프리 수하물 패키지를 출시하였습니다. 예민한 체질을 위한 안전한 여행을 보장합니다.",
    category: "서비스관련",
  },
  {
    title: "프리미엄 VIP 수하물 라운지 오픈",
    content:
      "2025년 9월부터 대구공항 내 프리미엄 VIP 라운지에서 수하물을 안전하게 보관하고, 라운지 이용 혜택까지 누리실 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 보험 보장 한도 상향",
    content:
      "고객 불편을 최소화하기 위해 수하물 분실 시 보장 한도를 기존 100만원에서 200만원으로 상향 조정하였습니다.",
    category: "취소/환불",
  },
  {
    title: "수하물 픽업 당일 예약 가능",
    content:
      "이제는 당일 공항 도착 후에도 수하물 픽업 예약이 가능합니다. 도착 즉시 모바일 앱에서 예약하고 바로 이용하세요.",
    category: "예약관련",
  },
  {
    title: "친환경 포장재 무료 제공",
    content:
      "환경 보호를 위해 친환경 소재로 만든 수하물 포장재를 무료로 제공해 드립니다. 포장 시 ‘친환경 선택’ 옵션을 클릭하세요.",
    category: "서비스관련",
  },
  {
    title: "수하물 우선 처리 서비스 출시",
    content:
      "프리미엄 고객을 위한 우선 처리 서비스를 도입했습니다. 우선적으로 컨베이어 벨트에 탑재되어 빠른 수하물 수령이 가능합니다.",
    category: "서비스관련",
  },
  {
    title: "공항 내 수하물 보관료 환불 정책 안내",
    content:
      "날씨나 기타 사유로 인해 지연 발생 시, 보관료의 50%가 자동 환불됩니다. 자세한 환불 절차는 웹사이트 FAQ를 참고하세요.",
    category: "취소/환불",
  },
  {
    title: "수하물 RFID 태그 무료 제공",
    content:
      "최신 RFID 기술을 적용한 수하물 태그를 무료로 제공합니다. 태그를 스캔하여 실시간 위치를 앱에서 확인할 수 있습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 분실 예방 캠페인 진행",
    content:
      "안전한 수하물 관리를 위해 ‘분실 예방 캠페인’을 진행합니다. 수하물에 본인 연락처 기재 시 소정의 기프트를 드립니다.",
    category: "서비스관련",
  },
  {
    title: "장거리 국제선 특별 수하물 지원",
    content:
      "장거리 국제선 승객을 위해 추가 수하물 1개당 최대 5kg을 무료 지원합니다. 예약 시 옵션에서 선택하세요.",
    category: "서비스관련",
  },
  {
    title: "공항 수하물 대기 시간 단축 안내",
    content:
      "AI 기반 수하물 분류 시스템 도입으로 평균 처리 시간이 기존 대비 30% 단축되었습니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 보안 강화 알림",
    content:
      "보안 검사가 강화되어 일부 항목 검사 시간이 늘어날 수 있습니다. 탑승 1시간 전까지 공항에 도착해 주시기 바랍니다.",
    category: "서비스관련",
  },
  {
    title: "무인 로봇 수하물 수거 서비스 시범 운영",
    content:
      "공항 내 무인 로봇이 수하물을 지정된 장소로 안전하게 운반해 드리는 시범 서비스를 시작합니다.",
    category: "서비스관련",
  },
  {
    title: "수하물 위탁 시 친환경 포장 무료 업그레이드",
    content:
      "친환경 보조 포장 옵션을 선택하시면 추가 요금 없이 친환경 소재 포장으로 업그레이드됩니다.",
    category: "서비스관련",
  },
  {
    title: "여행 성수기 수하물 요금 할인 이벤트",
    content:
      "2025년 12월 한 달간, 성수기 수하물 추가 요금이 20% 할인됩니다. 행사 기간 내 예약분에 한합니다.",
    category: "결제관련",
  },
]);

// 검색어, 선택된 카테고리, 카테고리 리스트
const searchQuery = ref("");
const selectedCategory = ref("전체");
const categories = ["전체", "서비스관련", "예약관련", "결제관련", "취소/환불"];

// 필터링 + 페이징
const filteredNotices = computed(() =>
  notices.value.filter((n) => {
    const okCat =
      selectedCategory.value === "전체" ||
      n.category === selectedCategory.value;
    const okText =
      n.title.includes(searchQuery.value) ||
      n.content.includes(searchQuery.value);
    return okCat && okText;
  })
);
const totalPages = computed(() =>
  Math.ceil(filteredNotices.value.length / itemsPerPage)
);
const paginatedNotices = computed(() =>
  filteredNotices.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

// 토글 함수: 파라미터 i 로 비교
function toggleNotice(idx) {
  if (activeIndex.value === idx) {
    activeIndex.value = null;
    document.body.style.overflow = "";
  } else {
    activeIndex.value = idx;
    document.body.style.overflow = "hidden";
  }
}
onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

// 페이지 전환
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// 카테고리 선택
function setCategory(cat) {
  selectedCategory.value = cat;
  currentPage.value = 1;
  activeIndex.value = null;
}
</script>

<template>
  <!-- 전체 -->
  <div class="wrap">
    <div class="st_wrap">
      <!-- 상단컨테이너 -->
      <div class="st_customer">
        <!-- 타이틀 -->
        <div class="st_title1">
          <div class="title_txt1">
            <h1>고객센터</h1>
          </div>
        </div>
        <div class="st_info">
          <img src="/images/cr/st_notice.png" alt="상담원" class="st_image" />
          <div class="st_details">
            <p class="st_phone">053-123-1234</p>
            <ul class="st_hours">
              <li>평일 : 09:00 – 18:00</li>
              <li>토요일 : 09:00 – 13:00</li>
              <li>일요일 : 휴무 (예약일정에 따라 변동)</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 하단컨테이너 -->
      <div class="st_container">
        <!-- 타이틀 -->
        <div class="st_title1">
          <div class="title_txt1">
            <h1>공지사항</h1>
          </div>
        </div>
        <!-- 검색어입력 -->
        <div class="st_search-wrapper">
          <input
            v-model="searchQuery"
            class="st_search"
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button class="st_search-btn my-button" @click="onSearch">
            검색
          </button>
        </div>
        <!-- 카테고리버튼 -->
        <div class="st_category-buttons">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="setCategory(cat)"
            :class="{ active: selectedCategory === cat }"
            class="st_category-btn my-button"
          >
            {{ cat }}
          </button>
        </div>
        <!-- 공지사항 출력 -->
        <table class="st_notice-table">
          <tbody class="st_scrollable-body">
            <template v-for="(notice, idx) in paginatedNotices" :key="idx">
              <tr class="notice-row my-button" @click="toggleNotice(idx)">
                <td>
                  <div class="notice-row_title">
                    {{ notice.title }}
                    <img
                      class="st_toggle-icon my-button"
                      :src="
                        activeIndex === idx
                          ? '/images/cr/up.png'
                          : '/images/cr/down.png'
                      "
                      alt="토글 아이콘"
                    />
                  </div>
                </td>
              </tr>
              <tr v-if="activeIndex === idx">
                <td class="notice-row_content my-button">
                  <div class="notice_content">
                    {{ notice.content }}
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!-- 페이지네이션 -->
      <div class="st_pagination my-button">
        <button
          class="my-button"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          이전
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="my-button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/Main.scss" as *;
@use "@/assets/_Variables.scss" as *;

// 스타일 변수
$border-gray: #b5b5b5;
$blue-sky: #279bf3;
$red-holiday: #e63946;
$blue-weekend: #1a44ff;
$gray-past: #cccccc;
$dark-gray: #333333;
$radius: 8px;

//전체배경
.wrap {
  padding: 100px 0;
  min-height: 100vh; /* 화면 전체 높이를 확보한 뒤 */
  background: linear-gradient(
    to top,
    #e2f1fc 50%,
    /* 아래 50% */ transparent 50% /* 위 50% */
  );
}

// 전체 래퍼
.st_wrap {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  font-family: $font-family;
}

// 타이틀
.st_title1 {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  .title_txt1 h1 {
    font-size: 40px;
    font-family: $font-gothic;
  }
}

//고객센터
.st_customer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 100px;
}
.st_info {
  display: flex;
}
.st_image {
  width: 200px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}

.st_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.st_phone {
  font-size: 30px;
  font-weight: bold;
  color: $dark-gray;
  margin-bottom: 20px;
}

.st_hours {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #9c9c9c;
  gap: 20px;
}

.st_hours li {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 20px;
}

//하부 컨테이너
.st_container {
  width: 70%;
  max-width: 100%;
  text-align: center;
}

//검색어
.st_search-wrapper {
  width: 70%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 15px;

  .st_search {
    flex: 1;
    height: 44px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid $border-gray;
    border-radius: $radius;
    background: #fff;
    box-sizing: border-box;
    color: $dark-gray;

    &:focus {
      outline: 3px solid $blue-sky;
      outline-offset: -2px;
    }
  }
  .st_search-btn {
    height: 44px;
    width: 60px;
    padding: 10px;
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    border: none;
    border-radius: $radius;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      background-color: color.adjust($sub-color, $lightness: 20%) !important;
    }
  }
}
//카테고리 버튼
.st_category-buttons {
  width: 80%;
  display: flex;
  gap: 10px;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 50px;
}

.st_category-btn {
  font-size: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 40px; // 평상시 높이
  width: auto;
  padding: 10px; // 좌우 패딩
  border: 1px solid $border-gray;
  border-radius: $radius;
  background: #fff;
  color: $dark-gray;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &.active {
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    border-color: color.adjust($main-color, $lightness: 30%);
  }

  &:hover:not(.active):not(:disabled) {
    background: color.adjust($sub-color, $lightness: 20%);
  }
}

//공지사항
.st_scrollable-body {
  background-color: #ffffff;
  display: block;
  max-height: auto; // 리스트 최대 높이(화면 높이의 60%)
  overflow-y: auto; // 내부에서만 스크롤
  scrollbar-gutter: stable; // 스크롤바 공간 항상 확보
}
.st_scrollable-body tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.st_notice-table {
  width: 80%;
  max-width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  color: $dark-gray;
}

.st_notice-table td {
  border: none;
  border-top: 1px solid $border-gray;
  padding: 13px;
  box-sizing: border-box;
}

.st_notice-table tr:last-child td {
  border-bottom: 1px solid $border-gray;
}

.notice-row_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: $dark-gray;
  margin: 0 5px;
}

.notice-row_content {
  width: 100%;
  display: flex;
  text-align: left;
  background: #f0f0f0;
  color: $dark-gray;
  line-height: 1.5;
}
.st_toggle-icon {
  width: 13px;
  height: 13px;
  margin-left: 8px;
  filter: invert(60%) brightness(100%);
}

/* 페이지네이션 스타일 */
.st_pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.st_pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: color.adjust($main-color, $lightness: 30%);
  color: #fff;
  :hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}
.st_pagination button:disabled {
  background: #d4d4d4;
  cursor: not-allowed;
  opacity: 0.6;
}

.st_number {
  background-color: #fff;
  color: $dark-gray;
}
.my-button {
  position: relative;
  z-index: 4000; /* fixed-buttons(1000)보다 높게 */
}
</style>
