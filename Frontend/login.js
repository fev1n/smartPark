document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginButton = document.getElementById('loginButton');

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    loginButton.addEventListener('click', function (e) {
        e.preventDefault(); 
        validateEmail();
        validatePassword();

        if (isEmailValid(emailInput.value) && isPasswordValid(passwordInput.value)) {
          
            window.location.href = 'dashboard.html';
        }
    });

    function validateEmail() {
        const emailValue = emailInput.value.trim();

        if (!isEmailValid(emailValue)) {
            emailError.textContent = 'Invalid email format';
        } else {
            emailError.textContent = '';
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long';
        } else {
            passwordError.textContent = '';
        }
    }

    function isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    function isPasswordValid(password) {
        return password.length >= 6;
    }
});
