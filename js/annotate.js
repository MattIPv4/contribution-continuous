document.addEventListener('DOMContentLoaded', function () {

    // get and check canvas exists
    var canvas = document.getElementById("annotate-canvas");
    if (canvas) {
        // apply base styling to canvas
        canvas.style.pointerEvents = "none";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;

        // get 2d context
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            console.log(ctx);

            // ability to draw
            function draw(ctx, x, y) {
                // check for new start of drawing
                if (lastX === -1) {
                    lastX = x;
                    lastY = y;
                }

                // set the color
                var r = 255, g = 0, b = 0, a = 1;
                var color = "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + a.toString() + ")";
                ctx.strokeStyle = color;
                ctx.fillStyle = color;

                // draw the line
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.fill();
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.closePath();

                // draw a circle to ensure nice edge
                ctx.beginPath();
                ctx.arc(x, y, 2.9/2, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.fill();

                // set last as this
                lastX = x;
                lastY = y;
            }

            // track the mouse
            var mouseX, mouseY, mouseDown = 0;
            var lastX, lastY = -1;

            function down() {
                mouseDown = 1; // let move know we're down
                draw(ctx, mouseX, mouseY); // draw at current
            }

            function up() {
                // let move know we're up
                mouseDown = 0;
                // reset last positions
                lastX = -1;
                lastY = -1;
            }

            function move(e) {
                getMousePos(e); // get the latest position

                if (mouseDown === 1) { // if moving and also down, draw
                    draw(ctx, mouseX, mouseY);
                }
            }

            // get the position of moues on canvas
            function getMousePos(e) {
                if (e.offsetX) {
                    mouseX = e.offsetX;
                    mouseY = e.offsetY;
                } else if (e.layerX) {
                    mouseX = e.layerX;
                    mouseY = e.layerY;
                }
            }

            // register events
            canvas.addEventListener("mousedown", down, false);
            window.addEventListener("mouseup", up, false);
            canvas.addEventListener("mousemove", move, false);
        }
    }

});
