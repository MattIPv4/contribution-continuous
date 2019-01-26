document.addEventListener('jsonDataLoaded', function () {
    // user data
    var dia = Math.max(Math.min(window.reportData.pressureDiastolic, 100), 40);
    var sys = Math.max(Math.min(window.reportData.pressureSystolic, 190), 70);
    var label = window.reportData.pressureSystolic.toString() + "/" + window.reportData.pressureDiastolic.toString() + " mmHg";

    // save custom points (so can animate marker size)
    var point = [{
        x: dia,
        y: sys,
        markerSize: 0,
        markerColor: "transparent"
    }]; // x: dia, y: sys
    var pointLarge = [{
        x: dia,
        y: sys,
        markerSize: 0,
        markerColor: "transparent"
    }]; // x: dia, y: sys

    // generate chart
    var id = "blood-pressure-chart";
    var chart = new CanvasJS.Chart(id,
        {
            theme: "dark2",
            backgroundColor: "transparent",
            creditText: "",
            creditHref: "",
            height: window.reportData.chartHeight,
            axisX: {
                minimum: 40,
                maximum: 100,
                interval: 10,
                gridThickness: 1.5,
                gridColor: "#434A54",
                tickThickness: 1.5,
                tickColor: "#434A54",
                lineThickness: 1.5,
                lineColor: "#434A54",
                title: "DIASTOLIC"
            },
            axisY: {
                minimum: 70,
                maximum: 190,
                interval: 10,
                gridThickness: 1.5,
                gridColor: "#434A54",
                tickThickness: 1.5,
                tickColor: "#434A54",
                lineThickness: 1.5,
                lineColor: "#434A54",
                title: "SYSTOLIC"
            },
            data: [
                {
                    // low
                    type: "rangeArea",
                    lineThickness: 0,
                    markerSize: 0,
                    highlightEnabled: false,
                    toolTipContent: null,
                    color: window.reportData.colors.info,
                    dataPoints: [
                        {x: 40, y: [70, 90]}, // y: [Low, High]
                        {x: 60, y: [70, 90]},
                        {x: 60, y: [70, 70]}
                    ]
                },
                {
                    // normal
                    type: "rangeArea",
                    lineThickness: 0,
                    markerSize: 0,
                    highlightEnabled: false,
                    toolTipContent: null,
                    color: window.reportData.colors.success,
                    dataPoints: [
                        {x: 40, y: [90, 120]}, // y: [Low, High]
                        {x: 60, y: [90, 120]},
                        {x: 60, y: [70, 120]},
                        {x: 80, y: [70, 120]},
                        {x: 80, y: [70, 70]}
                    ]
                },
                {
                    // elevated
                    type: "rangeArea",
                    lineThickness: 0,
                    markerSize: 0,
                    highlightEnabled: false,
                    toolTipContent: null,
                    color: window.reportData.colors.warning,
                    dataPoints: [
                        {x: 40, y: [120, 140]}, // y: [Low, High]
                        {x: 80, y: [120, 140]},
                        {x: 80, y: [70, 140]},
                        {x: 90, y: [70, 140]},
                        {x: 90, y: [70, 70]}
                    ]
                },
                {
                    // high
                    type: "rangeArea",
                    lineThickness: 0,
                    markerSize: 0,
                    highlightEnabled: false,
                    toolTipContent: null,
                    color: window.reportData.colors.danger,
                    dataPoints: [
                        {x: 40, y: [140, 190]}, // y: [Low, High]
                        {x: 90, y: [140, 190]},
                        {x: 90, y: [70, 190]},
                        {x: 100, y: [70, 190]},
                        {x: 100, y: [70, 70]}
                    ]
                },
                {
                    // user data point larger
                    type: "scatter",
                    markerType: "circle",
                    toolTipContent: label,
                    dataPoints: pointLarge
                },
                {
                    // user data point
                    type: "scatter",
                    markerType: "cross",
                    toolTipContent: label,
                    dataPoints: point
                }
            ]
        }
    );
    chart.render();

    // maintain aspect based on height and scales (ish)
    var unit_size = chart.height / chart.get("axisY")[0].range;
    chart.set("width", parseInt(unit_size * chart.get("axisX")[0].range * 1.3)); // * 1.3 to make fatter

    // deal with clearfix
    document.getElementById(id).style.height = chart.height.toString() + "px";
    document.getElementById(id).style.width = chart.width.toString() + "px";

    // animate point
    function animate_point(point, target, time, step) {
        if (typeof step === "undefined") {
            step = (target - point.markerSize) / (time / 20);
        }
        point.markerSize = point.markerSize + step;
        chart.render();
        if ((point.markerSize < target && step >= 0) || (point.markerSize > target && step < 0)) {
            setTimeout(animate_point, 20, point, target, time, step);
        }
    }

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
        point[0].markerSize = 80;
        point[0].markerColor = "#1f1f2d";
        animate_point(point[0], 12, 750);
        pointLarge[0].markerSize = 100;
        pointLarge[0].markerColor = "rgba(255, 255, 255, 0.3)";
        animate_point(pointLarge[0], 40, 750);
        clickCapture.parentElement.removeChild(clickCapture);
    });
    document.getElementById(id).appendChild(clickCapture);
});
