
export default function displaySongsBooks(clickedCountry) {
    // Determine if the user clicked on the book or song display button.
    const urlParams = new URLSearchParams(window.location.search);
    const isSongDisplayStr = urlParams.get('isSongDisplay');

    console.log("CLICKED COUNTRY: " + clickedCountry);
}

