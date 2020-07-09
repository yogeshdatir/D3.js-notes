 // javascript
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// barPadding is padding between 2 bars
var svgWidth = 500, svgHeight = 300, barPadding = 2;
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
    
// adjust/resize the width of the bars
var xScale = d3.scaleBand()
    .domain(dataset.map(function(d) {return d}))
    // limit for the adjustment
    .range([0, svgWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3)
    
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
	// need to change y axis size with adjusted data element due to scale
    .attr("y", function(d, i) {
        return svgHeight - yScale(d) + 15;
    })
    // the horizontal position of the label text - here it's same as the bar position
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    // fill color for the label text
    .attr("fill", "#A64C38");