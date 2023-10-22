import useSWR from "swr";

interface OwlracleHistoryParameters {
  apikey: string;
  timeframe:
    | "10m"
    | "30m"
    | "1h"
    | "2h"
    | "4h"
    | "1d"
    | "10"
    | "30"
    | "60"
    | "120"
    | "240"
    | "1440";
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

export const fetchOwlracleData =
  async (): Promise<OwlracleGasHistoryResponse> => {
    const params: Partial<OwlracleHistoryParameters> = {
      apikey: process.env.NEXT_PUBLIC_OWLRACLE_API_KEY || "",
      timeframe: "1h",
      candles: "200",
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

export const useOwlracleData = () => {
  return useSWR<OwlracleGasHistoryResponse>(
    "owlracle-history-data",
    fetchOwlracleData,
  );
};
