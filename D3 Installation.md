# D3 Installation

1. D3 Installation with React Typescript template

   1. `yarn add d3 @types/d3`

   2. d3 starter boilerplate:

      ```react
      import React, { useEffect, useRef } from "react";
      import * as d3 from "d3";
      
      interface Props {
        width?: number;
        height?: number;
        data: any;
      }
      
      const BarChart = ({
        height = 400,
        width = 400,
        data,
      }: Props) => {
        const ref: any = useRef();
      
        useEffect(() => {
          const draw = () => {
            const svg = d3
              .select(ref.current)
              .attr("width", `${width}`)
              .attr("height", `${height}`)
              .style("border", "1px solid black")
          };
          data && draw();
        }, [data, height, width]);
      
        return (
          <div className="chart">
            <svg ref={ref}></svg>
          </div>
        );
      };
      
      export default BarChart;
      ```

      



