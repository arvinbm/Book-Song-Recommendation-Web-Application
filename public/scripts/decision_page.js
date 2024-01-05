import {UserController} from "./user_controller.js"

/**
 This function dynamically inserts the name which corresponds
 to the account currently in use in the welcome element in the decision_page.html.
 **/
let username = "";
function insertDynamicName() {
    // Retrieve the welcome header element in decision_page.html.
    const welcome_element = document.querySelector("#decision_welcome_element");

    // Retrieve the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    username = urlParams.get('username');

    const userController = new UserController();
    const users = userController.getAllUsers();
    let associatedName = "";

    // Find the associated name with the username.
    for (const user of users) {
        if (user._username === username) {
            associatedName = user._name;
        }
    }

    // Use the name to dynamically welcome the user.
    welcome_element.textContent = `Welcome ${associatedName}`;

}

function addEventListenersForButtons() {
    const bookRecommendationButton = document.querySelector("#decision_book_recommendation");
    const songRecommendationButton = document.querySelector("#decision_song_recommendation");
    const bookDisplayButton = document.querySelector("#decision_book_display");
    const songDisplayButton = document.querySelector("#decision_song_display");
    let isSongRecommendation;

    bookRecommendationButton.addEventListener("click", function() {
        isSongRecommendation = false;
        window.location.href = `book_recommendation.html?username=${encodeURIComponent(username)}
            &isSongRecommendation=${isSongRecommendation}`;
    });

    songRecommendationButton.addEventListener("click", function() {
        isSongRecommendation = true;
        window.location.href = `book_recommendation.html?username=${encodeURIComponent(username)}
            &isSongRecommendation=${isSongRecommendation}`;
    });

    bookDisplayButton.addEventListener("click", function() {
        // TODO
    });

    songDisplayButton.addEventListener("click", function() {
        // TODO
    });
}

window.onload = function() {
    insertDynamicName();
    addEventListenersForButtons();
}