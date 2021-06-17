import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  width?: number;
  height?: number;
  data: any;
}

const BarChart = ({ height = 500, width = 800, data }: Props) => {
  const ref: any = useRef();

  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const calculatedWidth = width - margin.left - margin.right;
  const calculatedHeight = height - margin.top - margin.bottom;

  const xAccessor = (dataMember: any) => dataMember.name;
  const yAccessor = (dataMember: any) => +dataMember.pv;

  useEffect(() => {
    const draw = () => {
      const svg = d3
        .select(ref.current)
        .attr("width", `${width}`)
        .attr("height", `${height}`)
        .style("border", "2px solid black");

      // added g with translate to add something like margin on left and top side.
      const ctr = svg
        .append("g")
        .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

      // Scales
      const domainExtents: any = d3.extent(data, yAccessor);

      const max: any = d3.max(Object.keys(data).map((key) => +data[key].pv));

      const xScale = d3
        .scaleBand()
        .domain(data.map(xAccessor))
        .rangeRound([margin.left, calculatedWidth])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        // .domain(domainExtents)
        .domain([0, max])
        // if y axis is flipped, check bellow function argument
        .rangeRound([calculatedHeight, 0])
        .nice()
        .clamp(true);

      // Add the bars

      // exit transition is not mandatory
      // Todo: research when is the exit transition needed.
      const exitTransition = d3.transition().duration(500);

      const updateTransition: any = exitTransition.transition().duration(500);

      ctr
        .selectAll("rect")
        .data(data)
        // enter function is added for transition, to set the starting positions for transition
        .join(
          (enter: any) =>
            enter
              .append("rect")
              .attr("x", (d: any) => xScale(d.name) || "")
              // here y is changed, to start the transition from bottom
              .attr("y", calculatedHeight)
              .attr("width", xScale.bandwidth())
              // here height is changed to 0, to set starting point of bars from x axis
              .attr("height", 0)
              .attr("fill", "orange"),
          (update: any) => update,
          (exit: any) =>
            exit
              .transition(exitTransition)
              .attr("y", calculatedHeight)
              .attr("height", 0)
              .remove()
        )
        .transition(updateTransition)
        .attr("x", (d: any) => xScale(d.name) || "")
        .attr("y", (d: any) => yScale(d.pv))
        .attr("width", xScale.bandwidth())
        .attr("height", (d: any) => yScale(0) - yScale(d.pv))
        // following code also works
        // .attr("y", (d: any) => calculatedHeight - yScale(d.pv))
        // .attr("height", (d: any) => yScale(d.pv))
        .attr("fill", "orange");

      ctr
        .append("g")
        .classed("bar-labels", true)
        .selectAll("text")
        .data(data)
        .join("text")
        // Todo: Figure out better way to position labels
        .attr(
          "x",
          (d: any) =>
            (xScale(d.name) || 0) + xScale.bandwidth() - margin.right - 7
        )
        .attr("y", (d: any) => yScale(yAccessor(d)) - 10)
        .text(yAccessor);

      // d3 axisBottom or axisLeft have tick(), tickValues(), tickFormat() functions which can be handy.
      // e.g. tickFormat((d: any) => d*100+"%")

      // X axis
      const xAxis = d3.axisBottom(xScale);

      const xAxisGroup = ctr
        .append("g")
        .style("transform", `translateY(${calculatedHeight}px)`)
        .call(xAxis)
        .classed("axis", true);

      // Todo: following code to rotate x axis ticks text doesn't x axis label to append, need to fix that
      // .selectAll("text")
      // .attr("x", 20)
      // .attr("y", 30)
      // .attr('dy', 0.5)
      // .style("transform", "rotate(45deg)");

      // X axis label

      xAxisGroup
        .append("text")
        .attr("x", calculatedWidth / 2)
        .attr("y", margin.bottom - 15)
        .attr("fill", "#000")
        .text("Name");

      // Y axis

      const yAxis = d3.axisLeft(yScale);

      const yAxisGroup = ctr
        .append("g")
        .call(yAxis)
        .style("transform", `translateX(${margin.left}px)`)
        .classed("axis", true);

      // Y axis label

      yAxisGroup
        .append("text")
        .attr("x", -margin.top - margin.bottom - 15)
        .attr("y", -margin.left - margin.right + 10)
        .attr("fill", "#000")
        .text("Proposed Value")
        .style("transform", "rotate(270deg)");
    };

    data && draw();
  }, [
    calculatedHeight,
    calculatedWidth,
    data,
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    width,
  ]);

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
};

export default BarChart;
