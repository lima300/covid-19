<template>
  <div class="dashboard-card">
    <div class="mb-4">
      <label
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Select Country
      </label>
      <div class="relative">
        <select
          v-model="selectedCountry"
          @change="handleCountryChange"
          class="select-field w-full pr-10 appearance-none"
          :disabled="loading"
        >
          <option value="">Choose a country...</option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <ChevronDownIcon
          class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        />
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-4">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
      ></div>
      <span class="ml-2 text-sm text-gray-600 dark:text-gray-400"
        >Loading data...</span
      >
    </div>

    <div
      v-if="error"
      class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <div class="flex items-center">
        <ExclamationTriangleIcon
          class="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
        />
        <p class="text-sm text-red-800 dark:text-red-200">{{ error }}</p>
      </div>
    </div>

    <div
      v-if="selectedCountryInfo"
      class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
    >
      <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
        Selected Country Data
      </h4>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-blue-700 dark:text-blue-300">Total Cases:</span>
          <span class="font-medium text-blue-900 dark:text-blue-100 ml-2">
            {{ selectedCountryInfo.TotalConfirmed.toLocaleString() }}
          </span>
        </div>
        <div>
          <span class="text-blue-700 dark:text-blue-300">Total Deaths:</span>
          <span class="font-medium text-blue-900 dark:text-blue-100 ml-2">
            {{ selectedCountryInfo.TotalDeaths.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import type { Country } from "../types";

const store = useStore();
const selectedCountry = ref<string>("");

const countries = computed(() => store.getters["covid/countriesList"]);
const loading = computed(() => store.getters["covid/isLoading"]);
const error = computed(() => store.state.covid.error);

const selectedCountryInfo = computed((): Country | null => {
  if (!selectedCountry.value) return null;
  return (
    store.state.covid.countries.find(
      (country: Country) => country.Country === selectedCountry.value
    ) || null
  );
});

const handleCountryChange = () => {
  if (selectedCountry.value) {
    const country = store.state.covid.countries.find(
      (c: Country) => c.Country === selectedCountry.value
    );
    if (country) {
      store.dispatch("covid/fetchCountryStats", country.Slug);
    }
  }
};

onMounted(() => {
  if (!countries.value.length) {
    store.dispatch("covid/fetchGlobalStats");
  }
});
</script>
