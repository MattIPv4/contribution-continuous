document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = window.reportData.haemoglobin; // no validation >.>
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

    // generate chart
    data = data[(gender.toString().toLowerCase() === "f" ? "female" : "male")];
    var id = "haemoglobin-chart";
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
                            y: data.severe / (data.normal / 0.75),
                            indexLabel: "Severe Anemia",
                            color: window.reportData.colors.danger,
                            toolTipContent: "0-" + data.severe.toString() + " g/L"
                        },
                        {
                            y: (data.moderate - data.severe) / (data.normal / 0.75),
                            indexLabel: "Moderate Anemia",
                            color: window.reportData.colors.warning,
                            toolTipContent: data.severe.toString() + "-" + data.moderate.toString() + " g/L"
                        },
                        {
                            y: (data.mild - data.moderate) / (data.normal / 0.75),
                            indexLabel: "Mild Anemia",
                            color: window.reportData.colors.info,
                            toolTipContent: data.moderate.toString() + "-" + data.mild.toString() + " g/L"
                        },
                        {
                            y: (data.normal - data.mild) / (data.normal / 0.75),
                            indexLabel: "Normal Level",
                            color: window.reportData.colors.success,
                            toolTipContent: data.mild.toString() + "-" + data.normal.toString() + " g/L"
                        },
                        {
                            y: (data.normal / 0.75 * 0.25) / (data.normal / 0.75), // padding
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
    h2.innerText = user.toString();
    h2.style.fontSize = "2.2em";
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
            animationDuration: 750,
            height: window.reportData.chartHeight,
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    radius: chart.data[0].innerRadius - 10,
                    dataPoints: [
                        {
                            y: user / (data.normal / 0.75),
                            color: "#fff",
                            toolTipContent: null,
                            highlightEnabled: false
                        },
                        {
                            y: ((data.normal / 0.75) - user) / (data.normal / 0.75), // padding
                            color: "transparent",
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
});
