var modal = document.getElementById('demo-modal');
var modal2 = document.getElementById('demo-modal2');
var modal3 = document.getElementById('demo-modal3');
var modal4 = document.getElementById('demo-modal4');
var modal5 = document.getElementById('demo-modal5');
var modal6 = document.getElementById('demo-modal6');
var btn = document.getElementById('open-modal');
var btn2 = document.getElementById('open-modal2');
var btn3 = document.getElementById('open-modal3');
var btn4 = document.getElementById('open-modal4');
var btn5 = document.getElementById('open-modal5');
var btn6 = document.getElementById('open-modal6');
var close = modal.getElementsByClassName('close')[0];
var close2 = modal2.getElementsByClassName('close')[0];
var close3 = modal3.getElementsByClassName('close')[0];
var close4 = modal4.getElementsByClassName('close')[0];
var close5 = modal5.getElementsByClassName('close')[0];
var close6 = modal6.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal.
btn.onclick = function () {
    modal.style.display = 'block';
};

btn2.onclick = function () {
    modal2.style.display = 'block';
};

btn3.onclick = function () {
    modal3.style.display = 'block';
};

btn4.onclick = function () {
    modal4.style.display = 'block';
};

btn5.onclick = function () {
    modal5.style.display = 'block';
};

btn6.onclick = function () {
    modal6.style.display = 'block';
};
// When the user clicks on 'X', close the modal
close.onclick = function () {
    modal.style.display = 'none';
};

close2.onclick = function () {
    modal2.style.display = 'none';
};

close3.onclick = function () {
    modal3.style.display = 'none';
};

close4.onclick = function () {
    modal4.style.display = 'none';
};

close5.onclick = function () {
    modal5.style.display = 'none';
};

close6.onclick = function () {
    modal6.style.display = 'none';
};

// When the user clicks outside the modal -- close it.
window.onclick = function (event) {
    if (event.target == modal) {
        // Which means he clicked somewhere in the modal (background area), but not target = modal-content
        modal.style.display = 'none';
    }
};
