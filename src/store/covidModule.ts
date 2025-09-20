import type {
  CovidState,
  GlobalStats,
  Country,
  CountryStatsResponse,
} from "../types";
import { getGlobalStats, getCountryStats } from "../api/covidApi";

export interface RootState {}

const covidModule = {
  namespaced: true,

  state: (): CovidState => ({
    globalStats: null,
    countries: [],
    selectedCountry: null,
    countryStats: [],
    loading: false,
    error: null,
    darkMode: localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  }),

  mutations: {
    setGlobalStats(state: CovidState, globalStats: GlobalStats) {
      state.globalStats = globalStats;
    },

    setCountries(state: CovidState, countries: Country[]) {
      state.countries = countries;
    },

    setSelectedCountry(state: CovidState, country: string | null) {
      state.selectedCountry = country;
    },

    setCountryStats(state: CovidState, stats: CountryStatsResponse[]) {
      state.countryStats = stats;
    },

    setLoading(state: CovidState, loading: boolean) {
      state.loading = loading;
    },

    setError(state: CovidState, error: string | null) {
      state.error = error;
    },

    toggleDarkMode(state: CovidState) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());

      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    initializeDarkMode(state: CovidState) {
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },

  actions: {
    async fetchGlobalStats({ commit }: any) {
      try {
        commit("setLoading", true);
        commit("setError", null);

        const data = await getGlobalStats();
        commit("setGlobalStats", data.Global);
        commit("setCountries", data.Countries);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch global statistics";
        commit("setError", errorMessage);
        console.error("Error fetching global stats:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchCountryStats({ commit, state }: any, country?: string) {
      const targetCountry = country || state.selectedCountry;
      if (!targetCountry) return;

      try {
        commit("setLoading", true);
        commit("setError", null);

        const data = await getCountryStats(targetCountry);
        const recentData = data.slice(-30);
        commit("setCountryStats", recentData);

        if (country) {
          commit("setSelectedCountry", country);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch country statistics";
        commit("setError", errorMessage);
        console.error("Error fetching country stats:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    initializeApp({ commit, dispatch }: any) {
      commit("initializeDarkMode");
      dispatch("fetchGlobalStats");
    },
  },

  getters: {
    countriesList: (state: CovidState): string[] => {
      return state.countries
        .map((country: Country) => country.Country)
        .filter((country: string) => country && country.trim() !== "")
        .filter(
          (country: string) =>
            !country.includes("Diamond Princess") &&
            !country.includes("MS Zaandam")
        ) // Filter out cruise ships
        .sort((a: string, b: string) => a.localeCompare(b));
    },

    isLoading: (state: CovidState): boolean => state.loading,

    hasError: (state: CovidState): boolean => !!state.error,

    getCountryBySlug:
      (state: CovidState) =>
      (slug: string): Country | undefined => {
        return state.countries.find(
          (country: Country) => country.Slug === slug
        );
      },

    chartData: (state: CovidState) => {
      if (!state.countryStats.length) return null;

      return {
        labels: state.countryStats.map((stat: CountryStatsResponse) =>
          new Date(stat.Date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        ),
        datasets: [
          {
            label: "Confirmed Cases",
            data: state.countryStats.map(
              (stat: CountryStatsResponse) => stat.Confirmed
            ),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
          },
          {
            label: "Deaths",
            data: state.countryStats.map(
              (stat: CountryStatsResponse) => stat.Deaths
            ),
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            tension: 0.4,
          },
          {
            label: "Recovered",
            data: state.countryStats.map(
              (stat: CountryStatsResponse) => stat.Recovered
            ),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
          },
        ],
      };
    },
  },
};

export default covidModule;
