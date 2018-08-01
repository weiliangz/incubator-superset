import dc from 'dc';
import crossfilter from 'crossfilter'




function DC_CrossfilterVis(slice, payload) {

    const div = d3.select(slice.selector);

    const sliceId = 'dc_crossfilter_' + slice.formData.slice_id;

    const html = '\
\<div id=' + sliceId + ' style="width:' + slice.width() + 'px;height:' + slice.height() + 'px;">\
\<div class="col-md-6">\
  <div id="chart-ring-year" style="width:100%; height:330px">\
    <div class="reset" style="visibility: hidden;">selected: <span class="filter"></span>\
      <a href="javascript:yearRingChart.filterAll();dc.redrawAll();">reset</a>\
    </div>\
  </div>\
  \</div>\
  \<div class="col-md-6">\
  <div id="chart-hist-spend" style="width:100%; height:330px">\
    <div class="reset" style="visibility: hidden;">range: <span class="filter"></span>\
      <a href="javascript:spendHistChart.filterAll();dc.redrawAll();">reset</a>\
    </div>\
  </div>\
  \</div>\
  <div class="col-md-6">\
  <div id="chart-row-spenders" style="width:100%; height:330px">\
    <div class="reset" style="visibility: hidden;">selected: <span class="filter"></span>\
      <a href="javascript:spenderRowChart.filterAll();dc.redrawAll();">reset</a>\
    </div>\
  </div>\
  \ </div>\
  <!-- not sure why all these styles necessary, not the point of this -->\
  \<div class="col-md-6">\
  <div style="clear: both; margin: 30px; float: left">\
    <div id="table" style="width:100%; height:100%"></div>\
    <div id="download-type" style="clear: both; float: left">\
      <div><label><input type=radio name="operation" value="raw" checked="true">&nbsp;all data</label></div>\
      <div><label><input type=radio name="operation" value="table">&nbsp;table data</label></div>\
    </div>\
  </div>\
  \</div>\
</div>';

    div.html(html); // reset

    // const myChart = echarts.init(document.getElementById(sliceId));

    var yearRingChart = dc.pieChart('#chart-ring-year'),
        spendHistChart = dc.barChart('#chart-hist-spend'),
        spenderRowChart = dc.rowChart('#chart-row-spenders');
    var table = dc.dataTable('#table');
// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
    var spendData = payload.data;
//      spendData = [
//     {Name: 'Mr A', Spent: '$40', Year: 2011},
//     {Name: 'Mr B', Spent: '$10', Year: 2011},
//     {Name: 'Mr C', Spent: '$40', Year: 2011},
//     {Name: 'Mr A', Spent: '$70', Year: 2012},
//     {Name: 'Mr B', Spent: '$20', Year: 2012},
//     {Name: 'Mr B', Spent: '$50', Year: 2013},
//     {Name: 'Mr C', Spent: '$30', Year: 2013}
// ];

// normalize/parse data
//     spendData.forEach(function (d) {
//         d.Spent = d.Spent.match(/\d+/)[0];
//     });
// set crossfilter

    var ndx = crossfilter(spendData),
        yearDim = ndx.dimension(function (d) {
            return +d.Year;
        }),
        spendDim = ndx.dimension(function (d) {
            return Math.floor(d.Spent / 10);
        }),
        nameDim = ndx.dimension(function (d) {
            return d.Name;
        }),
        spendPerYear = yearDim.group().reduceSum(function (d) {
            return +d.Spent;
        }),
        spendPerName = nameDim.group().reduceSum(function (d) {
            return +d.Spent;
        }),
        spendHist = spendDim.group().reduceCount();
    yearRingChart
        .width(300)
        .height(300)
        .dimension(yearDim)
        .group(spendPerYear)
        .innerRadius(50)
        .controlsUseVisibility(true);
    spendHistChart
        .dimension(spendDim)
        .group(spendHist)
        .x(d3.scale.linear().domain([0,10]))
        .elasticY(true)
        .controlsUseVisibility(true);
    spendHistChart.xAxis().tickFormat(function (d) {
        return d * 10
    }); // convert back to base unit
    spendHistChart.yAxis().ticks(2);
    spenderRowChart
        .dimension(nameDim)
        .group(spendPerName)
        .elasticX(true)
        .controlsUseVisibility(true);
    var allDollars = ndx.groupAll().reduceSum(function (d) {
        return +d.Spent;
    });
    table
        .dimension(spendDim)
        .group(function (d) {
            return d.value;
        })
        .sortBy(function (d) {
            return +d.Spent;
        })
        .showGroups(false)
        .columns(['Name',
            {
                label: 'Spent',
                format: function (d) {
                    return '$' + d.Spent;
                }
            },
            'Year',
            {
                label: 'Percent of Total',
                format: function (d) {
                    return Math.floor((d.Spent / allDollars.value()) * 100) + '%';
                }
            }]);

    dc.renderAll();
}

module.exports = DC_CrossfilterVis;