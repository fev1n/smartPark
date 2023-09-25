document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const submitButton = document.getElementById('submit-button');

    newPasswordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); 
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const minLength = 6; 

        if (newPassword === confirmPassword && newPassword.length >= minLength) {
            
            alert('Password reset successful!'); 
            window.location.href = 'login.html'; 
        }
    });

    function validatePasswords() {
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const minLength = 6; 

        if (newPassword.length < minLength) {
            newPasswordError.textContent = `Password must be at least ${minLength} characters long`;
        } else {
            newPasswordError.textContent = '';
        }

        if (confirmPassword) {
            if (newPassword !== confirmPassword) {
                confirmPasswordError.textContent = 'Passwords do not match';
            } else {
                confirmPasswordError.textContent = '';
            }
        } else {
            confirmPasswordError.textContent = '';
        }
    }
});
