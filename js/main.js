document.addEventListener('DOMContentLoaded', function () {

    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'report.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function process(data) {
        // parse data
        data = JSON.parse(data);
        if (!data) { return; }

        // save data
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var reportData = {
            chartHeight: (h / 2) - (h * 0.1),
            gender: data.gender.toString().toLowerCase() || "m",
            height: parseFloat(data.height) || 0,
            weight: parseFloat(data.weight)
        };
        window.reportData = reportData;

        // trigger elements
        var event = new Event('jsonDataLoaded');
        document.dispatchEvent(event);
    }

    loadJSON(process);
});
