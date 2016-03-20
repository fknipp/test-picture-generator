$("#generate").on("click", function() {
	generatePattern($("#workspace"), $("#width").val(), $("#height").val());
	return false;
})

function generatePattern(workspace, width, height) {
	workspace.empty();

	var canvas = $("<canvas>")
		.attr({"width": width, "height": height})
		.appendTo(workspace)[0];

	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);

		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

		var offsetx = Math.floor(width % 20 / 2) + 0.5;
		for (var x = offsetx ; x < width ; x += 10) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}

		var offsety = Math.floor(height % 20 / 2) + 0.5;
		for (var y = offsety ; y < height ; y += 10) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		var radius_step = Math.floor(Math.min(width, height) / 40) * 5;
		for (var i = 1; i <= 4; i++) {
			ctx.beginPath();
			ctx.arc(
				Math.floor(width / 2) + 0.5,
				Math.floor(height / 2) + 0.5,
				i * radius_step, 0, 2 * Math.PI);
			ctx.stroke();
		}

		ctx.font = Math.floor(height / 4) + "px sans-serif";
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(width + "×" + height, width/2, height/2);
	}
}

$("#download").on("click", function() {
	var canvas = $("canvas")[0];
	var image = canvas.toDataURL("image/png");
	this.href = image;
	this.download = "image-" + canvas.width + "x" + canvas.height + ".png";
});

generatePattern($("#workspace"), $("#width").val(), $("#height").val());
