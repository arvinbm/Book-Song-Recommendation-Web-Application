function handleInputValidity() {
    const songName = document.querySelector("#song-name");
    const artistName = document.querySelector("#artist-name");
    const songNameErrorMessage = document.querySelector("#song-name-error-message");
    const artistNameErrorMessage = document.querySelector("#artist-name-error-massage");

    if (songName.value === "") {
        songNameErrorMessage.textContent = "Song name is required.";
    } else {
        songNameErrorMessage.textContent = "";
    }

    if (artistName.value === "") {
        artistNameErrorMessage.textContent = "Artist name is required.";
    } else {
        artistNameErrorMessage.textContent = "";
    }
}

function handleRecommendedSong() {
    const songName = document.querySelector("#song-name");
    const artistName = document.querySelector("#artist-name");
    const releaseYear = document.querySelector("#release-year");
    const songDescription = document.querySelector("#song-description");
    const songRecommendButton = document.querySelector("#song_recommend");
    const songRecommendForm = document.querySelector("#song_form");

    // Set an event listener for song recommendation button.
    songRecommendForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    songRecommendButton.addEventListener("click", handleRecommendClick);

    function handleRecommendClick(event) {
        event.preventDefault();

        // Validate the inputs.
        handleInputValidity();
        console.log("WE GOT HEREE");
    }
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