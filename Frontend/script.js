// script.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupButton').addEventListener('click', function() {
        window.location.href = 'signup.html'; // Redirect to signup page
    });

    document.getElementById('loginButton').addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirect to login page
    });
});
