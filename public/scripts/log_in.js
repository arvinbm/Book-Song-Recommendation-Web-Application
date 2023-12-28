function createEventListenerLoginButton() {
    const loginForm = document.querySelector("#login_form")

    loginForm.addEventListener("submit", function(event){
        event.preventDefault()
    })
}

window.onload = function() {
    createEventListenerLoginButton()
}