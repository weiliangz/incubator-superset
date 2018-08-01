import echarts from 'echarts';

function echartsFunnelVis(slice, payload) {
    const div = d3.select(slice.selector);
    const sliceId = 'echarts_slice_' + slice.formData.slice_id;
    const html = '<div id=' + sliceId + ' style="width:' + slice.width() + 'px;height:' + slice.height() + 'px;">' +
        '<div id="funnelChart"' + ' style="width:' + slice.width() + 'px;height:' + slice.height() + 'px;" />' +
        // '<div id="funnelChart"' + ' style="width:' + slice.width() + 'px;height:' + slice.height() + 'px;" />' +
        '</div>';
    div.html(html); // reset

    const funnelChart = echarts.init(document.getElementById('funnelChart'));
    // const pieChart = echarts.init(document.getElementById('pieChart'));

    // const fd = slice.formData;
    const json = payload.data;
    const dataName = [];
    let maxValue = 0;
    const dataValue = json;
    dataValue.forEach(function (item) {
        dataName.push(item.name);
        if (item.value > maxValue) {
            maxValue = item.value;
        }
    });

    var builderJson = {
        "all": 10887,
        "charts": {
            "map": 3237,
            "lines": 2164,
            "bar": 7561,
            "radar": 2090,
            "line": 7778,
            "pie": 7355,
            "scatter": 2405,
            "candlestick": 1842,
            "parallel": 1908,
            "gauge": 2107,
            "funnel": 1692,
            "sankey": 1568,
            "heatmap": 1762,
            "treemap": 1593,
            "graph": 2060,
            "boxplot": 1537,
        }

    };

    var downloadJson = {
        "echarts.min.js": 17365,
        "echarts.simple.min.js": 4079,
        "echarts.common.min.js": 6929,
        "echarts.js": 14890
    };

    var option = {
        grid: {
            top: 50,
            width: '50%',
            bottom: '50%',
            left: 10,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            max: builderJson.all,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: Object.keys(builderJson.charts),
            axisLabel: {
                interval: 0,
                rotate: 30
            },
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true
                }
            },
            data: Object.keys(builderJson.charts).map(function (key) {
                return builderJson.charts[key];
            })
        }, {
            type: 'pie',
            radius: [0, '30%'],
            center: ['75%', '25%'],
            data: Object.keys(downloadJson).map(function (key) {
                return {
                    name: key.replace('.js', ''),
                    value: downloadJson[key]
                }
            })
        }]
    };
    funnelChart.setOption(option);
    // funnelChart.setOption({
    //     series: {
    //         type: 'pie',
    //         data: [
    //             {name: 'A', value: 1212},
    //             {name: 'B', value: 2323},
    //             {name: 'C', value: 1919}
    //         ]
    //     }
    // });
}

module.exports = echartsFunnelVis;