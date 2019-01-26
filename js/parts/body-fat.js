document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = 15.9;
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
            animationDuration: 750,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    explodeOnClick: false,
                    dataPoints: [
                        {
                            y: data.low,
                            indexLabel: "Low",
                            color: "#fac1b6",
                            toolTipContent: "0-" + data.low.toString() + "%",
                            exploded: true
                        },
                        {
                            y: (data.ultra_lean - data.low),
                            indexLabel: "Ultra Lean",
                            color: "#33ffd6",
                            toolTipContent: data.low.toString() + "-" + data.ultra_lean.toString() + "%",
                            exploded: true
                        },
                        {
                            y: (data.lean - data.ultra_lean),
                            indexLabel: "Lean",
                            color: "#33ffd6",
                            toolTipContent: data.ultra_lean.toString() + "-" + data.lean.toString() + "%",
                            exploded: true
                        },
                        {
                            y: (data.moderate_lean - data.lean),
                            indexLabel: "Moderately Lean",
                            color: "#33ffd6",
                            toolTipContent: data.lean.toString() + "-" + data.moderate_lean.toString() + "%",
                            exploded: true
                        },
                        {
                            y: (data.excess - data.moderate_lean),
                            indexLabel: "Excess",
                            color: "#ff7381",
                            toolTipContent: data.moderate_lean.toString() + "-" + data.excess.toString() + "%",
                            exploded: true
                        },
                        {
                            y: 100 - data.excess, // padding
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
    h2.innerText = user.toString() + "%";
    h2.style.fontSize = "3em";
    h2.style.opacity = "0";
    h2.style.transition = "opacity 750ms";
    var br = document.createElement("br");
    h2.appendChild(br);
    var small = document.createElement("small");
    small.innerText = "Body Fat";
    small.style.fontSize = "0.3em";
    small.style.textTransform = "uppercase";
    h2.appendChild(small);
    document.getElementById(id).children[0].appendChild(h2);
    setTimeout(function () {
        h2.style.opacity = "1";
    }, 500);

    // position
    h2.style.position = "absolute";
    h2.style.margin = "0";
    h2.style.padding = "0";
    h2.style.top = ((chart.height - h2.offsetHeight) / 2) + "px";
    h2.style.left = ((chart.width - h2.offsetWidth) / 2) + "px";

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
            animationDuration: 750,
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
                            y: 100 - data.excess,
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
    var chart3 = new CanvasJS.Chart(id + "-inner2",
        {
            theme: "dark2",
            backgroundColor: "transparent",
            creditText: "",
            creditHref: "",
            animationEnabled: true,
            animationDuration: 750,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    radius: chart.data[0].innerRadius - 2,
                    dataPoints: [
                        {
                            y: user - 0.5,
                            color: "rgba(255, 255, 255, 0.1)",
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: 1,
                            color: "#fff",
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: Math.max(data.excess - user - 1, 0),
                            color: "rgba(255, 255, 255, 0.1)",
                            toolTipContent: null,
                            highlightEnabled: false,
                            exploded: true
                        },
                        {
                            y: 100 - (Math.max(data.excess - user - 1, 0) + 1 + (user - 0.5)),
                            color: "transparent",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                    ]
                }
            ]
        }
    );
    setTimeout(function () {
        chart3.render();
    }, 500);


});
