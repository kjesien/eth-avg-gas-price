import useSWR from "swr";

export type timeframeType = "10m" | "30m" | "1h" | "2h" | "4h" | "1d";
interface OwlracleHistoryParameters {
  apikey: string;
  timeframe: timeframeType;
  from: string; // timestamp
  to: string; // timestamp
  candles: string; // number
  page: string; // number
  tokenprice: string; // boolean
  txfee: string; // boolean
}

interface OwlracleCandleDetails {
  open: number;
  close: number;
  low: number;
  high: number;
}

export interface OwlracleCandleData {
  timestamp: string;
  samples: number;
  avgGas: number;
  gasPrice: OwlracleCandleDetails;
  // tokenPrice: OwlracleCandleDetails;
  txFee: OwlracleCandleDetails;
}

export type OwlracleGasHistoryData = Array<OwlracleCandleData>;

export interface OwlracleGasHistoryResponse {
  candles: OwlracleGasHistoryData;
}

const getApiKey = () =>
  (window as any).OWRACLE_API_KEY ||
  process.env.NEXT_PUBLIC_OWLRACLE_API_KEY ||
  "";

export const fetchOwlracleData = async (
  timeframe: timeframeType,
): Promise<OwlracleGasHistoryResponse> => {
  const params: Partial<OwlracleHistoryParameters> = {
    apikey: getApiKey(),
    timeframe: timeframe,
    candles: "300",
    txfee: "true",
  };

  const res = await fetch(
    `https://api.owlracle.info/v4/eth/history?${new URLSearchParams(params)}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const useOwlracleData = (timeframe: timeframeType) => {
  return useSWR<OwlracleGasHistoryResponse>(
    `owlracle-history-data-${timeframe}`,
    () => fetchOwlracleData(timeframe),
  );
};
