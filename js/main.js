document.addEventListener('DOMContentLoaded', function () {

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    window.doModal = function (title, content, section) {
        // generate outer modal and setup destruction
        var modal = document.createElement("div");
        modal.addEventListener("click", function () {
            // hide section
            section.style.transition = "opacity 500ms";
            setTimeout(function () {
                section.style.opacity = "0";
                setTimeout(function () {
                    section.style.position = "";
                    section.style.top = "";
                    section.style.left = "";
                    section.style.width = "";
                    section.style.height = "";
                    section.style.zIndex = "";
                    section.style.pointerEvents = "";
                    setTimeout(function () {
                        section.style.transition = "";
                        section.style.opacity = "1";

                        // hide modal
                        modal.style.opacity = "0";
                        modal.style.pointerEvents = "none";
                        setTimeout(function () {
                            modal.parentElement.removeChild(modal);
                        }, 510);
                    }, 10);
                }, 510);
            }, 10);
        });
        modal.className = "modal";

        // article container
        var div = document.createElement("div");
        div.className = "inner";

        // create article and title
        var article = document.createElement("article");
        var h1 = document.createElement("h1");
        h1.innerText = title;
        article.appendChild(h1);

        // add content (allow direct element pass-through)
        if (content instanceof HTMLElement) {
            article.appendChild(content);
        } else {
            var temp = document.createElement("p");
            temp.innerHTML = content.replaceAll("\n", "<br/>");
            article.appendChild(temp);
        }

        // append to body
        div.appendChild(article);
        div.style.top = section.offsetHeight.toString() + "px";
        modal.appendChild(div);
        document.body.appendChild(modal);

        // show modal
        setTimeout(function () {
            modal.style.opacity = "1";

            // show section
            setTimeout(function () {
                section.style.transition = "opacity 0ms";
                section.style.opacity = "0";
                section.style.position = "absolute";
                section.style.height = section.offsetHeight.toString() + "px";
                section.style.top = "0";
                section.style.width = section.offsetWidth.toString() + "px";
                section.style.left = "calc((100% - " + section.offsetWidth.toString() + "px) / 2)";
                section.style.zIndex = "999";
                section.style.pointerEvents = "none";
                setTimeout(function () {
                    section.style.transition = "opacity 1000ms";
                    section.style.opacity = "1";
                }, 10);
            }, 510);
        }, 10);
    };

    function loadJSON(name, callback) {
        // load the report json file
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "reports/" + name.toString(), true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === 200) {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function process(data) {
        // parse data
        data = JSON.parse(data);
        if (!data) {
            return;
        }

        // save data
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        window.reportData = {
            chartHeight: (h / 2) - (h * 0.15),
            colors: {
                danger: "#ff7381",
                warning: "#f19384",
                success: "#33ffd6",
                info: "#d6f5ff"
            },

            gender: data.gender.toString().toLowerCase() || "m",
            height: parseFloat(data.height || 0),
            weight: parseFloat(data.weight || 0),
            bmi: parseFloat(data.bmi || 0),
            activityLevel: parseFloat(data.activityLevel || 0),
            pressureDiastolic: parseFloat(data.pressureDiastolic || 0),
            pressureSystolic: parseFloat(data.pressureSystolic || 0),
            bodyFat: parseFloat(data.bodyFat || 0),
            qDiabetes: parseFloat(data.qDiabetes || 0),
            qDiabetesReport: (data.qDiabetesReport || "").toString(),
            HbA1C: parseFloat(data.HbA1C || 0),
            haemoglobin: parseFloat(data.haemoglobin || 0),
            cholesterolTotal: parseFloat(data.cholesterolTotal || 0),
            cholesterolLDL: parseFloat(data.cholesterolLDL || 0),
            cholesterolHDL: parseFloat(data.cholesterolHDL || 0),
            totalHDLRatio: parseFloat(data.totalHDLRatio || 0),
            triglycerides: parseFloat(data.triglycerides || 0),
        };

        // trigger elements
        var event = new Event('jsonDataLoaded');
        document.dispatchEvent(event);
    }

    // get file to use or default
    var url = new URL(location.href);
    var file = url.searchParams.get("report") || "male1.json";

    // load data and animate body
    loadJSON(file, process);
    setTimeout(function () {
        document.body.style.opacity = "1";
    }, 100);
});
