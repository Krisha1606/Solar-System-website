document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggles
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeIconConfirm = document.getElementById('eyeIconConfirm');

    // Form elements
    const signupForm = document.querySelector('.signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.querySelector('.signup-btn');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
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
        
        // Toggle eye icon
        if (type === 'text') {
            eyeIconConfirm.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
            toggleConfirmPassword.setAttribute('aria-label', 'Hide confirm password');
        } else {
            eyeIconConfirm.innerHTML = '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
            toggleConfirmPassword.setAttribute('aria-label', 'Show confirm password');
        }
    });

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        // At least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    function validateFullName(name) {
        return name.trim().length >= 2;
    }

    function showError(element, message) {
        removeError(element);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }

    function removeError(element) {
        const existingError = element.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function showSuccess(element, message) {
        removeError(element);
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.textContent = message;
        element.parentNode.insertBefore(successDiv, element.nextSibling);
    }

    // Real-time validation
    fullnameInput.addEventListener('blur', function() {
        if (!validateFullName(this.value)) {
            showError(this, 'Full name must be at least 2 characters long');
        } else {
            removeError(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            removeError(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (!validatePassword(this.value)) {
            showError(this, 'Password must be at least 8 characters with uppercase, lowercase, and number');
        } else {
            removeError(this);
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        if (this.value !== passwordInput.value) {
            showError(this, 'Passwords do not match');
        } else if (this.value.length > 0) {
            removeError(this);
        }
    });

    // Real-time password matching
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (this.value !== passwordInput.value) {
                showError(this, 'Passwords do not match');
            } else {
                removeError(this);
                showSuccess(this, 'Passwords match');
            }
        }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Remove all existing errors
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.success-message').forEach(success => success.remove());

        let isValid = true;

        // Validate full name
        if (!validateFullName(fullnameInput.value)) {
            showError(fullnameInput, 'Full name must be at least 2 characters long');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            isValid = false;
        }

        // Validate password confirmation
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }

        // Validate terms checkbox
        if (!termsCheckbox.checked) {
            showError(termsCheckbox.parentNode, 'You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }

        if (isValid) {
            // Disable button and show loading state
            signupBtn.disabled = true;
            signupBtn.textContent = 'Creating Account...';

            // Simulate API call
            setTimeout(() => {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message show';
                successDiv.textContent = 'Account created successfully! Redirecting to login...';
                successDiv.style.textAlign = 'center';
                successDiv.style.marginTop = '20px';
                signupForm.appendChild(successDiv);

                // Reset form after success
                setTimeout(() => {
                    // In a real application, you would redirect to login page
                    // window.location.href = 'login.html';
                    
                    // For demo purposes, reset the form
                    signupForm.reset();
                    signupBtn.disabled = false;
                    signupBtn.textContent = 'Create Account';
                    successDiv.remove();
                }, 2000);
            }, 1500);
        }
    });

    // Keyboard navigation for password toggle buttons
    togglePassword.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    toggleConfirmPassword.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Accessibility: Associate checkbox label with checkbox
    const checkboxLabel = document.querySelector('.checkbox-label');
    checkboxLabel.addEventListener('click', function() {
        termsCheckbox.click();
    });
});