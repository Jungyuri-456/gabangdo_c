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
import { defineProps } from "vue";
const props = defineProps({
  steps: Array,
  currentStep: Number,
});
</script>

<template>
  <div class="stepper">
    <div
      v-for="(step, idx) in steps"
      :key="idx"
      :class="[
        'step',
        { active: idx === currentStep, done: idx < currentStep },
      ]">
      <div class="wrap">
        <div class="circle">{{ idx + 1 }}</div>
        <div class="label">{{ step }}</div>
      </div>
      <div v-if="idx < steps.length - 1" class="bar"></div>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
}
.step {
  display: flex;
  align-items: center;
  position: relative;
}
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step.done .circle {
  background: #4caf50;
}
.step.active .circle {
  background: #2196f3;
}
.label {
  margin-left: 8px;
  margin-right: 8px;
  color: #777;
}
.step.active .label {
  color: #2196f3;
  font-weight: bold;
}
.bar {
  flex: 1;
  height: 2px;
  background: #ccc;
  margin-left: 8px;
  margin-right: 8px;
}
.step.done + .step .bar {
  background: #4caf50;
}
</style>
