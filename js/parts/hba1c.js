document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.HbA1C, 120), 0);

    // generate chart
    var id = "hba1c-chart";
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
            interval: 10,
            minimum: 0,
            maximum: 120,
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
                        y: 18,
                        color: window.reportData.colors.info,
                        toolTipContent: "Low: < 18 mmol/mol"
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 53 - 18,
                        color: window.reportData.colors.success,
                        toolTipContent: "Ideal: 18 - 53 mmol/mol"
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 75 - 53,
                        color: window.reportData.colors.warning,
                        toolTipContent: "High: 53 - 75 mmol/mol"
                    },
                    {
                        y: user - 0.6, // max / 100 / 2
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
                        y: 120 - 75, // max - last
                        color: window.reportData.colors.danger,
                        toolTipContent: "Very High: > 75 mmol/mol"
                    },
                    {
                        y: 1.2, // max / 100
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.HbA1C.toString() + " mmol/mol",
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
