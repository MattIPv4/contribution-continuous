document.addEventListener('DOMContentLoaded', function () {

    // get data
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var data = {
        chartHeight: (h / 2) - (h * 0.1),
        gender: "m"
    };

    // save data
    window.reportData = data;

    // trigger elements
    var event = new Event('jsonDataLoaded');
    document.dispatchEvent(event);
});
