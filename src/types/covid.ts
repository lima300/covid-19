export interface GlobalStats {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface Country {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}

export interface CountryStatsResponse {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

export interface SummaryResponse {
  Global: GlobalStats;
  Countries: Country[];
  Date: string;
}

export interface CovidState {
  globalStats: GlobalStats | null;
  countries: Country[];
  selectedCountry: string | null;
  countryStats: CountryStatsResponse[];
  loading: boolean;
  error: string | null;
  darkMode: boolean;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DashboardCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
}
