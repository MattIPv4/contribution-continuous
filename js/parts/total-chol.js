document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.cholesterolTotal, 10), 0);

    // generate chart
    var id = "total-chol-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 1000,
        height: 60,
        dataPointWidth: 15,
        axisY: {
            interval: 1,
            minimum: 0,
            maximum: 10,
            gridThickness: 1.5,
            gridColor: "transparent",
            tickColor: "#434A54"
        },
        axisX: {
            tickThickness: 0,
            lineColor: "transparent",
            labelFormatter: function () {
                return "";
            }
        },
        data: [
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 5,
                        color: window.reportData.colors.success,
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabelPlacement: "inside",
                        indexLabelFontSize: 10,
                        indexLabelFontColor: "#434A54",
                        indexLabel: "Ideal: < 5 mmol/L"
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 7 - 5,
                        color: window.reportData.colors.warning,
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabelPlacement: "inside",
                        indexLabelFontSize: 10,
                        indexLabelFontColor: "#434A54",
                        //indexLabel: "High: 5 - 7 mmol/L"
                    },
                    {
                        y: user - 0.05, // max / 100 / 2
                        color: "transparent",
                        highlightEnabled: false,
                        toolTipContent: null
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 10 - 7, // max - last
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabelPlacement: "inside",
                        indexLabelFontSize: 10,
                        indexLabelFontColor: "#434A54",
                        //indexLabel: "Very High: > 7 mmol/L"
                    },
                    {
                        y: 0.1, // max / 100
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.cholesterolTotal.toString() + " mmol/L",
                        indexLabelPlacement: "outside",
                        indexLabelFontSize: 15
                    }
                ]
            }
        ]
    });
    chart.render();

    // shrink slightly from default
    chart.set("width", parseInt(chart.get("width") * 0.6));

    // deal with clearfix
    document.getElementById(id).style.height = chart.height.toString() + "px";
    document.getElementById(id).style.width = chart.width.toString() + "px";

});
