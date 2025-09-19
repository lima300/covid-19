<template>
  <div class="dashboard-card">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
      Global COVID-19 Analytics
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Recovery Rate</span
          >
          <span class="text-lg font-bold text-green-600 dark:text-green-400"
            >{{ recoveryRate }}%</span
          >
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${recoveryRate}%` }"
          ></div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Mortality Rate</span
          >
          <span class="text-lg font-bold text-red-600 dark:text-red-400"
            >{{ mortalityRate }}%</span
          >
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-red-600 h-2 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${mortalityRate * 10}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ activeRate }}%
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Active Cases</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {{ newCasesRate }}%
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">New Cases</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ affectedCountries }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Countries Affected
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { GlobalStats, Country } from "../types";

interface Props {
  globalStats: GlobalStats | null;
  countries: Country[];
}

const props = defineProps<Props>();

const recoveryRate = computed(() => {
  if (!props.globalStats || props.globalStats.TotalConfirmed === 0) return 0;
  return Math.round(
    (props.globalStats.TotalRecovered / props.globalStats.TotalConfirmed) * 100
  );
});

const mortalityRate = computed(() => {
  if (!props.globalStats || props.globalStats.TotalConfirmed === 0) return 0;
  return (
    Math.round(
      (props.globalStats.TotalDeaths / props.globalStats.TotalConfirmed) *
        100 *
        100
    ) / 100
  );
});

const activeRate = computed(() => {
  if (!props.globalStats || props.globalStats.TotalConfirmed === 0) return 0;
  const active =
    props.globalStats.TotalConfirmed -
    props.globalStats.TotalRecovered -
    props.globalStats.TotalDeaths;
  return Math.round((active / props.globalStats.TotalConfirmed) * 100);
});

const newCasesRate = computed(() => {
  if (!props.globalStats || props.globalStats.TotalConfirmed === 0) return 0;
  return (
    Math.round(
      (props.globalStats.NewConfirmed / props.globalStats.TotalConfirmed) *
        100 *
        100
    ) / 100
  );
});

const affectedCountries = computed(() => {
  return props.countries.filter((country) => country.TotalConfirmed > 0).length;
});
</script>
