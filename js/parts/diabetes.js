document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.qDiabetes, 50), 0);

    // generate chart
    var id = "diabetes-chart";
    var chart = new CanvasJS.Chart(id, {
        theme: "dark2",
        backgroundColor: "transparent",
        creditText: "",
        creditHref: "",
        animationEnabled: true,
        animationDuration: 1000,
        height: 110,
        dataPointWidth: 50,
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
                type: "stackedBar",
                dataPoints: [
                    {
                        y: 10,
                        color: window.reportData.colors.success,
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabelPlacement: "inside",
                        indexLabelFontSize: 12,
                        indexLabelFontColor: "#434A54",
                        indexLabel: "Normal: < 10%"
                    },
                    {
                        y: user - 0.25, // max / 100 / 2
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
                        y: 50 - 10, // max - last
                        color: window.reportData.colors.danger,
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabelPlacement: "inside",
                        indexLabelFontSize: 12,
                        indexLabelFontColor: "#434A54",
                        indexLabel: "Raised: > 10%"
                    },
                    {
                        y: 0.5, // max / 100
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: window.reportData.qDiabetes.toString() + "%",
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

    // do modal
    var title = document.getElementById(id).parentElement.getElementsByTagName("h1")[0];
    title.style.cursor = "pointer";
    title.style.textDecoration = "underline dotted";
    title.addEventListener("click", function () {
        window.doModal("Qdiabetes Risk Score", window.reportData.qDiabetesReport, document.getElementById(id).parentElement);
    });

});
