import {SongController} from "./song_controller.js";
import {BookController} from "./book_controller.js";

function deleteTableRows(tableToBeDeleted) {
    // TODO
}

export default function displaySongsBooks(clickedCountry) {
    // Determine if the user clicked on the book or song display button.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongDisplayStr = urlParams.get('isSongDisplay');

    // Get the table ids.
    const bookTable = document.querySelector("#dynamic_table_books");
    const songTable = document.querySelector("#dynamic_table_songs");

    if (isSongDisplayStr === "true") {
        // First delete all the rows that were the result of previous right clicks on other countries.
        deleteTableRows(songTable);

        // Get all the songs.
        const songController = new SongController();
        const songList = songController.getAllSongs();

        console.log(songList);
    }

    else {
        deleteTableRows(bookTable);

        // Get all the books.
        const bookController = new BookController();
        const bookList = bookController.getAllBooks();

        console.log(bookList);
    }
}

