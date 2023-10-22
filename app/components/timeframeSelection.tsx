import { useState } from "react";
import { timeframeType } from "@/app/utils/fetchOwlracleData";

const framesConfig: timeframeType[] = ["10m", "30m", "1h", "2h", "4h", "1d"];

export default function TimeframeSelection({
  initialSelected,
  onSelect,
}: {
  initialSelected?: timeframeType;
  onSelect: (selection: timeframeType) => void;
}) {
  const [selected, setSelected] = useState(initialSelected);

  return (
    <div className="inline-flex">
      {framesConfig.map((frame) => (
        <button
          className={selected === frame ? "bg-primary text-white" : ""}
          key={frame}
          onClick={() => {
            setSelected(frame);
            onSelect?.(frame);
          }}
        >
          {frame}
        </button>
      ))}
    </div>
  );
}
