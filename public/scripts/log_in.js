import {UserController} from "./user_controller.js"

function createEventListenerLoginButton() {
    const loginForm = document.querySelector("#login_form")
    const loginButton = document.querySelector("#login_button")
    const usernameLogin = document.querySelector("#username-login")
    const passwordLogin = document.querySelector("#password-login")
    const usernameErrorMessage = document.querySelector("#username-error-login")
    const passwordErrorMessage = document.querySelector("#password-error-login")
    const generalErrorMessage = document.querySelector("#general-error-login")

    // Create an instance of the userController to add and retrieve previously added users.
    const userController = new UserController()

    // Add event listeners for the back and the login buttons.
    loginForm.addEventListener("submit", function(event){
        event.preventDefault()
    })

    loginButton.addEventListener("click", handleLoginClick)

    function handleLoginClick(event) {
        event.preventDefault()

        const fields = [
            {element: usernameLogin, errorMessage: usernameErrorMessage, label: "Username"},
            {element: passwordLogin, errorMessage: passwordErrorMessage, label: "Password"}
        ];

        let isInputValid = true;
        let userFound = false;

        // Check if the required fields are not empty.
        for (const field of fields) {
            if (field.element.value === '') {
                field.errorMessage.textContent = `${field.label} Is Required.`
                isInputValid = false;
            } else {
                field.errorMessage.textContent = '';
            }
        }

        if (isInputValid) {
            // Retrieve the user list form the userController.
            const users = userController.getAllUsers();

            // Check if the username exists, and the provided password matches the username.
            for (const user of users) {
                // Case 1: The username is found, but the password is incorrect.
                if (user._username === usernameLogin.value && user._password !== passwordLogin.value) {

                    generalErrorMessage.textContent = "The password provided is wrong. Please try again!";
                    isInputValid = false;
                    break;
                } else {
                    generalErrorMessage.textContent = ""
                }

                // Case 2: The username is found and the password matches the username.
                if (user._username === usernameLogin.value && user._password === passwordLogin.value) {
                    userFound = true;
                }
            }

            // Case 3: No username matches the provided username.
            if (!userFound && isInputValid) {
                generalErrorMessage.textContent = "You do not have an account yet. Please sign up.";
                isInputValid = false;
            }
        }

        if (isInputValid) {
            console.log("FUCK YES. WE LOGGED IN.");
        }
    }
}

window.onload = function() {
    createEventListenerLoginButton()
}