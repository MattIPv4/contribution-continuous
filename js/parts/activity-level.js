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
        animationDuration: 1000,
        height: window.reportData.chartHeight,
        width: 160,
        dataPointWidth: 80,
        axisY: {
            interval: 1,
            minimum: 0,
            maximum: 12,
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
                type: "stackedColumn",
                fillOpacity: 0.8,
                dataPoints: [
                    {
                        y: 3,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Very Low: 0 - 3"
                    },
                    {y: 0}
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.7,
                dataPoints: [
                    {
                        y: 5 - 3,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Low/Medium: 3 - 5"
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
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Medium: 5 - 7"
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
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Medium/High: 7 - 9"
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
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "High: 9 - 11"
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 12 - 11,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Very High: 11 - 12"
                    }
                ]
            }
        ]
    });
    chart.render();

    // deal with clearfix
    document.getElementById(id).style.height = chart.height.toString() + "px";
    document.getElementById(id).style.width = chart.width.toString() + "px";

    // generate user chart
    var div = document.createElement("div");
    div.setAttribute("id", id + "-user");
    div.style.pointerEvents = "none";
    document.getElementById(id).appendChild(div);
    var chart2 = new CanvasJS.Chart(id + "-user", {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 1000,
        height: window.reportData.chartHeight,
        width: 160,
        dataPointWidth: 80, axisY: {
            interval: 1,
            minimum: 0,
            maximum: 12,
            gridThickness: 0,
            tickThickness: 0,
        },
        axisX: {
            lineThickness: 0,
            tickThickness: 0,
            labelFormatter: function () {
                return "";
            }
        },
        data: [
            {
                type: "stackedColumn",
                fillOpacity: 0.9,
                dataPoints: [
                    {y: 0},
                    {
                        y: user - 0.09, // max / 100 * 1.5 / 2
                        color: "transparent",
                        highlightEnabled: false,
                        toolTipContent: null
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {},
                    {
                        y: 0.18, // max / 100 * 1.5
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.activityLevel.toString(),
                        indexLabelPlacement: "outside",
                        indexLabelFontSize: 30
                    }
                ]
            }
        ]
    });

    // click to show data
    var doneShow = false;
    var clickCapture = document.createElement("div");
    clickCapture.style.position = "absolute";
    clickCapture.style.height = chart.height.toString() + "px";
    clickCapture.style.width = chart.width.toString() + "px";
    clickCapture.style.cursor = "pointer";
    clickCapture.addEventListener("click", function () {
        if (doneShow) return;
        doneShow = true;
        chart2.render();
        clickCapture.parentElement.removeChild(clickCapture);
    });
    document.getElementById(id).appendChild(clickCapture);

});
