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

// Pinia 스토어 & 라우터
const store = useReservationStore();
const router = useRouter();

// 가방 + 총 금액 행 생성
function makeBagRows(sizes) {
  console.log("▶ sizes:", sizes, "▶ price:", store.totalPrice.value);

  const bagRows = [];
  const selected = sizes.filter((i) => i.count > 0);

  if (selected.length) {
    selected.forEach((item, i) => {
      bagRows.push({
        label: i === 0 ? "가방 종류 및 수량" : "",
        bagLabel: item.label,
        bagTag: item.tag,
        bagCount: `${item.count}개`,
      });
    });
  } else {
    bagRows.push({
      label: "가방 종류 및 수량",
      bagLabel: "",
      bagTag: "",
      bagCount: "선택한 가방이 없습니다.",
    });
  }

  const price = store.totalPrice;
  bagRows.push({
    label: "총 금액",
    value: isNaN(price) ? "0원" : `${price.toLocaleString()}원`,
    highlight: true,
    cssClass: "total-price",
  });

  return bagRows;
}

// 오늘 날짜 포맷
function getTodayFormatted() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}년 ${m}월 ${d}일`;
}

// 페이지 진입 시 가격 조정
onMounted(() => {
  if (store.selectedDate === getTodayFormatted()) {
    store.handleTodaySelected();
  } else {
    store.resetPrices();
  }
});

// 요약 배열
const summaryRows = computed(() => {
  const rows = [
    { label: "이름", value: store.name },
    { label: "전화번호", value: store.fullPhone },
    {
      label: "이용날짜 및 시간",
      value: `${store.selectedDate}  ${store.selectedTime}`,
    },
  ];

  if (store.selectedStart || store.selectedStop) {
    rows.push({
      label: "출발 → 도착",
      value: `${store.selectedStart || "출발지 없음"} → ${
        store.selectedStop || "도착지 없음"
      }`,
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

  rows.push(...makeBagRows(store.sizes));
  return rows;
});

// 결제 수단 선택 후 이동
const selectedPayment = ref("");
function submitReservation() {
  if (!selectedPayment.value) {
    alert("결제 수단을 선택해주세요.");
    return;
  }
  store.paymentMethod = selectedPayment.value;
  router.push("/yeyak5");
}

// ✅ 결제 수단
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
</script>

<template>
  <div class="wrap">
    <div class="st_wrap">
      <!-- 제목 영역 -->
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>결제하기</h1>
        </div>
      </div>

      <!-- 본문 박스 -->
      <div class="st_line">
        <!-- 예약 정보 요약 -->
        <div class="payment-info-box">
          <div v-for="(row, idx) in summaryRows" :key="idx" class="info-row">
            <span class="label">{{ row.label }}</span>

            <div v-if="row.bagLabel !== undefined" class="summary-item">
              <span class="bag-label">{{ row.bagLabel }}</span>
              <span class="bag-tag">{{ row.bagTag }}</span>
              <span class="bag-count">{{ row.bagCount }}</span>
            </div>
            <template v-else>
              <span
                class="value"
                :class="[row.highlight ? 'highlight' : '', row.cssClass]"
              >
                {{ row.value }}
              </span>
            </template>
          </div>
        </div>

        <!-- 결제 수단 선택 영역 -->
        <div class="payment-wrap">
          <div class="payment-methods">
            <!-- 일반 결제 수단 버튼들 -->
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

            <!-- 간편결제 섹션 -->
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

        <!-- 결제 버튼 -->
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
      <!-- .st_line 끝 -->
    </div>
    <!-- .st_wrap 끝 -->
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
  max-width: 550px;
  // border: 1px solid $border-gray;
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
  background: #f8f9fa;
  border-radius: $radius;
  padding: 20px;
  margin-bottom: 30px;

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px dashed $border-gray;
    padding: 10px 0;
    margin: 0;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .label {
      flex: 0 0 auto;
      margin-right: 15px;
      font-weight: 500;
      color: #505050;
      font-size: 17px;
    }

    .value {
      flex: 1;
      font-weight: 600;
      color: $dark-gray;
      font-size: 15px;
      text-align: right;
      white-space: pre;

      &.highlight {
        font-size: 16px;
        font-weight: 600;
        color: #00bfa5;
      }

      &.addr-start,
      &.addr-stop {
        font-size: 13px;
        color: #707070;
        margin-top: 2px;
        text-align: right;
      }
    }
  }
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  text-align: right;

  .bag-label {
    color: $dark-gray;
  }

  .bag-tag {
    font-size: 13px;
    color: color.adjust($dark-gray, $lightness: 20%);
  }

  .bag-count {
    font-weight: 600;
    color: $blue-sky;
  }
}
// 결제 수단
.payment-wrap {
  display: flex;
  flex-direction: column;
  align-items: center; // ✅ 내부 항목 수평 가운데
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}

.payment-methods {
  display: grid;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.payment-option {
  display: flex;
  height: 44px;
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
    display: none; // 텍스트 항목에서는 라디오 숨김
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
  height: 44px;
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
  height: 44px;
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
  height: 44px;
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
  height: 44px;
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
    max-height: 30px; // 아이콘 크기 고정
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
  grid-auto-rows: 44px; /* 모든 그리드 행을 44px로 강제 */
}

/* ── 진짜 높이·패딩·마진 완전 초기화 ── */
.payment-option,
.payment-icons-wrapper,
.payment-icons-inline,
.payment-radio {
  margin: 0; /* 기본 마진 제거 */
  padding: 0 10px; /* 위/아래 0, 좌/우 10px */
  height: 44px !important; /* 고정 높이 */
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
