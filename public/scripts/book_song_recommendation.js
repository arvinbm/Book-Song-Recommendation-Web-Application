function handleRecommendedSong() {
    // TODO
}

function handleRecommendedBook() {
    // TODO
}

window.onload = function() {
    // Determine if the user clicked on the book or song recommendation.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongRecommendation = urlParams.get('isSongRecommendation');

    if (isSongRecommendation) {
        // Add the new recommended song.
        handleRecommendedSong();
    }

    else {
        // Add the new recommended book.
        handleRecommendedBook();
    }

}