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
import CustomSelect from "./CustomSelect.vue";

const router = useRouter();
const name = ref("");
const telPrefix = ref("010");
const phoneRaw = ref("");
const reservationNumber = ref("");

// 연락처 포맷터: 8자리 숫자 -> 4자리-4자리 형식
const formattedNumber = computed({
  get() {
    const digits = phoneRaw.value.replace(/\D/g, "").slice(0, 8);
    return digits.length > 4
      ? `${digits.slice(0, 4)}-${digits.slice(4)}`
      : digits;
  },
  set(val) {
    phoneRaw.value = val.replace(/\D/g, "").slice(0, 8);
  },
});

// 예시: 버튼 클릭 시 페이지 이동
function goToLookup() {
  router.push("/yeyaklookup2");
}
</script>

<template>
  <div class="wrap">
    <div class="st_wrap">
      <div class="yy_title1">
        <div class="title_txt1">
          <h1>예약조회</h1>
        </div>
      </div>

      <div class="st_line">
        <div class="container">
          <!-- 1. 이름 입력 -->
          <div class="info-row">
            <div class="name-input">
              <input v-model="name" placeholder="이름 입력" />
            </div>
          </div>

          <!-- 2. 연락처 입력 -->
          <div class="info-row">
            <div class="phone-input my-button">
              <CustomSelect
                v-model="telPrefix"
                :options="[
                  { value: '010', label: '010' },
                  { value: '011', label: '011' },
                  { value: '016', label: '016' },
                  { value: '017', label: '017' },
                  { value: '018', label: '018' },
                  { value: '019', label: '019' },
                ]"
                placeholder="전화번호 앞자리"
              />
              <input
                v-model="formattedNumber"
                maxlength="9"
                placeholder="전화번호 입력(8자리)"
                class="datetime-input"
              />
            </div>
          </div>

          <!-- 3. 예약번호 입력 -->
          <div class="info-row">
            <div class="lookup">
              <input
                class="st_look"
                v-model="reservationNumber"
                type="text"
                placeholder="예약번호를 입력해주세요."
              />
            </div>
          </div>
        </div>
        <!-- 조회 버튼 -->
        <div class="button">
          <button class="my-button st_reser" @click="goToLookup">
            조회하기
          </button>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: $font-family;
}

.yy_title1 {
  display: flex;
  gap: 10px;
  line-height: 40px;
  flex-wrap: wrap; /* 넘치면 자동 줄바꿈 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  padding-bottom: 30px;
  .title_txt1 h1 {
    font-size: 40px;
    font-family: $font-gothic;
  }
}

.st_line {
  min-width: 0;
  width: 100%;
  max-width: 600px;
  border: 1px solid $border-gray;
  box-shadow: $box-shadow;
  border-radius: $radius;
  padding: 30px;
  overflow: visible;
  height: auto;
  background-color: #ffffff;
}

.container {
  width: 100%;
  // background: #f8f9fa;
  border-radius: $radius;
  padding: 20px;
  margin-bottom: 30px;
}

// 입력 필드
:deep(input) ::placeholder {
  color: $dark-gray;
  opacity: 1;
}
input,
select {
  width: 100%;
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
//이름
.name-input {
  gap: 10px;
  display: flex;
  height: 44px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;
}
// 전화번호
.phone-input {
  display: flex;
  gap: 10px;
  height: 44px;
  width: 100%;
  color: $dark-gray;
  margin-bottom: 10px;

  input {
    flex: 1;
    height: 44px;
    border-radius: $radius;
    padding: 10px;
    border: 1px solid $border-gray;
    color: $dark-gray;
  }
}

:deep(.phone-input select:focus),
:deep(.phone-input input:focus) {
  outline: 3px solid $blue-sky !important;
  outline-offset: -2px !important;
}

.lookup {
  display: flex;
  gap: 10px;
  height: 44px;
  width: 100%;
  color: $dark-gray;
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
