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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useReservationStore } from "@/stores/reservationStore";

// 스토어 & 라우터 초기화
const store = useReservationStore();
const router = useRouter();

// ISO 문자열을 한국어 날짜로 변환하는 함수
function formatKoreanDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}년 ${m}월 ${d}일`;
}

// 페이지 진입 시: 오늘 날짜 선택 여부에 따라 가격 초기화/조정
onMounted(() => {
  const todayISO = new Date().toISOString().slice(0, 10);
  if (store.selectedDate === todayISO) {
    store.handleTodaySelected();
  } else {
    store.resetPrices();
  }
});

// 전체 요약 배열 생성
const summaryRows = computed(() => {
  const rows = [
    { label: "이름", value: store.name },
    { label: "전화번호", value: store.fullPhone },
    // 구분선 추가
    { divider: true },
    {
      label: "이용날짜 및 시간",
      value: `${formatKoreanDate(store.selectedDate)} ${store.selectedTime}`,
    },
  ];
  if (store.selectedStart || store.selectedStop) {
    rows.push({
      label: "출발 → 도착",
      value: `${store.selectedStart || "—"} → ${store.selectedStop || "—"}`,
    });
  }
  if (store.customStartAddress) {
    rows.push({
      label: "",
      value: `출발 숙소명: ${store.customStartAddress}`,
      cssClass: "addr-start",
    });
  }
  if (store.customStopAddress) {
    rows.push({
      label: "",
      value: `도착 숙소명: ${store.customStopAddress}`,
      cssClass: "addr-stop",
    });
  }
  // 가방, 총 금액, 결제방식 모두 여기서 한 번에 처리
  rows.push(...makeBagRows(store.sizes));
  return rows;
});

// 가방·총액
function makeBagRows(sizes) {
  const bagRows = [];
  const selected = sizes.filter((i) => i.count > 0);
  // 구분선 추가
  bagRows.push({ divider: true });
  if (selected.length) {
    selected.forEach((item, idx) => {
      bagRows.push({
        label: idx === 0 ? "가방 종류 및 수량" : "",
        bagLabel: item.label,
        bagTag: item.tag,
        bagCount: `${item.count}개`,
      });
    });
  } else {
    bagRows.push({
      label: "가방 종류 및 수량",
      value: "선택한 가방이 없습니다",
    });
  }
  // 구분선 추가
  bagRows.push({ divider: true });
  // 총 금액
  const price = store.totalPrice;
  bagRows.push({
    label: "총 금액",
    value: isNaN(price) ? "원" : `${price.toLocaleString()}원`,
    highlight: true,
    cssClass: "total-price",
  });
  return bagRows;
}

// 결제방식
const selectedPayment = ref("");

// 결제 수단 텍스트와 아이콘 매핑
const paymentTexts = {
  bank: "계좌이체",
  card: "카드결제",
  phone: "휴대폰이체",
};
const paymentIcons = {
  toss: "/images/cr/yy_toss.png",
  naver: "/images/cr/yy_naver.png",
  kakao: "/images/cr/yy_kakao.png",
};

// 다음 단계 이동
function submitReservation() {
  if (!selectedPayment.value) {
    alert("결제 수단을 선택해주세요");
    return;
  }
  store.paymentMethod = selectedPayment.value;
  router.push("/yeyak5");
}
</script>

<template>
  <!-- 전체 -->
  <div class="wrap">
    <!-- 이너 -->
    <div class="st_wrap">
      <!-- 타이틀 -->
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>결제하기</h1>
        </div>
      </div>
      <!-- 본문 테두리 -->
      <div class="st_line">
        <!-- 본문 박스 -->
        <div class="payment-page">
          <!-- 요약 정보 -->
          <div class="payment-info-box">
            <!-- 구분선 -->
            <template v-for="(row, idx) in summaryRows" :key="idx">
              <hr v-if="row.divider" class="divider extended" />
              <!-- 예약자 정보 -->
              <div v-else class="info-row" :class="row.cssClass">
                <span class="label">{{ row.label }}</span>
                <!-- 가방 요약 -->
                <div v-if="row.bagLabel !== undefined" class="summary-item">
                  <span class="bag-label">{{ row.bagLabel }}</span>
                  <span class="bag-tag">{{ row.bagTag }}</span>
                  <span class="bag-count">{{ row.bagCount }}</span>
                </div>
                <!-- 일반 정보 -->
                <div
                  v-else
                  class="value"
                  :class="[row.highlight ? 'highlight' : '', row.cssClass]"
                >
                  <span>
                    {{ row.value }}
                  </span>
                </div>
              </div>
            </template>
          </div>
          <!-- 결제 수단 선택 -->
          <div class="payment">
            <div class="payment-wrap">
              <div class="payment-methods">
                <!-- 일반결제 -->
                <label
                  v-for="(val, key) in paymentTexts"
                  :key="key"
                  class="payment-option my-button"
                  :class="{ active: selectedPayment === key }"
                >
                  <input
                    type="radio"
                    v-model="selectedPayment"
                    :value="key"
                    name="payment"
                    class="my-button"
                  />
                  {{ val }}
                </label>
                <!-- 간편결제 -->
                <div class="payment-icons-wrapper payment-icons-inline">
                  <span class="payment-label">간편결제</span>
                  <div class="payment-radio my-button">
                    <label
                      v-for="(src, key) in paymentIcons"
                      :key="key"
                      class="payment-image my-button"
                      :class="{ active: selectedPayment === key }"
                    >
                      <input
                        type="radio"
                        v-model="selectedPayment"
                        :value="key"
                        name="payment"
                        class="my-button"
                      />
                      <img
                        :src="src"
                        :alt="`${key} 아이콘`"
                        class="payment-icon my-button"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--버튼 -->
        <div class="button">
          <button
            class="my-button st_reser"
            @click="submitReservation"
            :disabled="!selectedPayment"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  font-family: $font-family;
}

// 타이틀
.yy_title1 {
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

.st_line {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid $border-gray;
  box-shadow: $box-shadow;
  border-radius: $radius;
  padding: 30px;
  overflow: visible;
  height: auto;
  background-color: #ffffff;
}

.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.payment-info-box {
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
}
.info-row {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 5px 20px;
  margin: 0;

  &.addr-start,
  &.addr-stop {
    font-weight: normal;
    font-size: 14px;
    color: #707070;
    padding: 1px 50px;
  }
  .label {
    width: 40%;
    text-align: right;
    margin-right: 15px;
    flex: 0 0 auto;
    color: #505050;
    font-size: 16px;
  }
  .value .summary-item {
    color: $dark-gray;
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: right;
    white-space: pre;
    font-weight: bold;
    &.addr-start,
    &.addr-stop {
      font-weight: normal;
      font-size: 14px;
      color: #707070;
    }
  }
}

//구분선
.divider.extended {
  border: none;
  border-top: 1px solid #d6d6d6;
  width: 100%;
  margin: 3px auto;
}

// 결제 수단
.payment {
  margin-bottom: 30px;
}
.payment-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.payment-methods {
  display: grid;
  height: 40px;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.payment-option {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid $border-gray;
  border-radius: $radius;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
  box-sizing: border-box;
  background-color: #fff;
  color: $dark-gray;

  input[type="radio"] {
    display: none;
  }

  .payment-icon {
    object-fit: contain;
    align-items: center;
  }

  &.active {
    background: color.adjust($blue-sky, $lightness: 10%);
    color: #fff;
  }

  &:hover:not(.active) {
    background: color.adjust($blue-sky, $lightness: 30%);
  }
}

.payment-icons-wrapper {
  display: flex;
  height: 40px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid $border-gray;
  border-radius: $radius;
  box-sizing: border-box;
  grid-column: span 3;
  color: $dark-gray;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-icons-inline {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}

.payment-label {
  display: flex;
  margin-right: auto;
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
  color: $dark-gray;
  text-align: left;
}

.payment-icons-inline {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 3px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;

  input[type="radio"] {
    display: inline-block !important;
    appearance: auto;
    margin: 0;
    cursor: pointer;
  }
}
.payment-radio {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 15px;
  justify-content: flex-end;
}
.payment-image {
  display: flex;
  gap: 5px;
  padding: 5px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;

  .payment-icon {
    max-height: 30px;
    width: auto;
  }

  &.active {
    background: color.adjust($blue-sky, $lightness: 10%);
    color: #fff;
    border-radius: $radius;
  }

  &:hover:not(.active) {
    background: color.adjust($blue-sky, $lightness: 30%);
    border-radius: $radius;
  }
}
.payment-methods {
  grid-auto-rows: 40px;
}

/* ── 진짜 높이·패딩·마진 완전 초기화 ── */
.payment-option,
.payment-icons-wrapper,
.payment-icons-inline,
.payment-radio {
  margin: 0;
  padding: 0 10px;
  height: 40px !important;
  box-sizing: border-box !important;
  line-height: normal !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 제출 버튼
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .st_reser {
    width: 120px;
    height: 40px;
    background-color: color.adjust($main-color, $lightness: 30%);
    color: #fff;
    font-size: 16px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
    margin: 15px;
    display: block;
  }
  .st_reser:hover {
    background-color: color.adjust($sub-color, $lightness: 20%) !important;
  }
}

.my-button {
  position: relative;
  z-index: 4000; /* fixed-buttons(1000)보다 높게 */
}
</style>
