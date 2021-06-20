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
    margin: { top: 30, right: 30, bottom: 90, left: 40 },
  },
  data,
}: Props) => {
  const ref: any = useRef(null);

  const { height, width, margin } = dimensions;

  const containerWidth: number =
    (width || 0) - (margin.right || 0) - (margin.left || 0);
  const containerHeight: number =
    (height || 0) - (margin.top || 0) - (margin.bottom || 0);
  console.log(containerWidth, containerHeight);

  useEffect(() => {
    const parseDate = d3.timeParse("%d-%m-%Y");

    const xAccessor = (dataMember: any) => parseDate(dataMember.date) || 0;
    const yAccessor = (dataMember: any) => parseInt(dataMember.adj_close);
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

      // Scales
      const xDomainExtents: any = d3.extent(data, xAccessor);
      const yDomainExtents: any = d3.extent(data, yAccessor);
      const yMax: any = d3.max(
        Object.keys(data).map((key) => yAccessor(data[key]))
      );

      const xScale = d3
        .scaleUtc()
        .domain(xDomainExtents)
        .range([margin.left || 0, containerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, yMax])
        // .domain(yDomainExtents)
        // if y axis is flipped, check bellow function argument
        .rangeRound([containerHeight, 0])
        .nice();

      const lineGenerator = d3
        .line()
        .x((d: any) => xScale(xAccessor(d)))
        .y((d: any) => yScale(yAccessor(d)));

      ctr
        .append("path")
        .datum(data)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "#30475e");

      const monthParse = d3.timeFormat("%b %y");

      // X axis
      const xAxis = d3.axisBottom(xScale).tickFormat((d: any) => {
        // console.log(monthParse(d));
        return monthParse(d);
      });

      ctr
        .append("g")
        .style("transform", `translateY(${containerHeight}px)`)
        .call(xAxis)
        .classed("axis", true)
        .selectAll("text")
        .attr("x", 20)
        .attr("y", 30)
        .attr("dy", 0.5)
        .style("transform", "rotate(45deg)");

      // X axis label

      ctr
        .append("text")
        .attr("x", containerWidth / 2)
        .attr("y", containerHeight + (margin.bottom || 0) - 10)
        .attr("fill", "#000")
        .text("Date");

      // Y axis

      const yAxis = d3.axisLeft(yScale);

      ctr
        .append("g")
        .call(yAxis)
        .style("transform", `translateX(${margin.left}px)`)
        .classed("axis", true);
    };
    data && draw();
  }, [
    containerHeight,
    containerWidth,
    data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    width,
  ]);

  return <div id="chart" ref={ref}></div>;
};

export default LineChart;
