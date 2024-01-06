function handleInputValiditySong() {
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

    // If any of the required fields are empty return false.
    return !(songName.value === "" || artistName.value === "");
}

function handleRecommendedSong() {
    const songName = document.querySelector("#song-name");
    const artistName = document.querySelector("#artist-name");
    const releaseYear = document.querySelector("#release-year");
    const songDescription = document.querySelector("#song-description");
    const songRecommendButton = document.querySelector("#song_recommend");
    const songRecommendForm = document.querySelector("#song_form");
    let validatedSuccessfully = true;

    // Set an event listener for song recommendation button.
    songRecommendForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    songRecommendButton.addEventListener("click", handleRecommendClick);

    function handleRecommendClick(event) {
        event.preventDefault();

        // Validate the inputs.
        validatedSuccessfully = handleInputValiditySong();

        if (validatedSuccessfully) {
            // TODO
        }
    }
}

function handleInputValidityBook() {
    const bookName = document.querySelector("#book-name");
    const authorName = document.querySelector("#author-name");
    const bookNameErrorMessage = document.querySelector("#book-name-error-message");
    const authorNameErrorMessage = document.querySelector("#book-author-error-message");

    if (bookName.value === "") {
        bookNameErrorMessage.textContent = "Book name is required.";
    } else {
        bookNameErrorMessage.textContent = "";
    }

    if (authorName.value === "") {
        authorNameErrorMessage.textContent = "Author name is required.";
    } else {
        authorNameErrorMessage.textContent = "";
    }

    // If any of the required fields are empty return false.
    return !(bookName.value === "" || authorName.value === "");
}

function handleRecommendedBook() {
    const bookName = document.querySelector("#book-name");
    const authorName = document.querySelector("#author-name");
    const publicationYear = document.querySelector("#publication-year");
    const bookDescription = document.querySelector("#book-description");
    const bookRecommendButton = document.querySelector("#book_recommend");
    const bookRecommendForm = document.querySelector("#book_form");
    let validatedSuccessfully = true;

    // Set an event listener for book recommendation button.
    bookRecommendForm.addEventListener("click", function(event) {
        event.preventDefault();
    });

    bookRecommendButton.addEventListener("click", handleRecommendClick);

    function handleRecommendClick(event) {
        event.preventDefault();

        // Validate the inputs.
        validatedSuccessfully = handleInputValidityBook();

        if (validatedSuccessfully) {
            // TODO
        }
    }

}

window.onload = function() {
    // Determine if the user clicked on the book or song recommendation.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongRecommendationStr = urlParams.get('isSongRecommendation');

    if (isSongRecommendationStr === "true") {
        // Add the new recommended song.
        handleRecommendedSong();
    }

    else {
        // Add the new recommended book.
        handleRecommendedBook();
    }

}