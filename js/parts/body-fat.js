document.addEventListener('jsonDataLoaded', function () {
    // max value for rings (%)
    var ringMax = 75;

    // user value
    var user = Math.max(Math.min(window.reportData.bodyFat, ringMax), 0);
    var gender = window.reportData.gender;

    // save default values
    var data = {
        male: {
            low: 5,
            ultra_lean: 8,
            lean: 12,
            moderate_lean: 20,
            excess: 30
        },
        female: {
            low: 15,
            ultra_lean: 18,
            lean: 22,
            moderate_lean: 30,
            excess: 40
        }
    };

    // generate chart
    data = data[(gender.toString().toLowerCase() === "f" ? "female" : "male")];
    var id = "body-fat-chart";
    var chart = new CanvasJS.Chart(id,
        {
            theme: "dark2",
            backgroundColor: "transparent",
            creditText: "",
            creditHref: "",
            animationEnabled: true,
            animationDuration: 1000,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    explodeOnClick: false,
                    dataPoints: [
                        {
                            y: data.low,
                            indexLabel: "Low (0-" + data.low.toString() + "%)",
                            color: window.reportData.colors.warning,
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: (data.ultra_lean - data.low),
                            indexLabel: "Ultra Lean (" + data.low.toString() + "-" + data.ultra_lean.toString() + "%)",
                            color: window.reportData.colors.success,
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: (data.lean - data.ultra_lean),
                            indexLabel: "Lean (" + data.ultra_lean.toString() + "-" + data.lean.toString() + "%)",
                            color: window.reportData.colors.success,
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: (data.moderate_lean - data.lean),
                            indexLabel: "Moderately Lean (" + data.lean.toString() + "-" + data.moderate_lean.toString() + "%)",
                            color: window.reportData.colors.success,
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: (data.excess - data.moderate_lean),
                            indexLabel: "Excess (" + data.moderate_lean.toString() + "-" + data.excess.toString() + "%)",
                            color: window.reportData.colors.danger,
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: ringMax - data.excess, // padding
                            color: "transparent",
                            toolTipContent: null,
                            highlightEnabled: false
                        }
                    ]
                }
            ]
        }
    );
    chart.render();

    // deal with clearfix
    document.getElementById(id).style.height = chart.height.toString() + "px";
    document.getElementById(id).style.width = chart.width.toString() + "px";

    // add user info
    var h2 = document.createElement("h2");
    h2.innerText = window.reportData.bodyFat.toString();
    h2.style.fontSize = (window.reportData.chartHeight / 6).toString() + "px";
    h2.style.opacity = "0";
    h2.style.transition = "opacity 500ms";
    var br = document.createElement("br");
    h2.appendChild(br);
    var small = document.createElement("small");
    small.innerText = "% Body Fat";
    small.style.fontSize = "0.3em";
    small.style.textTransform = "uppercase";
    h2.appendChild(small);
    document.getElementById(id).children[0].appendChild(h2);

    // position
    h2.style.position = "absolute";
    h2.style.margin = "0";
    h2.style.padding = "0";
    h2.style.top = ((chart.height - h2.offsetHeight) / 2) + "px";
    h2.style.left = ((chart.width - h2.offsetWidth * 1.25) / 2) + "px"; // * 1.25 to bias left slightly

    // generate underlay chart
    var div = document.createElement("div");
    div.setAttribute("id", id + "-inner");
    document.getElementById(id).insertBefore(div, document.getElementById(id).children[0]);
    var chart2 = new CanvasJS.Chart(id + "-inner",
        {
            theme: "dark2",
            backgroundColor: "transparent",
            creditText: "",
            creditHref: "",
            animationEnabled: true,
            animationDuration: 1000,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    radius: chart.data[0].radius - 2,
                    innerRadius: chart.data[0].innerRadius + 20,
                    dataPoints: [
                        {
                            y: data.excess,
                            color: "transparent",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: ringMax - data.excess,
                            color: "rgba(255, 255, 255, 0.2)",
                            toolTipContent: null,
                            highlightEnabled: false
                        }
                    ]
                }
            ]
        }
    );
    setTimeout(function () {
        chart2.render();
    }, 500);

    // generate user chart
    var div = document.createElement("div");
    div.setAttribute("id", id + "-inner2");
    document.getElementById(id).insertBefore(div, document.getElementById(id).children[0]);
    var userChunkSize = 0.75;
    var chart3 = new CanvasJS.Chart(id + "-inner2",
        {
            theme: "dark2",
            backgroundColor: "transparent",
            creditText: "",
            creditHref: "",
            animationEnabled: true,
            animationDuration: 1000,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    radius: chart.data[0].innerRadius,
                    dataPoints: [
                        {
                            y: user - (userChunkSize / 2),
                            color: "rgba(255, 255, 255, 0.1)",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: userChunkSize,
                            color: "#fff",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: Math.max(data.excess - user - userChunkSize, 0),
                            color: "rgba(255, 255, 255, 0.1)",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: ringMax - (Math.max(data.excess - user - userChunkSize, 0) + userChunkSize + (user - (userChunkSize / 2))),
                            color: "transparent",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                    ]
                }
            ]
        }
    );

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
        chart3.render();
        h2.style.opacity = "1";
        clickCapture.parentElement.removeChild(clickCapture);
    });
    document.getElementById(id).appendChild(clickCapture);

});
