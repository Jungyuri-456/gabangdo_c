<template>
  <Pie :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "vue-chartjs";

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 차트 데이터
const data = {
  labels: ["1월", "2월", "3월", "4월" , "5월" , "6월"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16" , "#b4cf27" ,"#e18f10"],
      data: [30, 25, 50, 55, 21, 20],
    },
  ],
};

// 차트 옵션
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: '#fff',      // 글자 색상
      font: {
        weight: 'normal',
        size: 10,
      },
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return `${label} \n ${value}`;  // ex) "1월: 30"
      },
      // 텍스트 위치 중앙 배치
      anchor: 'center',
      align: 'end',
    },
  },
};
</script>
