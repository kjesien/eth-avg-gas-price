"use client";
import { useOwlracleData } from "@/app/utils/fetchOwlracleData";
import TransactionFeeChart from "@/app/components/transactionFeeChart";

export default function Home() {
  const { data } = useOwlracleData();
  return (
    <main className="flex flex-col items-center justify-between">
      <TransactionFeeChart data={data?.candles || []} />
    </main>
  );
}
