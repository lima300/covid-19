import axios from "axios";
import type { SummaryResponse, CountryStatsResponse } from "../types";
import { mockSummaryResponse, generateMockCountryStats } from "./mockData";

const API_BASE_URL = "https://disease.sh/v3/covid-19";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching data"
    );
  }
);

export const getGlobalStats = async (): Promise<SummaryResponse> => {
  try {
    const [globalResponse, countriesResponse] = await Promise.all([
      apiClient.get("/all"),
      apiClient.get("/countries"),
    ]);

    const globalData = globalResponse.data;
    const countriesData = countriesResponse.data;

    // Transform disease.sh data to match our expected format
    const transformedResponse: SummaryResponse = {
      Global: {
        NewConfirmed: globalData.todayCases || 0,
        TotalConfirmed: globalData.cases || 0,
        NewDeaths: globalData.todayDeaths || 0,
        TotalDeaths: globalData.deaths || 0,
        NewRecovered: globalData.todayRecovered || 0,
        TotalRecovered: globalData.recovered || 0,
      },
      Countries: countriesData.slice(0, 20).map((country: any) => ({
        Country: country.country,
        CountryCode: country.countryInfo.iso2 || "",
        Slug: country.country.toLowerCase().replace(/\s+/g, "-"),
        NewConfirmed: country.todayCases || 0,
        TotalConfirmed: country.cases || 0,
        NewDeaths: country.todayDeaths || 0,
        TotalDeaths: country.deaths || 0,
        NewRecovered: country.todayRecovered || 0,
        TotalRecovered: country.recovered || 0,
        Date: new Date().toISOString(),
      })),
      Date: new Date().toISOString(),
    };

    return transformedResponse;
  } catch (error) {
    console.warn("API unavailable, using mock data:", error);
    return mockSummaryResponse;
  }
};

export const getCountries = async (): Promise<
  Array<{ Country: string; Slug: string; ISO2: string }>
> => {
  try {
    const response = await apiClient.get("/countries");
    return response.data.slice(0, 20).map((country: any) => ({
      Country: country.country,
      Slug: country.country.toLowerCase().replace(/\s+/g, "-"),
      ISO2: country.countryInfo.iso2 || "",
    }));
  } catch (error) {
    console.warn("Countries API unavailable, using mock data:", error);
    return mockSummaryResponse.Countries.map((country) => ({
      Country: country.Country,
      Slug: country.Slug,
      ISO2: country.CountryCode,
    }));
  }
};

export const getCountryStats = async (
  country: string
): Promise<CountryStatsResponse[]> => {
  try {
    const response = await apiClient.get(`/countries/${country}`);
    const countryData = response.data;

    // Create simulated historical data for the last 30 days
    const historicalData: CountryStatsResponse[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Simulate gradual increase in numbers over time
      const factor = (30 - i) / 30;

      historicalData.push({
        Country: countryData.country,
        CountryCode: countryData.countryInfo.iso2 || "",
        Province: "",
        City: "",
        CityCode: "",
        Lat: countryData.countryInfo.lat?.toString() || "0",
        Lon: countryData.countryInfo.long?.toString() || "0",
        Confirmed: Math.floor((countryData.cases || 0) * factor),
        Deaths: Math.floor((countryData.deaths || 0) * factor),
        Recovered: Math.floor((countryData.recovered || 0) * factor),
        Active: Math.floor((countryData.active || 0) * factor),
        Date: date.toISOString(),
      });
    }

    return historicalData;
  } catch (error) {
    console.warn("Country stats API unavailable, using mock data:", error);
    return generateMockCountryStats(country);
  }
};

export const getCountryStatsByDate = async (
  country: string,
  _from: string,
  _to: string
): Promise<CountryStatsResponse[]> => {
  // For now, we'll use the same function as getCountryStats
  // In a real application, you would filter by the date range
  return getCountryStats(country);
};
