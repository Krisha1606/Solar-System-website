document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeIconConfirm = document.getElementById('eyeIconConfirm');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon
        if (type === 'text') {
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
            togglePassword.setAttribute('aria-label', 'Hide password');
        } else {
            eyeIcon.innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
            togglePassword.setAttribute('aria-label', 'Show password');
        }
    });

    // Toggle confirm password visibility
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        
        // Update icon
        if (type === 'text') {
            eyeIconConfirm.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
            toggleConfirmPassword.setAttribute('aria-label', 'Hide confirm password');
        } else {
            eyeIconConfirm.innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
            toggleConfirmPassword.setAttribute('aria-label', 'Show confirm password');
        }
    });

    // Form validation
    const signupForm = document.querySelector('.signup-form');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.querySelector('.signup-btn');

    // Password strength validation
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            minLength: password.length >= minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChar
        };
    }

    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const validation = validatePassword(password);
        
        // You can add visual feedback here if needed
        if (password.length > 0) {
            if (validation.isValid) {
                this.style.borderBottomColor = '#4CAF50';
            } else {
                this.style.borderBottomColor = '#f44336';
            }
        } else {
            this.style.borderBottomColor = '#444';
        }
    });

    // Password matching validation
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        
        if (confirmPassword.length > 0) {
            if (password === confirmPassword) {
                this.style.borderBottomColor = '#4CAF50';
            } else {
                this.style.borderBottomColor = '#f44336';
            }
        } else {
            this.style.borderBottomColor = '#444';
        }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;

        // Validation
        let isValid = true;
        let errorMessage = '';

        if (!fullName) {
            errorMessage += 'Full name is required.\n';
            isValid = false;
        }

        if (!email) {
            errorMessage += 'Email is required.\n';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            errorMessage += 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.\n';
            isValid = false;
        }

        if (password !== confirmPassword) {
            errorMessage += 'Passwords do not match.\n';
            isValid = false;
        }

        if (!termsAccepted) {
            errorMessage += 'You must agree to the Terms of Service and Privacy Policy.\n';
            isValid = false;
        }

        if (!isValid) {
            alert('Please fix the following errors:\n\n' + errorMessage);
            return;
        }

        // If validation passes, show success message
        signupBtn.textContent = 'Creating Account...';
        signupBtn.disabled = true;

        // Simulate account creation
        setTimeout(() => {
            alert('Account created successfully! Welcome to Solar System Explorer!');
            signupBtn.textContent = 'Create Account';
            signupBtn.disabled = false;
            
            // You can redirect to login page or dashboard here
            // window.location.href = 'login.html';
        }, 2000);
    });

    // Real-time form validation for submit button state
    function checkFormValidity() {
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;

        const isFormValid = fullName && email && password && confirmPassword && 
                           password === confirmPassword && termsAccepted &&
                           validatePassword(password).isValid;

        if (isFormValid) {
            signupBtn.style.background = '#a259ff';
        } else {
            signupBtn.style.background = '#222';
        }
    }

    // Add event listeners for real-time validation
    [fullNameInput, emailInput, passwordInput, confirmPasswordInput, termsCheckbox].forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('change', checkFormValidity);
    });

    // Keyboard navigation for password toggle buttons
    [togglePassword, toggleConfirmPassword].forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});