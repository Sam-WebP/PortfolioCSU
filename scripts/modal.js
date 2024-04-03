// Get modal
var modal = document.getElementById("myModal");

// Get button that opens the modal
var btn = document.getElementById("myBtn");

// Get element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When user clicks on button, open modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When user clicks on (x), close modal
span.onclick = function() {
    modal.style.display = "none";
}

// When user clicks outside of modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}