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
import { defineProps, defineEmits } from "vue";

// props 정의
const props = defineProps({
  steps: Array,
  currentStep: Number,
  show: Boolean,
});

// Parent에게 이벤트를 올릴 emit 정의
const emit = defineEmits(["prev", "next", "go"]);
</script>

<template>
  <transition name="stepper-fade">
    <div v-show="show" class="sticky-stepper">
      <!-- 좌측 페이드 아웃 오버레이 -->
      <div class="fade-overlay fade-left"></div>
      <!-- Prev 버튼 -->
      <div class="step-nav">
        <button @click="emit('prev')" :disabled="props.currentStep === 1">
          <img src="/images/cr/down.png" class="rotate" alt="이전" />
        </button>
      </div>
      <!-- 실제 스텝바 -->
      <div class="stepper">
        <div
          v-for="(step, idx) in props.steps"
          :key="idx"
          :class="[
            'step',
            {
              done: idx < props.currentStep - 1,
              active: idx === props.currentStep - 1,
            },
          ]">
          <div class="wrap">
            <div
              class="circle"
              @click="emit('go', idx + 1)"
              style="cursor: pointer">
              {{ idx + 1 }}
            </div>
            <div class="label">{{ step }}</div>
          </div>
          <div v-if="idx < props.steps.length - 1" class="bar"></div>
        </div>
      </div>
      <!-- Next 버튼 -->
      <div class="step-nav">
        <button
          @click="emit('next')"
          :disabled="props.currentStep === props.steps.length">
          <img src="/images/cr/up.png" class="rotate" alt="다음" />
        </button>
      </div>
      <!-- 우측 페이드 아웃 오버레이 -->
      <div class="fade-overlay fade-right"></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/Main.scss" as *;
@use "@/assets/_Variables.scss" as *;

// ── 컨테이너 스타일 ──
.sticky-stepper {
  position: sticky;
  top: var(--sticky-top, 10px);
  left: 50;
  right: 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 5998;
  padding: 5px 10px;
  background: linear-gradient(
    to right,
    transparent 0px,
    transparent 50px,
    #fff 50px,
    #fff calc(100% - 50px),
    transparent calc(100% - 50px),
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-top: 3px solid #c1ebd0;
  border-bottom: 3px solid #c1ebd0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 55px;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  > * {
    position: relative;
    z-index: 6000;
  }
}

// ── Prev/Next 버튼 ──
.step-nav button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 25px;
    height: auto;
    transform: rotate(90deg);
    transition: filter 0.2s;
  }
  &:disabled img {
    filter: invert(100%) brightness(80%);
  }
}

// ── 스텝바 (원+레이블) ──
.stepper {
  flex: 1;
  display: flex;
  justify-content: space-between;
  position: relative;

  .step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    // 원 사이사이 2px 실선 구분
    & + .step {
      &::before {
        content: "";
        position: absolute;
        top: 25%;
        left: -50%;
        width: 100%;
        border-top: 3px solid #ddd;
        transform: translateY(-50%);
      }
    }

    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid #ddd;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      z-index: 2;
    }
    .label {
      margin-top: 4px;
      font-size: 13px;
      color: #555;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
}

// ── 액티브/완료 스타일 (예시) ──
.step.done .circle {
  background: #ccc;
  border-color: #ccc;
}
.step.active .circle {
  background: $sub-color;
  border-color: $sub-color;
  color: #fff;
}
.step.active .label {
  color: #571563;
  font-weight: bold;
}

/* transition 클래스 */
.stepper-fade-enter-from,
.stepper-fade-leave-to {
  opacity: 0;
  margin-top: -10px; /* 스티키 기준 위로 10px */
}
.stepper-fade-enter-to,
.stepper-fade-leave-from {
  opacity: 1;
  margin-top: 0;
}
</style>
