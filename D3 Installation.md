# D3 Installation

1. D3 Installation with React Typescript template

   1. `yarn add d3 @types/d3`

   2. d3 starter boilerplate, you can **<u>reuse this component</u>** for all types of charts and their variants:

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

   3. Adding const for selection should be done carefully.
      When you are using const selection, **append function will add new element inside of that selection**.



## Choosing scale

1. First you need to look if the dataset is continuous or discrete.

   | #    | Continuous                                    | Discrete                               |
   | ---- | --------------------------------------------- | -------------------------------------- |
   | 1.   | It can be **<u>measured</u>**.                | It can be **<u>counted</u>**.          |
   | 2.   | examples: Time, Temperature, Height, Distance | examples: # of employees, tickets, etc |
   | 3.   | Can be fractions.                             | Can not be broken into fractions.      |
   | 4.   | Infinite possible values.                     | Finite possible values.                |

2. scaleLinear() is for continuous data.

