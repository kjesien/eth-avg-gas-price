"use client";
import { timeframeType, useOwlracleData } from "@/app/utils/fetchOwlracleData";
import TransactionFeeChart from "@/app/components/transactionFeeChart";
import TimeframeSelection from "@/app/components/timeframeSelection";
import { useState } from "react";
import { parseOwrlacleData } from "@/app/utils/chart";
import Loading from "@/app/components/loading";
import Error from "@/app/components/error";

export default function Home() {
  const [timeFrame, setTimeframe] = useState<timeframeType>("10m");
  const { data, isLoading, error } = useOwlracleData(timeFrame);
  return (
    <main className="flex flex-col items-center justify-between">
      <TimeframeSelection
        initialSelected={timeFrame}
        onSelect={(newTimeframe) => setTimeframe(newTimeframe)}
      />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <TransactionFeeChart
          data={parseOwrlacleData(data) || []}
          yAxisLabel="Average Gas Price ($)"
          chartSettings={{
            width: 928,
            height: 500,
            marginTop: 20,
            marginRight: 80,
            marginBottom: 60,
            marginLeft: 80,
          }}
        />
      )}
    </main>
  );
}
