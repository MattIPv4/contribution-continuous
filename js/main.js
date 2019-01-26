document.addEventListener('DOMContentLoaded', function () {

    // get data
    var data = {
        gender: "m"
    };

    // save data
    window.reportData = data;

    // trigger elements
    var event = new Event('jsonDataLoaded');
    document.dispatchEvent(event);
});
