/*begin variable listing*/

// modal for displaying captcha window
var modal = document.getElementById("captcha_modal");

// final captcha text
var captcha_text = "";

// button to call captcha modal
var btnShow = document.getElementById("show_captcha_button");

// button to verify user input
var btnVerify = document.getElementById("verifyButton");

// button to refresh captcha
var btnRefresh = document.getElementById("refreshButton");

// the 'x' button, closes modal
var span = document.getElementsByClassName("close_captcha")[0];

// list of chars to include in captcha
var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

// 2d context, used to write text as image
var tCtx = document.getElementById('textCanvas').getContext('2d');

// image element to show captcha
var imageElem = document.getElementById('image');

// font for captcha text, included in html file
var font = '270 27px "Cutive Mono"';


// 'Show Captcha window' button onclick, shows modal and calls generate captcha method
btnShow.onclick = function() {
    modal.style.display = "block";
    Captcha();
};

// 'refresh' button onclick, calls generate captcha method to refresh
btnRefresh.onclick = function() {
    Captcha();
};

// 'Verify' button onclick, checks if user input is correct
btnVerify.onclick = function() {
    if (ValidCaptcha()) {
        window.alert("Correct!");
    } else {
        window.alert("Hmmm...");
    }
};

// 'x'  button onclick, closes modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

};

// generates captcha text and converts it to image
function Captcha() {
    for (var i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    captcha_text = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;

    document.fonts.load(font)
        .then(function() {
            tCtx.font = font;
            tCtx.canvas.width = tCtx.measureText(captcha_text).width;
            tCtx.canvas.height = 40;
            tCtx.font = font;
            tCtx.fillStyle = '#444';
            tCtx.fillText(captcha_text, 0, 20);

            var c = document.getElementById("textCanvas");
            var ctx = c.getContext("2d");
            // Draw lines
            for (var i = 0; i < 7; i++) {
                ctx.beginPath();
                ctx.moveTo(c.width * Math.random(), c.height * Math.random());
                ctx.lineTo(c.width * Math.random(), c.height * Math.random());
                ctx.strokeStyle = "rgb(" +
                    Math.round(256 * Math.random()) + "," +
                    Math.round(256 * Math.random()) + "," +
                    Math.round(256 * Math.random()) + ")";
                ctx.stroke();
            }

            imageElem.src = tCtx.canvas.toDataURL();
        });
}

// checks user input
function ValidCaptcha() {
    var string1 = removeSpaces(captcha_text);
    var string2 = removeSpaces(document.getElementById('txtInput').value);
    console.log(string1 + " " + string2);
    if (string1 === string2) {
        return true;
    } else {
        return false;
    }
}

// to improve the visibility of the text in the picture, spaces are added
// between the characters. This function removes spaces to compare captcha with user input
function removeSpaces(string) {
    return string.split(' ').join('');
}