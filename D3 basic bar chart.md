script.js

```javascript
 // javascript
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
	// y attribute start rectangle or bar at svgHeight - d = 300 - 80 = 220 (svg graph y axis starts from top to bottom.)
    .attr("y", function(d) {
         return svgHeight - d 
    })						
	// height attribute specifies height of the bar i.e. 80 from 220
    .attr("height", function(d) { 
        return d; 
    })
    .attr("width", barWidth - barPadding)
	// transform - translate moves every bar to the left of previous one. without this bars overlap each other showing single tallest bar.
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
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

![image-20200406044154617](F:\My workspace\D3.js\D3 basic bar chart.assets\image-20200406044154617.png)



### SVG Coordinate Space

SVG Coordinate Space works in the same way that mathematical graph coordinate space works except for two important features:

1. SVG Coordinate space has x=0 and y=0 coordinates fall on the top left.

2. SVG Coordinate space has the Y coordinate growing from top to bottom.

![SVG Coordinate Space Graph](F:\My workspace\D3.js\D3 basic bar chart.assets\svg_coordinate_graph_331x200.png)

Which means as Y increases, the coordinates move down, not up.





References: 

* https://www.dashingd3js.com/using-the-svg-coordinate-space
* scrimba - D3.js course