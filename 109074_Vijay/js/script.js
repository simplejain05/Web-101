function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function remove(el) {

    var row = el.closest('.row');
    row.parentNode.removeChild(row);
}