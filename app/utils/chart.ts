import { OwlracleGasHistoryResponse } from "@/app/utils/fetchOwlracleData";

export const parseOwrlacleData = (
  data: OwlracleGasHistoryResponse | undefined,
) =>
  data?.candles
    .map((d) => ({
      date: new Date(d.timestamp),
      value: (d.txFee.low + d.txFee.high) / 2,
    }))
    .reverse();

export const formatValue = (value: number) =>
  value.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

export const formatDate = (date: Date) =>
  date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });

// Wraps the text with a callout path of the correct size, as measured in the page.
export const fixSize = (text: any, path: any) => {
  const { y, width: w, height: h } = text.node().getBBox();
  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr(
    "d",
    `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`,
  );
};
