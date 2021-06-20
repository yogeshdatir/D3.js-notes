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
    const parseDate = d3.timeParse("%d-%m-%Y");

    const xAccessor = (dataMember: any) =>
      parseDate(dataMember.date) || new Date();
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

      const tooltip: any = d3
        .select("#tooltip")
        // if not applied, hovering on tooltip makes it disappear
        .style("pointer-events", "none");

      const tooltipDot = ctr
        .append("circle")
        .attr("r", 5)
        .attr("fill", "#fc8781")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .style("opacity", 0)
        .style("pointer-events", "none");

      const tooltipLine = ctr.append("line");

      // Scales
      const xDomainExtents: any = d3.extent(data, xAccessor);
      const yDomainExtents: any = d3.extent(data, yAccessor);
      const yMax: any = d3.max(
        Object.keys(data).map((key) => yAccessor(data[key]))
      );

      const xScale = d3
        .scaleUtc()
        .domain(xDomainExtents)
        .range([0, containerWidth]);

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

      // X axis

      const monthParse = d3.timeFormat("%b %y");
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

      const yAxis = d3.axisLeft(yScale).tickFormat((d: any) => `₹${d}`);

      ctr.append("g").call(yAxis).classed("axis", true);

      //Tooltip

      ctr
        .append("rect")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .style("opacity", 0)
        .on("touchmouse mousemove", function (event: any) {
          const mousePos = d3.pointer(event, this);
          const date = xScale.invert(mousePos[0]);

          const bisector = d3.bisector(xAccessor).left;
          const index = bisector(data, date);
          const stock = data[index - 1];

          tooltipDot
            .style("opacity", 1)
            .attr("cx", xScale(xAccessor(stock)))
            .attr("cy", yScale(yAccessor(stock)))
            .raise();

          tooltipLine
            .attr("x1", xScale(xAccessor(stock)))
            .attr("y1", containerHeight)
            .attr("x2", xScale(xAccessor(stock)))
            .attr("y2", 0)
            .classed("mean-line", true);

          tooltip
            .style("display", "block")
            .style("top", yScale(yAccessor(stock)) - 50 + "px")
            .style(
              "left",
              xScale(xAccessor(stock) || new Date()) +
                (margin.left || 0) -
                tooltip["_groups"][0][0].clientWidth / 2 +
                "px"
            );

          tooltip.select(".price").text(`₹${yAccessor(stock)}`);

          const dateFormatter = d3.timeFormat("%B %-d, %Y");

          tooltip
            .select(".date")
            .text(`${dateFormatter(xAccessor(stock) || new Date())}`);

          // console.log(stock);
        })
        .on("mouseleave", function (event: any) {
          tooltipDot.style("opacity", 0);
          tooltip.style("display", "none");
          tooltipLine.classed("mean-line", false);
        });
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

  return (
    <div id="chart" className="chart" ref={ref}>
      <div id="tooltip">
        <div className="price"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default LineChart;
