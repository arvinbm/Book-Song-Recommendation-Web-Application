import {UserController} from "./user_controller.js"

/**
 This function dynamically inserts the name which corresponds
 to the account currently in use in the welcome element in the decision_page.html.
 **/
function insertDynamicName() {
    // Retrieve the welcome header element in decision_page.html.
    const welcome_element = document.querySelector("#decision_welcome_element");

    // Retrieve the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

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

window.onload = function() {
    insertDynamicName();
}