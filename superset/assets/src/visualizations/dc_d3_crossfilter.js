import crossfilter from 'crossfilter';
import dc from 'dc';

function DC_CrossfilterVis(slice) {

    const html = '<div id="test"></div>';
    slice.container.html(html);
    var data1 = [
        { "Date": "1/1/2014", "Price": "$53.80 " },
        { "Date": "1/2/2014", "Price": "$53.80 " },
        { "Date": "1/3/2014", "Price": "$53.80 " },
        { "Date": "1/4/2014", "Price": "$53.80 " },
        { "Date": "1/5/2014", "Price": "$53.80 " },
        { "Date": "1/6/2014", "Price": "$53.80 " },
        { "Date": "1/7/2014", "Price": "$53.80 " },
        { "Date": "1/8/2014", "Price": "$53.80 " },
        { "Date": "1/9/2014", "Price": "$53.80 " },
        { "Date": "1/10/2014", "Price": "$53.80 " },
        { "Date": "1/11/2014", "Price": "$53.80 " },
        { "Date": "2/22/2014", "Price": "$55.80 " },
        { "Date": "3/21/2014", "Price": "$56.00 " },
        { "Date": "4/20/2014", "Price": "$56.00 " },
        { "Date": "5/17/2014", "Price": "$56.00 " },
        { "Date": "6/16/2014", "Price": "$56.35 " },
        { "Date": "7/15/2014", "Price": "$56.75 " },
        { "Date": "8/14/2014", "Price": "$56.75 " },
        { "Date": "9/13/2014", "Price": "$56.65 " },
        { "Date": "10/10/2014", "Price": "$56.80 " },
        { "Date": "12/31/2014", "Price": "$56.50 " }
    ]

    var ndx = crossfilter(data1);
    var parseDate = d3.time.format("%m/%d/%Y").parse;
    data1.forEach(function (d) {
        d.date = parseDate(d.Date);
    });
    var dateDim = ndx.dimension(function (d) { return d.date; });
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;
    var group_date = dateDim.group().reduceSum(function (d) { return d.Price.replace("$", ""); })

    var chart = dc.barChart("#test");
    chart
        .dimension(dateDim)
        .group(group_date)
        .width(1000)
        .height(480)
        .x(d3.time.scale().domain([minDate, maxDate]))
    chart.render();
    dc.renderAll();
}

// exports module
module.exports = DC_CrossfilterVis;