import * as d3 from "d3";

function areaChart(slice) {
    slice.container.html('<svg width="960" height="500"></svg>');

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
        .rangeRound([0, width]);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y1(function(d) { return y(d.close); });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
    
    d3.tsv("/static/data/data.tsv", function(d) {
        d.date = parseTime.parse(d.date);
        d.close = +d.close;
        return d;
    }, function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);
        area.y0(y(0));

        g.append("path")
            .datum(data)
            .attr("fill", "steelblue")
            .attr("d", area);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        g.append("g")
            .call(yAxis)
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");
    });
    
};

module.exports = areaChart;
