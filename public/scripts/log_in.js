function createEventListenerLoginButton() {
    const loginForm = document.querySelector("#login_form")
    const loginButton = document.querySelector("#login_button")
    const usernameLogin = document.querySelector('#username-login')
    const passwordLogin = document.querySelector('#password-login')

    loginForm.addEventListener("submit", function(event){
        event.preventDefault()
    })




}

window.onload = function() {
    createEventListenerLoginButton()
}