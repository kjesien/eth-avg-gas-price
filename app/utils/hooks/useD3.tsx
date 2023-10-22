import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { BaseType } from "d3";

export const useD3 = (
  renderChartFn: (svg: ReturnType<typeof d3.select>) => void,
  deps: unknown[],
) => {
  const ref = useRef<SVGSVGElement>(null);
  console.log(deps);
  useEffect(() => {
    if (ref.current !== undefined) {
      renderChartFn(d3.select(ref.current as BaseType));
    }
  }, [...deps, renderChartFn]);
  return ref;
};
