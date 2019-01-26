document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.cholesterolHDL, 4), 0);

    // generate chart
    var id = "hdl-chol-chart";
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
            interval: 0.5,
            minimum: 0,
            maximum: 4,
            gridThickness: 1.5,
            gridColor: "#434A54"
        },
        axisX: {
            tickThickness: 0,
            labelFormatter: function () {
                return "";
            }
        },
        data: [
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 0.5,
                        color: window.reportData.colors.danger,
                        toolTipContent: "Very Low: < 0.5 mmol/L"
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 1 - 0.5,
                        color: window.reportData.colors.warning,
                        toolTipContent: "Low: 0.5 - 1 mmol/L"
                    },
                    {
                        y: user - 0.02, // max / 100 / 2
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
                        y: 4 - 1, // max - last
                        color: window.reportData.colors.success,
                        toolTipContent: "Ideal: > 1 mmol/L"
                    },
                    {
                        y: 0.04, // max / 100
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: user.toString() + " mmol/L",
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
