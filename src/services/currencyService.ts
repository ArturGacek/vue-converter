import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export async function fetchCurrencies() {
  const response = await axios.get(`${BASE_URL}/currencies?api_key=${API_KEY}`);
  
  return response.data.response.map((entry: Currency) => ({
    code: entry.short_code,
    name: entry.name,
  }));
}

export async function convertCurrency(from: string, to: string, amount: number) {
  const response = await axios.get(`${BASE_URL}/convert`, {
    params: { api_key: API_KEY, from, to, amount },
  });

  return {
    toValue: response.data.response.value
  };
}