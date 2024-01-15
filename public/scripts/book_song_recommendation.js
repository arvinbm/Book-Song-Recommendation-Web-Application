import {Song} from "./song.js"
import {Book} from "./book.js"
import {SongController} from "./song_controller.js"
import {BookController} from "./book_controller.js"

function setEventListenerBackButtonSong(username) {
    const songRecommendBackButton = document.querySelector("#back_button_song_rec");

    // Add the event listeners.
    songRecommendBackButton.addEventListener("click", function () {
        window.location.href = `decision_page.html?username=${encodeURIComponent(username)}`
    });
}

function setEventListenerBackButtonBook(username) {
    const bookRecommendBackButton = document.querySelector("#back_button_book_rec");

    bookRecommendBackButton.addEventListener("click", function () {
        window.location.href = `decision_page.html?username=${encodeURIComponent(username)}`
    });
}

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

function handleRecommendedSong(username) {
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
            // Create an instance of the songController and Song to add the song.
            const newSong = new Song(songName.value, artistName.value, username,
                releaseYear.value, songDescription.value);
            const songController = new SongController();

            // Add the song.
            songController.addSong(newSong);
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

function handleRecommendedBook(username) {
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
            const newBook = new Book(bookName.value, authorName.value, username,
                publicationYear.value, bookDescription.value);
            const bookController = new BookController();

            // Add the book.
            bookController.addBook(newBook);
        }
    }

}

window.onload = function() {
    // Determine if the user clicked on the book or song recommendation.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongRecommendationStr = urlParams.get('isSongRecommendation');

    // Retrieve the username from the URL.
    const username = urlParams.get('username').trim().replace(/\s+/g, ' ');

    if (isSongRecommendationStr === "true") {
        // Set event listener for the back buttons.
        setEventListenerBackButtonSong(username);

        // Add the new recommended song.
        handleRecommendedSong(username);
    }

    else {
        // Set event listener for the back buttons.
        setEventListenerBackButtonBook(username);

        // Add the new recommended book.
        handleRecommendedBook(username);
    }
}