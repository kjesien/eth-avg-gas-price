import * as d3 from "d3";
import { useD3 } from "@/app/utils/hooks/useD3";
import { fixSize, formatDate, formatValue } from "@/app/utils/chart";

interface ChartPoint {
  value: number;
  date: Date;
}

export default function TransactionFeeChart({
  data,
  yAxisLabel,
  chartSettings,
}: {
  data: ChartPoint[];
  yAxisLabel: string;
  chartSettings: {
    width: number;
    height: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
  };
}) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    chartSettings;

  const svgRef = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      // Declare the x (horizontal position) scale.
      const xDomain: [Date, Date] = d3.extent(data, (d) => d.date) as [
        Date,
        Date,
      ];
      const x = d3.scaleUtc(xDomain, [marginLeft, width - marginRight]);

      // Declare the y (vertical position) scale.
      const yDomain = d3.extent(data, (d) => d.value) as [number, number];
      const y = d3.scaleLinear(yDomain, [height - marginBottom, marginTop]);

      // Declare the line generator.
      const line = d3
        .line<ChartPoint>()
        .x((d) => x(d.date))
        .y((d) => y(d.value));

      svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr(
          "style",
          "max-width: 100%; height: auto; height: intrinsic;  font: 0.8em sans-serif;",
        )
        .on("pointerenter pointermove", pointerMoved)
        .on("pointerleave", pointerLeft);

      // Add the x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("class", "axis")
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0),
        );

      // Add the y-axis, remove the domain line, add grid lines and a label.
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("class", "axis")
        .call(
          d3
            .axisLeft(y)
            .ticks(height / 40)
            .tickFormat((v) => formatValue(v as number)),
        )
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1),
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yAxisLabel),
        );

      // Append a path for the line.
      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data));

      // Tooltip

      const tooltip = svg.append("g");

      // Add the event listeners that show or hide the tooltip.
      const bisect = d3.bisector((d: ChartPoint) => d.date).center;
      function pointerMoved(event: Event) {
        if (!data.length) return;
        const i = bisect(data, x.invert(d3.pointer(event)[0]));
        tooltip.style("display", null);
        tooltip.attr(
          "transform",
          `translate(${x(data[i].date)},${y(data[i].value)})`,
        );

        const path = tooltip
          .selectAll("path")
          .data([,])
          .join("path")
          .attr("fill", "white")
          .attr("stroke", "black");

        const text = tooltip
          .selectAll("text")
          .data([,])
          .join("text")
          .call((text) =>
            text
              .selectAll("tspan")
              .data([formatDate(data[i].date), formatValue(data[i].value)])
              .join("tspan")
              .attr("x", 0)
              .attr("y", (_, i) => `${i * 1.1}em`)
              .attr("font-weight", (_, i) => (i ? null : "bold"))
              .text((d) => d),
          );

        fixSize(text, path);
      }

      function pointerLeft() {
        tooltip.style("display", "none");
      }
    },
    [data.length],
  );

  return <svg ref={svgRef}></svg>;
}
