const form = document.getElementById('registrationForm');
const inputs = Array.from(form.querySelectorAll('input'));

function showError(input, message) {
    const errorSpan = document.getElementById(input.id + 'Error');
    errorSpan.textContent = message;
    input.style.borderColor = message ? '#dc3545' : '#2e7d32';
}

function validateField(input) {
    const value = input.value.trim();
    if (!value) return 'This field is required.';

    switch (input.id) {
        case 'fullname':
            return value.length < 3 ? 'Name must be at least 3 characters.' : '';
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ''
                : 'Please enter a valid email address.';
        case 'phone-number':
            return value.length < 7 ? 'Phone number must be at least 7 digits.' : '';
        case 'password':
            return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
                ? ''
                : 'Password must be 8+ chars with uppercase & number.';
        default:
            return '';
    }
}

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        showError(input, validateField(input));
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const isFormValid = inputs.every(input => {
        const error = validateField(input);
        showError(input, error);
        return !error;
    });

    if (isFormValid) {
        alert('Success! Your form has been submitted.');
        form.reset();
        inputs.forEach(input => input.style.borderColor = '#ddd');
    }
});
