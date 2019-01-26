document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = Math.max(Math.min(window.reportData.bmi, 60), 0);

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
                dataPoints: [
                    {
                        y: 18.5,
                        color: window.reportData.colors.info,
                        toolTipContent: "Underweight: < 18.5 kg/m2"
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 25 - 18.5,
                        color: window.reportData.colors.success,
                        toolTipContent: "Normal: 18.5 - 25 kg/m2"
                    }
                ]
            },
            {
                type: "stackedColumn",
                dataPoints: [
                    {
                        y: 30 - 25,
                        color: window.reportData.colors.warning,
                        toolTipContent: "Overweight: 25 - 30 kg/m2"
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
                        toolTipContent: "Obese I: 30 - 35 kg/m2"
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
                        toolTipContent: "Obese II: 35 - 40 kg/m2"
                    },
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
                    {
                        y: 50 - 40,
                        color: window.reportData.colors.danger,
                        toolTipContent: "Obese III: > 40 kg/m2"
                    },
                    {
                        y: 0.75, // max / 100 * 1.5
                        color: "#fff",
                        highlightEnabled: false,
                        toolTipContent: null,
                        indexLabel: user.toString(),
                        indexLabelPlacement: "outside",
                        indexLabelFontSize: 25
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
