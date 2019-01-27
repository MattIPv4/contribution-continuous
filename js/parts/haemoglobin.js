document.addEventListener('jsonDataLoaded', function () {
    // user value
    var gender = window.reportData.gender;

    // save default values
    var data = {
        male: {
            severe: 80,
            moderate: 100,
            mild: 135,
            normal: 175
        },
        female: {
            severe: 80,
            moderate: 100,
            mild: 120,
            normal: 160
        }
    };
    data = data[(gender.toString().toLowerCase() === "f" ? "female" : "male")];

    // user value
    var max = (data.normal / 0.75);
    var user = Math.max(Math.min(window.reportData.haemoglobin, max), 0);

    // generate chart
    var id = "haemoglobin-chart";
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
                            y: data.severe / max,
                            indexLabel: "Severe Anemia (0-" + data.severe.toString() + ")",
                            color: window.reportData.colors.danger,
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: (data.moderate - data.severe) / max,
                            indexLabel: "Moderate Anemia (" + data.severe.toString() + "-" + data.moderate.toString() + ")",
                            color: window.reportData.colors.warning,
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: (data.mild - data.moderate) / max,
                            indexLabel: "Mild Anemia (" + data.moderate.toString() + "-" + data.mild.toString() + ")",
                            color: window.reportData.colors.info,
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: (data.normal - data.mild) / max,
                            indexLabel: "Normal Level (" + data.mild.toString() + "-" + data.normal.toString() + ")",
                            color: window.reportData.colors.success,
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: 0.25, // padding
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
    h2.innerText = window.reportData.haemoglobin.toString();
    h2.style.fontSize = (window.reportData.chartHeight / 8).toString() + "px";
    h2.style.opacity = "0";
    h2.style.transition = "opacity 500ms";
    var br = document.createElement("br");
    h2.appendChild(br);
    var small = document.createElement("small");
    small.innerText = "g/L";
    small.style.fontSize = "0.4em";
    h2.appendChild(small);
    document.getElementById(id).children[0].appendChild(h2);

    // position
    h2.style.position = "absolute";
    h2.style.margin = "0";
    h2.style.padding = "0";
    h2.style.top = ((chart.height - h2.offsetHeight) / 2) + "px";
    h2.style.left = ((chart.width - h2.offsetWidth) / 2) + "px";

    // generate user chart
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
                    radius: chart.data[0].innerRadius - 10,
                    dataPoints: [
                        {
                            y: user / max,
                            color: "#fff",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: (max - user) / max, // padding
                            color: "transparent",
                            toolTipContent: null,
                            highlightEnabled: false
                        }
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
        chart2.render();
        h2.style.opacity = "1";
        clickCapture.parentElement.removeChild(clickCapture);
    });
    document.getElementById(id).appendChild(clickCapture);
});
