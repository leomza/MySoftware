//*********LOGIN MODAL*************/
// Get the modal
const modal = document.querySelector("#myModal");

// Get the button that opens the modal
const btn = document.querySelector("#loginBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//*********EDIT MODAL*************/
// Get the modal
const modalEdit = document.querySelector("#myModalEdit");

// Get the button that opens the modal
const btnEdit = document.querySelector("#editBtn");

// Get the <span> element that closes the modal
const spanEdit = document.getElementsByClassName("closeEdit")[0];

// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function () {
    modalEdit.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalEdit) {
        modalEdit.style.display = "none";
    }
}