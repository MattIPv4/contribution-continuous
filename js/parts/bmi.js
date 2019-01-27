document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.bmi, 50), 0);

    // generate chart
    var id = "bmi-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 1000,
        height: window.reportData.chartHeight,
        width: 170,
        dataPointWidth: 80,
        axisY: {
            interval: 5,
            minimum: 0,
            maximum: 50,
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
                dataPoints: [
                    {
                        y: 18.5,
                        color: window.reportData.colors.info,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Underweight: &lt; 18.5 kg/m<sup>2</sup>"
                    },
                    {y: 0}
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 25 - 18.5,
                        color: window.reportData.colors.success,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Normal: 18.5 - 25 kg/m<sup>2</sup>"
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 30 - 25,
                        color: window.reportData.colors.warning,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Overweight: 25 - 30 kg/m<sup>2</sup>"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.8,
                dataPoints: [
                    {
                        y: 35 - 30,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Obese I: 30 - 35 kg/m<sup>2</sup>"
                    }
                ]
            },
            {
                type: "stackedColumn",
                fillOpacity: 0.9,
                dataPoints: [
                    {
                        y: 40 - 35,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Obese II: 35 - 40 kg/m<sup>2</sup>"
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 50 - 40,
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null
                        //toolTipContent: "Obese III: &gt; 40 kg/m<sup>2</sup>"
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
        width: 170,
        dataPointWidth: 80,
        axisY: {
            interval: 5,
            minimum: 0,
            maximum: 50,
            gridThickness: 0,
            tickThickness: 0
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
                        y: user - 0.375, // max / 100 * 1.5 / 2
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
                        y: 0.75, // max / 100 * 1.5
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.bmi.toString(),
                        indexLabelPlacement: "outside",
                        indexLabelFontSize: 25
                    }
                ]
            }
        ]
    });

    // click to show data
    var doneShow = false;
    var clickCapture = document.createElement("div");
    clickCapture.className = "click-capture";
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
