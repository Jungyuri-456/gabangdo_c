<template>
  <div class="flex justify-start items-center -ml-3 ">
    <label class="text-sm font-medium text-gray-700">{{ label }}</label>
    
    <!-- 기준일 선택 -->
    <!-- <select
      v-model="localValue"
      @change="$emit('change')"
      class="rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select> -->

    <!-- 날짜 범위 입력 -->
    <input
      type="date"
      v-model="localStart"
      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
    <span>~</span>
    <input
      type="date"
      v-model="localEnd"
      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  options: Array,
  modelValue: String,       // 기준일 선택 (today, week, month, all)
  startDate: String,        // 시작 날짜
  endDate: String,          // 종료 날짜
})

const emit = defineEmits([
  'update:modelValue',
  'update:startDate',
  'update:endDate',
  'change'
])

const localValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const localStart = computed({
  get: () => props.startDate,
  set: val => emit('update:startDate', val),
})

const localEnd = computed({
  get: () => props.endDate,
  set: val => emit('update:endDate', val),
})
</script>
