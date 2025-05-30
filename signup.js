document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  const passwordInputs = document.querySelectorAll('.password-input');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const spinner = document.querySelector('.spinner');
  
  // Toggle password visibility
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.password-input');
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
        this.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
        this.setAttribute('aria-label', 'Show password');
      }
    });
  });
  
  // Form validation
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loading state
    btnText.textContent = 'Creating Account...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Hide loading state
      btnText.textContent = 'Create Account';
      spinner.classList.add('hidden');
      submitBtn.disabled = false;
      
      // Show success message
      const successMessage = document.createElement('p');
      successMessage.classList.add('success-message');
      successMessage.textContent = 'Account created successfully! Redirecting...';
      signupForm.appendChild(successMessage);
      
      // Redirect after delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    }, 1500);
  });
  
  function validateForm() {
    let isValid = true;
    const email = signupForm.querySelector('input[type="email"]');
    const password = signupForm.querySelectorAll('.password-input')[0];
    const confirmPassword = signupForm.querySelectorAll('.password-input')[1];
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
    
    // Email validation
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Password validation
    if (password.value.length < 8) {
      showError(password, 'Password must be at least 8 characters');
      isValid = false;
    }
    
    // Confirm password
    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      isValid = false;
    }
    
    // Terms checkbox
    if (!signupForm.querySelector('#terms').checked) {
      const termsLabel = signupForm.querySelector('.terms label');
      termsLabel.style.color = 'var(--error-color)';
      isValid = false;
    } else {
      signupForm.querySelector('.terms label').style.color = '';
    }
    
    return isValid;
  }
  
  function showError(input, message) {
    input.classList.add('error');
    input.focus();
    
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
  }
});