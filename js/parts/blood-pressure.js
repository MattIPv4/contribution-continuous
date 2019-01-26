document.addEventListener('jsonDataLoaded', function () {
    // save custom point (so can animate marker size)
    var point = [{
        x: Math.max(Math.min(window.reportData.pressureDiastolic, 100), 40),
        y: Math.max(Math.min(window.reportData.pressureSystolic, 190), 70),
        markerSize: 100
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
                title: "DIASTOLIC"
            },
            axisY: {
                minimum: 70,
                maximum: 190,
                interval: 10,
                gridThickness: 1.5,
                gridColor: "#434A54",
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
                    color: "#d6f5ff",
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
                    color: "#33ffd6",
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
                    color: "#fac1b6",
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
                    color: "#ff7381",
                    dataPoints: [
                        {x: 40, y: [140, 190]}, // y: [Low, High]
                        {x: 90, y: [140, 190]},
                        {x: 90, y: [70, 190]},
                        {x: 100, y: [70, 190]},
                        {x: 100, y: [70, 70]}
                    ]
                },
                {
                    // user data point
                    type: "scatter",
                    markerType: "cross",
                    toolTipContent: "{y}/{x} mmHg",
                    color: "#fff",
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
    function animate_point(target, time, step) {
        if (typeof step === "undefined") {
            step = (target - point[0].markerSize) / (time / 20);
        }
        point[0].markerSize = point[0].markerSize + step;
        chart.render();
        if ((point[0].markerSize < target && step >= 0) || (point[0].markerSize > target && step < 0)) {
            setTimeout(animate_point, 20, target, time, step);
        }
    }

    animate_point(14, 500);
});
