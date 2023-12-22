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
    let isInputsValid = true;

    signupForm.addEventListener("submit", function(event){
        event.preventDefault()
    })

    signupButton.addEventListener("click", handleSignupClick)

    function handleSignupClick(event) {
        event.preventDefault()

        for (let i = 0; i < users.length; i++) {
            // Checking if the user already has an account.
            if (users[i].email === email.value && email.value !== '') {
                console.log("User already has an account.")
                isInputsValid = false
            }

            // Checking if the username provided is in use.
            if (users[i].username === username.value && username.value !== '') {
                console.log("The username has already been taken.")
                isInputsValid = false
            }
        }

        // Check if the fields are not empty.
        if (name.value === '') {
            console.log("Name has not been provided.")
            isInputsValid = false
        }

        if (lastName.value === '') {
            console.log("Last name has not been provided.")
            isInputsValid = false
        }

        if (email.value === '') {
            console.log("Email has not been provided.")
            isInputsValid = false
        }

        if (username.value === '') {
            console.log("Username has not been provided.")
            isInputsValid = false
        }

        if (password.value === '') {
            console.log("Password has not been provided.")
            isInputsValid = false
        }

        // Creating a new user object if the provided inputs are valid.
        if (isInputsValid) {
            users.push(new User(name.value, lastName.value, email.value,
               country.value, username.value, password.value))
            console.log("User has been created.")
        }
    }
}

window.onload = function() {
    createEventListenersEye()
    createEventListenersSignupButton()
}
