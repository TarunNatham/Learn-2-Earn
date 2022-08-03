const usernameCorrect = "tn8197";
const passwordCorrect = "Between9";

const username = document.querySelector(".username-bar");
const password = document.querySelector(".password-bar");
const incorrectLogin = document.querySelector(".login-incorrect");
const welcome = document.querySelector(".welcome-heading");

window.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    loginPressed();
  }
});

function loginPressed() {
  if(username.value === usernameCorrect && password.value === passwordCorrect) {
    incorrectLogin.style.opacity = "0";
    incorrectLogin.style.marginBottom = "0";
    window.location = "";
    window.location.href = "";
  } else {
    incorrectLogin.style.opacity = "1";
    incorrectLogin.style.marginBottom = "15px";
  }
}