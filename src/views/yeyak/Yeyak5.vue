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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useReservationStore } from "@/stores/reservationStore";

// 1) 스토어 & 라우터
const store = useReservationStore();
const router = useRouter();

// 2) 예약번호 생성
function generateReservationNumber(digits = 4) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const dd = String(now.getDate()).padStart(2, "0");
  const max = 4 ** digits;
  const rnd = String(Math.floor(Math.random() * max)).padStart(digits, "0");
  return `R${yy}${dd}${rnd}`;
}
const reservationNumber = ref(generateReservationNumber());

// 3) 가방 및 총액 요약 헬퍼
function makeBagRows(sizes, totalPrice) {
  const bagRows = [];
  const selected = sizes.filter((i) => i.count > 0);

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
      bagLabel: "",
      bagTag: "",
      bagCount: "선택한 가방이 없습니다.",
    });
  }

  // 총 금액
  const price = store.totalPrice;
  bagRows.push({
    label: "총 금액",
    value: isNaN(price) ? "0원" : `${price.toLocaleString()}원`,
    highlight: true,
    cssClass: "total-price",
  });
  return bagRows;
}

// 4) 결제방식 명칭 매핑
const paymentNames = {
  bank: "계좌이체",
  card: "카드결제",
  phone: "휴대폰이체",
  toss: "토스",
  naver: "네이버페이",
  kakao: "카카오페이",
};

// 5) 전체 요약 테이블 생성
const summaryRows = computed(() => {
  const rows = [
    { label: "예약번호", value: reservationNumber.value },
    { label: "이름", value: store.name },
    { label: "전화번호", value: store.fullPhone },
    {
      label: "이용날짜 및 시간",
      value: `${store.selectedDate}\u00A0\u00A0${store.selectedTime}`,
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

  rows.push(...makeBagRows(store.sizes, store.totalPrice));
  rows.push({
    label: "결제방식",
    value: paymentNames[store.paymentMethod] || "선택안됨",
  });
  return rows;
});

// 6) 버튼 핸들러
function goToNextStep() {
  router.push("/");
}
</script>

<template>
  <div class="wrap">
    <div class="st_wrap">
      <!-- 제목 영역 -->
      <div class="yy_title1">
        <div class="title_txt1"><h1>예약완료</h1></div>
      </div>

      <!-- 본문 박스 -->
      <div class="st_line">
        <div class="payment-page">
          <!-- 요약 정보 -->
          <div class="payment-info-box">
            <div v-for="(row, idx) in summaryRows" :key="idx" class="info-row">
              <span class="label">{{ row.label }}</span>

              <!-- 가방 요약 행 -->
              <div v-if="row.bagLabel !== undefined" class="summary-item">
                <span class="bag-label">{{ row.bagLabel }}</span>
                <span class="bag-tag">{{ row.bagTag }}</span>
                <span class="bag-count">{{ row.bagCount }}</span>
              </div>

              <!-- 일반 정보 행 -->
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

          <!-- 돌아가기 버튼 -->
          <div class="button">
            <button class="my-button st_reser" @click="goToNextStep">
              처음으로
            </button>
          </div>
        </div>
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
} // 제출 버튼
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
