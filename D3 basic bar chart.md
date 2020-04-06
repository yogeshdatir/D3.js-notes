script.js

```javascript
 // javascript
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// barPadding is padding between 2 bars
var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
// adjust/resize the height of the bars
var yScale = d3.scaleLinear()
	// max y axis value
    .domain([0, d3.max(dataset)])
	// limit for the adjustment
    .range([0, svgHeight]);
    
var barChart = svg.selectAll("rect")
    .data(dataset)
    // after applying this method following methods is called for each dataset element
    .enter()
    // to append rectangle element for each dataset element as this is bar chart
    .append("rect")
	// y attribute start rectangle or bar at svgHeight - d = 300 - 80 = 220 (svg graph y axis starts from top to bottom.)
	// need to change y axis size with adjusted data element due to scale
    .attr("y", function(d) {
         return svgHeight - yScale(d) 
    })						
	// height attribute specifies height of the bar i.e. 80 from 220
	// need to change height of the bar with adjusted data element due to scale
    .attr("height", function(d) { 
        return yScale(d); 
    })
    .attr("width", barWidth - barPadding)
	// transform - translate moves every bar to the left of previous one. without this bars overlap each other showing single tallest bar.
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
    
    
// Label for each bar - dataset element
var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    // the label value for each bar - here it's dataset element
    .text(function(d) {
        return d;
    })
    // the vertical position of label text - here it's 3 units above the bar
    .attr("y", function(d, i) {
        return svgHeight - yScale(d) + 15;
    })
    // the horizontal position of the label text - here it's same as the bar position
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    // fill color for the label text
    .attr("fill", "#A64C38");
```

index.html

```html
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <title>Learn D3.js</title>
    </head>
    <body>
        <h1>Bar Chart using D3.js</h1>
        

        <svg class="bar-chart"></svg>
        
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <script src="script.js"></script>
    </body>

</html>
```

style.css

```css
.bar-chart {
    background-color: #C7D9D9;
}
```

Output

![image-20200406044154617](F:\My workspace\D3.js notes\D3 basic bar chart.assets\image-20200406044154617.png)





### SVG Coordinate Space

SVG Coordinate Space works in the same way that mathematical graph coordinate space works except for two important features:

1. SVG Coordinate space has x=0 and y=0 coordinates fall on the top left.

2. SVG Coordinate space has the Y coordinate growing from top to bottom.

Which means as Y increases, the coordinates move down, not up.

![svg_coordinate_graph_331x200](F:\My workspace\D3.js notes\D3 basic bar chart.assets\svg_coordinate_graph_331x200.png)





### Scale

* **d3.scaleLinear()** − 

  Constructs a continuous linear scale where we can input data (domain) maps to the specified output range.

  

- **Domain** − 

  The Domain denotes minimum and maximum values of your input data.

  

- **Range** − 

  The Range is the output range, which we would like the input values to map to...



References: 

* https://www.dashingd3js.com/using-the-svg-coordinate-space
* scrimba - D3.js course
* https://www.tutorialspoint.com/d3js/d3js_scales_api.htm

