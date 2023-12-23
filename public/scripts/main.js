import {User} from "./user.js";

// This lists holds the user objects.
let users = []
function createEventListenersEye() {

    // Getting the element ids from the DOM.
    const passwordInput = document.querySelector("#password")
    const eye = document.querySelector("#eye")

    // While the user is inserting a password display the eye icon.
    passwordInput.addEventListener("focus", function() {
        eye.style.display = 'inline'
    })

    // When the user is no longer interacting with the user hide the eye icon.
    passwordInput.addEventListener("blur", function() {
        if (passwordInput.value === '') {
            eye.style.display = 'none'
        }
    })

    // https://medium.com/@miguelznunez/html-css-javascript-how-to-show-hide-password-using-the-eye-icon-27f033bf84ad
    eye.addEventListener("click", function(){
        this.classList.toggle("fa-eye-slash")
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
        passwordInput.setAttribute("type", type)
    })
}

function  createEventListenersSignupButton() {
    const signupForm = document.querySelector("#signup_form")
    const signupButton = document.querySelector("#signup_page_button")
    const name = document.querySelector("#name-signup")
    const lastName = document.querySelector('#lastname-signup')
    const email = document.querySelector('#email-signup')
    const country = document.querySelector('#country')
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const nameErrorMessage = document.querySelector('#name-error')
    const lastNameErrorMessage = document.querySelector('#lastname-error')
    const emailErrorMessage = document.querySelector('#email-error')
    const usernameErrorMessage = document.querySelector('#username-error')
    const passwordErrorMessage = document.querySelector('#password-error')
    const generalErrorMessage = document.querySelector('#general-error')

    signupForm.addEventListener("submit", function(event){
        event.preventDefault()
    })

    signupButton.addEventListener("click", handleSignupClick)

    function handleSignupClick(event) {
        event.preventDefault();

        const fields = [
            { element: name, errorMessage: nameErrorMessage, label: "First Name" },
            { element: lastName, errorMessage: lastNameErrorMessage, label: "Last Name" },
            { element: email, errorMessage: emailErrorMessage, label: "Email" },
            { element: username, errorMessage: usernameErrorMessage, label: "Username" },
            { element: password, errorMessage: passwordErrorMessage, label: "Password" }
        ];

        let isInputsValid = true;

        for (const field of fields) {
            if (field.element.value === '') {
                field.errorMessage.textContent = `${field.label} Is Required.`;
                isInputsValid = false;
            } else {
                field.errorMessage.textContent = '';
            }
        }

        if (isInputsValid) {
            for (const user of users) {
                if (user.email === email.value && email.value !== '') {
                    generalErrorMessage.textContent = "You already have an account!"
                    isInputsValid = false;
                    break;
                } else {
                    generalErrorMessage.textContent = ''
                }

                if (user.username === username.value && username.value !== '') {
                    generalErrorMessage.textContent = "The username is in use! Please enter another one."
                    isInputsValid = false;
                    break;
                } else {
                    generalErrorMessage.textContent = ''
                }
            }
        }

        if (isInputsValid) {
            users.push(new User(name.value, lastName.value, email.value,
                country.value, username.value, password.value));
            console.log("User has been created.");
        }
    }

}

window.onload = function() {
    createEventListenersEye()
    createEventListenersSignupButton()
}
