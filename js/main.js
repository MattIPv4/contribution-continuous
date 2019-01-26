document.addEventListener('DOMContentLoaded', function () {

    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'report.json', true);
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
            chartHeight: (h / 2) - (h * 0.1),
            colors: {
                danger: "#ff7381",
                warning: "#fac1b6",
                success: "#33ffd6",
                info: "#d6f5ff"
            },

            gender: data.gender.toString().toLowerCase() || "m",
            height: parseFloat(data.height) || 0,
            weight: parseFloat(data.weight) || 0,
            bmi: parseFloat(data.bmi) || 0,
            activityLevel: parseFloat(data.activityLevel) || 0,
            pressureDiastolic: parseFloat(data.pressureDiastolic) || 0,
            pressureSystolic: parseFloat(data.pressureSystolic) || 0,
            bodyFat: parseFloat(data.bodyFat) || 0,
            qDiabetes: parseFloat(data.qDiabetes) || 0,
            HbA1C: parseFloat(data.HbA1C) || 0,
            haemoglobin: parseFloat(data.haemoglobin) || 0,
            cholesterolTotal: parseFloat(data.cholesterolTotal) || 0,
            cholesterolLDL: parseFloat(data.cholesterolLDL) || 0,
            cholesterolHDL: parseFloat(data.cholesterolHDL) || 0,
            totalHDLRatio: parseFloat(data.totalHDLRatio) || 0,
            triglycerides: parseFloat(data.triglycerides) || 0,
        };

        // trigger elements
        var event = new Event('jsonDataLoaded');
        document.dispatchEvent(event);
    }

    loadJSON(process);
});
