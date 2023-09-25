
    document.addEventListener('DOMContentLoaded', function () {
        const emailInput = document.getElementById('emailInput');
        const emailError = document.getElementById('emailError');
        const sendLinkButton = document.getElementById('sendLinkButton');

        emailInput.addEventListener('input', function () {
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (emailValue === '') {
                emailError.textContent = 'Email is required';
                sendLinkButton.disabled = true;
            } else if (!emailPattern.test(emailValue)) {
                emailError.textContent = 'Invalid email format';
                sendLinkButton.disabled = true;
            } else {
                emailError.textContent = '';
                sendLinkButton.disabled = false;
            }
        });
    });

