document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(1.7, 60), 0);

    // generate chart
    var id = "diabetes-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 750,
        height: 100,
        dataPointWidth: 50,
        axisY: {
            interval: 6,
            minimum: 0,
            maximum: 60,
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
                        y: 10,
                        color: "#33ffd6",
                        toolTipContent: "Normal: < 10%"
                    },
                    {
                        y: user - 0.3,
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
                        y: 50,
                        color: "#ff7381",
                        toolTipContent: "Raised: > 10%"
                    },
                    {
                        y: 0.6,
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: user.toString() + "%",
                        indexLabelPlacement: "outside",
                        indexLabelFontSize: 30
                    }
                ]
            }
        ]
    });
    chart.render();

    // deal with clearfix
    document.getElementById(id).style.height = chart.height.toString() + "px";
    document.getElementById(id).style.width = chart.width.toString() + "px";

});
