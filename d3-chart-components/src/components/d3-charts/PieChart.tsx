import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  dimensions?: {
    width?: number;
    height?: number;
    margin: { top?: number; bottom?: number; left?: number; right?: number };
  };
  data: any;
}

const LineChart = ({
  dimensions = {
    height: 500,
    width: 800,
    margin: { top: 30, right: 30, bottom: 90, left: 60 },
  },
  data,
}: Props) => {
  const ref: any = useRef(null);

  const { height, width, margin } = dimensions;

  const containerWidth: number =
    (width || 800) - (margin.right || 30) - (margin.left || 60);
  const containerHeight: number =
    (height || 500) - (margin.top || 30) - (margin.bottom || 90);

  useEffect(() => {

    const draw = () => {
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", `${width}`)
        .attr("height", `${height}`)
        .style("border", "1px solid black");

      // added g with translate to add something like margin on left and top side.
      const ctr = svg
        .append("g")
        .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

    };
    data && draw();
  }, [data, height, margin.left, margin.top, width]);

  return (
    <div id="chart" className="chart" ref={ref}>
    </div>
  );
};

export default LineChart;
