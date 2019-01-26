document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user = 141;
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
            data: [
                {
                    type: "doughnut",
                    startAngle: -90,
                    explodeOnClick: false,
                    dataPoints: [
                        {
                            y: data.severe / (data.normal / 0.75),
                            indexLabel: "Severe Anemia",
                            color: "#ff7381",
                            toolTipContent: "0-" + data.severe.toString() + " g/L"
                        },
                        {
                            y: (data.moderate - data.severe) / (data.normal / 0.75),
                            indexLabel: "Moderate Anemia",
                            color: "#fac1b6",
                            toolTipContent: data.severe.toString() + "-" + data.moderate.toString() + " g/L"
                        },
                        {
                            y: (data.mild - data.moderate) / (data.normal / 0.75),
                            indexLabel: "Mild Anemia",
                            color: "#d6f5ff",
                            toolTipContent: data.moderate.toString() + "-" + data.mild.toString() + " g/L"
                        },
                        {
                            y: (data.normal - data.mild) / (data.normal / 0.75),
                            indexLabel: "Normal Level",
                            color: "#33ffd6",
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
