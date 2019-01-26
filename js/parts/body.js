document.addEventListener('jsonDataLoaded', function () {
    // user value
    var user_height = window.reportData.height;
    var user_weight = window.reportData.weight;
    var gender = window.reportData.gender;

    // create image
    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    var img = document.createElement("img");
    img.src = "assets/" + (gender.toString().toLowerCase() === "f" ? "female" : "male") + ".png";
    img.style.height = window.reportData.chartHeight.toString() + "px";
    div.appendChild(img);

    // create data
    var data_div = document.createElement("div");
    data_div.style.display = "flex";
    data_div.style.flexDirection = "column";
    data_div.style.margin = "0 1.5rem";

    // create data: top bar
    var top = document.createElement("div");
    top.style.height = "4px";
    top.style.background = "#fff";
    top.style.opacity = "0";
    top.style.transition = "opacity 750ms";
    data_div.appendChild(top);
    var top_stem = document.createElement("div");
    top_stem.style.flexGrow = "1";
    top_stem.style.alignSelf = "center";
    top_stem.style.width = "4px";
    top_stem.style.background = "#fff";
    top_stem.style.opacity = "0";
    top_stem.style.transition = "opacity 750ms";
    data_div.appendChild(top_stem);

    // create data: data
    var data = document.createElement("h2");
    data.style.margin = "1rem 0";
    data.style.padding = "0";
    data.style.opacity = "0";
    data.style.transition = "opacity 750ms";
    data.innerText = user_height.toString() + " cm";
    var br = document.createElement("br");
    data.appendChild(br);
    var sub_data = document.createElement("small");
    sub_data.innerText = user_weight.toString() + " kg";
    data.appendChild(sub_data);
    data_div.appendChild(data);

    // create data: bottom bar
    var bottom_stem = document.createElement("div");
    bottom_stem.style.flexGrow = "1";
    bottom_stem.style.alignSelf = "center";
    bottom_stem.style.width = "4px";
    bottom_stem.style.background = "#fff";
    bottom_stem.style.opacity = "0";
    bottom_stem.style.transition = "opacity 750ms";
    data_div.appendChild(bottom_stem);
    var bottom = document.createElement("div");
    bottom.style.height = "4px";
    bottom.style.background = "#fff";
    bottom.style.opacity = "0";
    bottom.style.transition = "opacity 750ms";
    data_div.appendChild(bottom);

    // save to dom
    div.appendChild(data_div);
    document.getElementById("body").appendChild(div);

    // animate
    setTimeout(function () {
        data.style.opacity = "1";
    }, 100);
    setTimeout(function () {
        top_stem.style.opacity = "1";
        bottom_stem.style.opacity = "1";
    }, 400);
    setTimeout(function () {
        top.style.opacity = "1";
        bottom.style.opacity = "1";
    }, 700);

});
