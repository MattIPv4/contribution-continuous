document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.activityLevel, 12), 0);

    // generate chart
    var id = "activity-level-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 750,
        height: window.reportData.chartHeight,
        width: 160,
        dataPointWidth: 80,
        axisY: {
            interval: 1,
            minimum: 0,
            maximum: 12,
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
                type: "stackedColumn",
                fillOpacity: 0.8,
                dataPoints: [
                    {
                        y: 3,
                        color: window.reportData.colors.danger,
                        toolTipContent: "Very Low: 0 - 3"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.7,
                dataPoints: [
                    {
                        y: 5 - 3,
                        color: window.reportData.colors.danger,
                        toolTipContent: "Low/Medium: 3 - 5"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.7,
                dataPoints: [
                    {
                        y: 7 - 5,
                        color: window.reportData.colors.warning,
                        toolTipContent: "Medium: 5 - 7"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.8,
                dataPoints: [
                    {
                        y: 9 - 7,
                        color: window.reportData.colors.success,
                        toolTipContent: "Medium/High: 7 - 9"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.9,
                dataPoints: [
                    {
                        y: 11 - 9,
                        color: window.reportData.colors.success,
                        toolTipContent: "High: 9 - 11"
                    },
                    {
                        y: user - 0.1,
                        color: "transparent",
                        highlightEnabled: false,
                        toolTipContent: null
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 12 - 11,
                        color: window.reportData.colors.danger,
                        toolTipContent: "Very High: 11 - 12"
                    },
                    {
                        y: 0.2,
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: user.toString(),
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
