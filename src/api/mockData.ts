import type {
  SummaryResponse,
  CountryStatsResponse,
  GlobalStats,
  Country,
} from "../types";

// Mock data as fallback when APIs are unavailable
export const mockGlobalStats: GlobalStats = {
  NewConfirmed: 285420,
  TotalConfirmed: 704753890,
  NewDeaths: 1843,
  TotalDeaths: 7010681,
  NewRecovered: 182730,
  TotalRecovered: 675834729,
};

export const mockCountries: Country[] = [
  {
    Country: "United States",
    CountryCode: "US",
    Slug: "united-states",
    NewConfirmed: 45680,
    TotalConfirmed: 103436829,
    NewDeaths: 234,
    TotalDeaths: 1123836,
    NewRecovered: 28945,
    TotalRecovered: 100234567,
    Date: new Date().toISOString(),
  },
  {
    Country: "India",
    CountryCode: "IN",
    Slug: "india",
    NewConfirmed: 12450,
    TotalConfirmed: 44690738,
    NewDeaths: 89,
    TotalDeaths: 530779,
    NewRecovered: 11890,
    TotalRecovered: 44095845,
    Date: new Date().toISOString(),
  },
  {
    Country: "Brazil",
    CountryCode: "BR",
    Slug: "brazil",
    NewConfirmed: 8920,
    TotalConfirmed: 37412240,
    NewDeaths: 156,
    TotalDeaths: 704659,
    NewRecovered: 7834,
    TotalRecovered: 36234892,
    Date: new Date().toISOString(),
  },
  {
    Country: "France",
    CountryCode: "FR",
    Slug: "france",
    NewConfirmed: 5670,
    TotalConfirmed: 39919827,
    NewDeaths: 45,
    TotalDeaths: 174507,
    NewRecovered: 5234,
    TotalRecovered: 39234567,
    Date: new Date().toISOString(),
  },
  {
    Country: "Germany",
    CountryCode: "DE",
    Slug: "germany",
    NewConfirmed: 4320,
    TotalConfirmed: 38437756,
    NewDeaths: 67,
    TotalDeaths: 174979,
    NewRecovered: 3890,
    TotalRecovered: 37845623,
    Date: new Date().toISOString(),
  },
];

export const mockSummaryResponse: SummaryResponse = {
  Global: mockGlobalStats,
  Countries: mockCountries,
  Date: new Date().toISOString(),
};

export const generateMockCountryStats = (
  countryName: string
): CountryStatsResponse[] => {
  const baseData =
    mockCountries.find((c) => c.Country === countryName) || mockCountries[0];
  const historicalData: CountryStatsResponse[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate gradual increase over time
    const factor = (30 - i) / 30;
    const dailyVariation = 0.95 + Math.random() * 0.1; // Add some realistic variation

    historicalData.push({
      Country: baseData.Country,
      CountryCode: baseData.CountryCode,
      Province: "",
      City: "",
      CityCode: "",
      Lat: "0",
      Lon: "0",
      Confirmed: Math.floor(baseData.TotalConfirmed * factor * dailyVariation),
      Deaths: Math.floor(baseData.TotalDeaths * factor * dailyVariation),
      Recovered: Math.floor(baseData.TotalRecovered * factor * dailyVariation),
      Active: Math.floor(
        (baseData.TotalConfirmed -
          baseData.TotalDeaths -
          baseData.TotalRecovered) *
          factor *
          dailyVariation
      ),
      Date: date.toISOString(),
    });
  }

  return historicalData;
};
