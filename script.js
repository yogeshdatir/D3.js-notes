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