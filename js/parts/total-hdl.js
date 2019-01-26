document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.totalHDLRatio, 10), 0);
    var gender = window.reportData.gender;

    // save default values
    var data = {
        male: {
            optimal: 3.5,
            moderate: 5,
            high: 10,
        },
        female: {
            optimal: 3,
            moderate: 4.4,
            high: 10
        }
    };

    // generate chart
    data = data[(gender.toString().toLowerCase() === "f" ? "female" : "male")];
    var id = "total-hdl-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 1000,
        height: 100,
        dataPointWidth: 50,
        axisY: {
            interval: 0.5,
            minimum: 0,
            maximum: 10,
            gridThickness: 1.5,
            gridColor: "#434A54",
            tickThickness: 1.5,
            tickColor: "#434A54"
        },
        axisX: {
            lineThickness: 1.5,
            lineColor: "#434A54",
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
                        y: data.optimal,
                        color: window.reportData.colors.success,
                        toolTipContent: "Optimal: < " + data.optimal.toString()
                    }
                ]
            },
            {
                type: "stackedBar",
                dataPoints: [
                    {
                        y: data.moderate - data.optimal,
                        color: window.reportData.colors.warning,
                        toolTipContent: "Moderate: " + data.optimal.toString() + " - " + data.moderate.toString()
                    },
                    {
                        y: user - 0.05,
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
                        y: data.high - data.moderate,
                        color: window.reportData.colors.danger,
                        toolTipContent: "High: > " + data.moderate.toString()
                    },
                    {
                        y: 0.1,
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.totalHDLRatio.toString(),
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
