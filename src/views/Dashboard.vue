<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <header
      class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              COVID-19 Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <SunIcon v-if="darkMode" class="w-5 h-5 text-yellow-500" />
              <MoonIcon v-else class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <div class="flex items-center">
          <InformationCircleIcon
            class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2"
          />
          <p class="text-sm text-blue-800 dark:text-blue-200">
            <strong>Demo Mode:</strong> This dashboard uses demonstration data
            and fallback APIs. The data shown is for demonstration purposes and
            may not reflect real-time COVID-19 statistics.
          </p>
        </div>
      </div>

      <div
        v-if="error && !loading"
        class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
      >
        <div class="flex items-center">
          <ExclamationTriangleIcon
            class="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
          />
          <p class="text-sm text-red-800 dark:text-red-200">{{ error }}</p>
          <button
            @click="retryFetch"
            class="ml-auto btn-primary text-sm py-1 px-3"
          >
            Retry
          </button>
        </div>
      </div>

      <div
        v-if="loading && !globalStats"
        class="flex items-center justify-center py-12"
      >
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600 dark:text-gray-400">
            Loading global statistics...
          </p>
        </div>
      </div>

      <div v-else-if="globalStats" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Cases"
            :value="globalStats.TotalConfirmed"
            icon="users"
            color="blue"
            :change="
              calculateChange(
                globalStats.NewConfirmed,
                globalStats.TotalConfirmed
              )
            "
          />
          <DashboardCard
            title="Total Deaths"
            :value="globalStats.TotalDeaths"
            icon="warning"
            color="red"
            :change="
              calculateChange(globalStats.NewDeaths, globalStats.TotalDeaths)
            "
          />
          <DashboardCard
            title="Total Recovered"
            :value="globalStats.TotalRecovered"
            icon="heart"
            color="green"
            :change="
              calculateChange(
                globalStats.NewRecovered,
                globalStats.TotalRecovered
              )
            "
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-1">
            <CountrySelector />
          </div>
          <div class="lg:col-span-2">
            <LineChart
              :chart-data="chartData"
              :title="chartTitle"
              :subtitle="chartSubtitle"
            />
          </div>
        </div>

        <AnalyticsPanel :global-stats="globalStats" :countries="countries" />

        <div
          v-if="selectedCountry && countryStats.length > 0"
          class="dashboard-card"
        >
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4"
          >
            {{ selectedCountry }} - Latest Statistics
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ latestStats.Confirmed?.toLocaleString() || "N/A" }}
              </p>
              <p class="text-sm text-blue-800 dark:text-blue-200">Confirmed</p>
            </div>
            <div
              class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
            >
              <p class="text-2xl font-bold text-red-600 dark:text-red-400">
                {{ latestStats.Deaths?.toLocaleString() || "N/A" }}
              </p>
              <p class="text-sm text-red-800 dark:text-red-200">Deaths</p>
            </div>
            <div
              class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                {{ latestStats.Recovered?.toLocaleString() || "N/A" }}
              </p>
              <p class="text-sm text-green-800 dark:text-green-200">
                Recovered
              </p>
            </div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Last updated: {{ formatDate(latestStats.Date) }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
// @ts-ignore
import { useStore } from "vuex";
import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import DashboardCard from "../components/DashboardCard.vue";
import LineChart from "../components/LineChart.vue";
import CountrySelector from "../components/CountrySelector.vue";
import AnalyticsPanel from "../components/AnalyticsPanel.vue";

const store = useStore();

const globalStats = computed(() => store.state.covid.globalStats);
const countries = computed(() => store.state.covid.countries);
const loading = computed(() => store.state.covid.loading);
const error = computed(() => store.state.covid.error);
const darkMode = computed(() => store.state.covid.darkMode);
const selectedCountry = computed(() => store.state.covid.selectedCountry);
const countryStats = computed(() => store.state.covid.countryStats);
const chartData = computed(() => store.getters["covid/chartData"]);

const chartTitle = computed(() => {
  return selectedCountry.value
    ? `COVID-19 Trends - ${selectedCountry.value}`
    : "COVID-19 Trends";
});

const chartSubtitle = computed(() => {
  if (!selectedCountry.value) return "Select a country to view historical data";
  const days = countryStats.value.length;
  return `Last ${days} days of data`;
});

const latestStats = computed(() => {
  if (!countryStats.value.length) return {};
  return countryStats.value[countryStats.value.length - 1];
});

const calculateChange = (newValue: number, totalValue: number): number => {
  if (!totalValue || totalValue === 0) return 0;
  return Math.round((newValue / totalValue) * 100 * 100) / 100;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const toggleDarkMode = () => {
  store.commit("covid/toggleDarkMode");
};

const retryFetch = () => {
  store.dispatch("covid/fetchGlobalStats");
};

onMounted(() => {
  store.dispatch("covid/initializeApp");
});
</script>
