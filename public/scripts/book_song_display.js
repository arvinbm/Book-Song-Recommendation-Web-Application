
function displaySongs() {
    // TODO
}

function displayBooks() {
    // TODO
}

window.onload = function() {
    // Determine if the user clicked on the book or song display button.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongDisplayStr = urlParams.get('isSongDisplay');

    if (isSongDisplayStr === "true") {
        displaySongs();
    } else {
        displayBooks();
    }
}