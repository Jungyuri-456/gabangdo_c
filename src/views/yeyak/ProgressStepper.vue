<template>
  <transition name="stepper-fade">
    <div class="sticky-stepper" ref="stepperEl">
      <!-- Prev 버튼 -->
      <div class="step-nav">
        <button @click="goPrev" :disabled="stepIndex === 1">
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
            { done: idx < stepIndex - 1, active: idx === stepIndex - 1 },
          ]">
          <div class="wrap">
            <div class="circle" @click="goTo(idx + 1)">{{ idx + 1 }}</div>
            <div v-if="idx < props.steps.length - 1" class="bar"></div>
            <div class="label">{{ step }}</div>
          </div>
        </div>
      </div>
      <!-- Next 버튼 -->
      <div class="step-nav">
        <button @click="goNext" :disabled="stepIndex === props.steps.length">
          <img src="/images/cr/up.png" class="rotate" alt="다음" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";

const props = defineProps({
  steps: { type: Array, required: true },
  selectors: { type: Array, required: true },
});
const emit = defineEmits(["go"]);

const stepIndex = ref(1);
const sectionEls = [];
let observer = null;
const stepperEl = ref(null);

// 스텝 이동 함수
function goTo(idx) {
  const clamped = Math.min(Math.max(1, idx), sectionEls.length);
  const el = sectionEls[clamped - 1];
  if (!el) return;
  stepIndex.value = clamped;
  // 스텝퍼 위치 재계산
  updateStepperPosition();
  // 스크롤
  const offset =
    (stepperEl.value?.getBoundingClientRect().height || 0) + headerGap;
  window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
  emit("go", clamped);
}
const goPrev = () => goTo(stepIndex.value - 1);
const goNext = () => goTo(stepIndex.value + 1);

const headerGap = 90; // 헤더 높이 75 + gap 15

// 스텝퍼 위치 재계산 (bottom 맞춤)
function updateStepperPosition() {
  const sp = stepperEl.value;
  if (!sp) return;
  const idx = stepIndex.value - 1;
  const sec = sectionEls[idx];
  const title = sec?.querySelector(".st_section-title");
  if (!title) return;
  const h = sp.getBoundingClientRect().height;
  const margin = 10;
  const newTop = title.offsetTop - h - margin;
  sp.style.top = newTop + "px";
}

onMounted(() => {
  nextTick(() => {
    // 섹션 요소 수집
    props.selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) sectionEls.push(el);
    });
    // IntersectionObserver for active step
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sectionEls.indexOf(e.target);
            if (i !== -1 && stepIndex.value !== i + 1) {
              stepIndex.value = i + 1;
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionEls.forEach((el) => observer.observe(el));
    // 초기 위치
    updateStepperPosition();
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

// active 변경 시 위치 업데이트
watch(stepIndex, () => updateStepperPosition());
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/Main.scss" as *;
@use "/src/assets/Variables.scss" as *;

.sticky-stepper {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 6000;
  /* top은 JS에서 동적으로 설정 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background: linear-gradient(
    to right,
    transparent 0,
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
}
/* Prev/Next 버튼 */
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
.stepper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.step {
  display: flex;
  align-items: center;
  position: relative;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.bar {
  flex: 1;
  height: 3px;
  background: #ddd;
  margin: 0 -4px;
  z-index: 1;
}

.circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
}

.label {
  margin-top: 6px;
  font-size: 14px;
  color: #555;
  text-align: center;
}

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

.stepper-fade-enter-from,
.stepper-fade-leave-to {
  opacity: 0;
  margin-top: -10px;
}
.stepper-fade-enter-to,
.stepper-fade-leave-from {
  opacity: 1;
  margin-top: 0;
}
</style>
