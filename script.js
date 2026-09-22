const imageInput = document.getElementById("imageInput");
const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");
const textSize = document.getElementById("textSize");
const textColor = document.getElementById("textColor");
const downloadBtn = document.getElementById("downloadBtn");

const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let image = new Image();

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        image.onload = function () {

            canvas.width = image.width;
            canvas.height = image.height;

            drawMeme();
        };

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

function drawMeme() {

    if (!image.src) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const size = Number(textSize.value);

    ctx.font = "bold " + size + "px Arial";
    ctx.fillStyle = textColor.value;
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;

    drawText(topText.value, canvas.width / 2, size + 20);

    drawText(
        bottomText.value,
        canvas.width / 2,
        canvas.height - 20
    );
}

function drawText(text, x, y) {

    if (text.trim() === "") {
        return;
    }

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}

topText.addEventListener("input", drawMeme);

bottomText.addEventListener("input", drawMeme);

textSize.addEventListener("input", drawMeme);

textColor.addEventListener("input", drawMeme);

downloadBtn.addEventListener("click", function () {

    if (!image.src) {
        alert("Please select an image first.");
        return;
    }

    const link = document.createElement("a");

    link.download = "my-meme.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
});