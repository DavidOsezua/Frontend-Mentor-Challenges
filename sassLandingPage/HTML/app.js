/*
Steps on how I will implement the mobile navbar menu

* select every variable I will need from the dom.
//What are the variables i need.
- The toggle button to open the nav menu
- The close button to close the nav menu
- I need the nav-menu so I can add and remove classes when it's open or close

* Add an event listener on the toggle and nav-close button



steps on how i will implement the modal

*Select every variable that's needed from the dom
-all


*/

/*==================== VARIABLES ====================*/
const openNav = document.querySelector(".nav-toggle");
const closeNav = document.querySelector(".nav-close");
const navMenu = document.querySelector(".nav-menu");
const modalButtons = document.querySelectorAll(".btn-modal");
const modalClose = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const signUpForm = document.querySelector("#signUp-form");
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmpassword");
const spinner = document.querySelector(".spinner-3");
const logoutButton = document.querySelector(".btn-logout");
const closeForm = document.querySelector(".close");
const navLists = document.querySelector(".nav-list");
const signInForm = document.getElementById("signIn-form");

//Open Modal FUNCTION
const openModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

//Close Modal Function
const closeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

//Email Validation Function
const isEmail = function (email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

//error function
const setErrorFor = function (input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("#message");
  formControl.classList.remove("success");
  formControl.classList.add("error");
  // formControl.className = "form-control error";
  errorMessage.innerHTML = message;
  errorMessage.classList.add("visible");
};

//success function
const setSuccessFor = function (input) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("#message");
  // formControl.className = "form-control success";
  formControl.classList.remove("error");
  formControl.classList.add("success");
  errorMessage.classList.remove("visible");
};

// CHECKS INPUTS Function
const checksInputs = function () {};

/*==================== MOBILE NAVIGATION CONTROLS ====================*/
function navControl() {
  if (openNav) {
    openNav.addEventListener("click", function (e) {
      e.preventDefault();
      navMenu.classList.add("show-menu");
    });
  }
  if (closeNav) {
    closeNav.addEventListener("click", function (e) {
      e.preventDefault();
      navMenu.classList.remove("show-menu");
    });
  }
}

navControl();

/*==================== SMOOTH SCROLLING ====================*/
if (navLists)
  navLists.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");

      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("show-menu");
    }
  });

/*==================== MODAL ====================*/
if (modalButtons)
  modalButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

if (overlay) overlay.addEventListener("click", closeModal);

if (closeForm) closeForm.addEventListener("click", closeModal);

/*==================== SIGNUP FORM VALIDATION ====================*/

if (signUpForm)
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Remove Whitespaces
    const usernameValue = userName.value.trim();
    const emailvalue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    //check if all fields are available
    if (usernameValue === "") {
      setErrorFor(userName, "Username cannot be blank");
    } else {
      setSuccessFor(userName);
    }

    if (emailvalue === "") {
      setErrorFor(email, "email cannot be blank");
    } else if (!isEmail(emailvalue)) {
      setErrorFor(email, "Email is Invalid");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else if (passwordValue.length < 8) {
      setErrorFor(password, "Password must be at least eight charaters");
    } else {
      setSuccessFor(password);
    }

    if (confirmPasswordValue === "") {
      setErrorFor(confirmPassword, "Confirm your password");
    } else if (confirmPasswordValue !== passwordValue) {
      setErrorFor(confirmPassword, "Passwords does not match");
    } else {
      setSuccessFor(confirmPassword);
    }

    console.log({
      usernameValue,
      emailvalue,
      passwordValue,
      confirmPasswordValue,
    });

    //store them inside the local storage since there is no api
    const user = {
      usernameValue,
      emailvalue,
      passwordValue,
      confirmPasswordValue,
    };
    localStorage.setItem("user", JSON.stringify(user));

    // change the url of the website to the signin page

    if (
      usernameValue !== "" &&
      emailvalue !== "" &&
      passwordValue !== "" &&
      confirmPasswordValue === passwordValue
    ) {
      spinner.classList.add("visible");

      setTimeout(() => {
        window.location.href = "signin.html";
      }, 2000);
    }
  });

/*==================== SIGNIN FORM VALIDATION ====================*/
if (signInForm)
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const storedData = localStorage.getItem("user");
    const emailInputValue = email.value.trim();
    const passwordInputValue = password.value.trim();
    let userObj = {};
    let emailValue = "";
    let passwordValue = "";

    if (storedData) {
      userObj = JSON.parse(storedData);
      emailValue = userObj.emailvalue;
      passwordValue = userObj.passwordValue;
    }

    if (emailInputValue === "") {
      setErrorFor(email, "Your E-mail is required");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Your Email is invalid");
    } else if (emailInputValue !== emailValue) {
      setErrorFor(email, "email or password is incorrect");
    } else {
      setSuccessFor(email);
    }

    if (passwordInputValue === "") {
      setErrorFor(password, "Your password is required");
    } else if (passwordInputValue !== passwordValue) {
      setErrorFor(password, "email or password is incorrect");
    } else setSuccessFor(password);

    //set a local storage login session
    localStorage.setItem("loggedIn", "True");

    //After a successful signin, redirect the user to the dashboard
    console.log(passwordInputValue, passwordValue, emailValue, emailInputValue);
    if (
      passwordInputValue === passwordValue &&
      emailInputValue === emailValue
    ) {
      spinner.classList.add("visible");
      setTimeout((e) => {
        window.location.href = "app.html";
      }, 2000);
    } else {
      return;
    }

    console.log(userObj, emailValue, passwordValue);
  });

function isAuthenticated() {
  return localStorage.getItem("loggedIn") === "True";
}

/*==================== Redirect to Signin when user is not logged in ====================*/
if (!isAuthenticated() && window.location.pathname === "/app.html") {
  window.location.href = "signin.html";
}

/*==================== Logoout Function ====================*/
if (logoutButton)
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("loggedIn");
    window.location.href = "signin.html";
  });
