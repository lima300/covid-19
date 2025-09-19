<template>
  <div class="dashboard-card">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
    </div>
    <div class="relative" style="height: 400px">
      <Line
        v-if="chartData && chartData.datasets.length > 0"
        :data="chartData"
        :options="chartOptions"
      />
      <div
        v-else
        class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"
      >
        <div class="text-center">
          <ChartBarIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Select a country to view trends</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { ChartData } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  chartData: ChartData | null;
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "COVID-19 Trends",
  subtitle: "Historical data for the selected country",
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        color: document.documentElement.classList.contains("dark")
          ? "#e5e7eb"
          : "#374151",
      },
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      titleColor: document.documentElement.classList.contains("dark")
        ? "#e5e7eb"
        : "#374151",
      bodyColor: document.documentElement.classList.contains("dark")
        ? "#e5e7eb"
        : "#374151",
      borderColor: document.documentElement.classList.contains("dark")
        ? "#374151"
        : "#e5e7eb",
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        color: document.documentElement.classList.contains("dark")
          ? "#374151"
          : "#f3f4f6",
      },
      ticks: {
        color: document.documentElement.classList.contains("dark")
          ? "#9ca3af"
          : "#6b7280",
      },
    },
    y: {
      display: true,
      grid: {
        color: document.documentElement.classList.contains("dark")
          ? "#374151"
          : "#f3f4f6",
      },
      ticks: {
        color: document.documentElement.classList.contains("dark")
          ? "#9ca3af"
          : "#6b7280",
        callback: function (value: any) {
          return new Intl.NumberFormat().format(value);
        },
      },
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
    },
    line: {
      tension: 0.4,
    },
  },
}));
</script>
