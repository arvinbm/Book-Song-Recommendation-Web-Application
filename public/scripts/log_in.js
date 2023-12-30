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
        ]

        let isInputValid = true;

        // Check if the required fields are not empty.
        for (const field of fields) {
            if (field.element.value === '') {
                field.errorMessage.textContent = `${field.label} Is Required.`
                isInputValid = false;
            } else {
                field.errorMessage.textContent = '';
            }
        }
    }
}

window.onload = function() {
    createEventListenerLoginButton()
}