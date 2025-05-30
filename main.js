document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const passwordInput = this.closest('.input-group').querySelector('input');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form validation and submission logic here
      console.log('Form submitted');
      // window.location.href = 'dashboard.html';
    });
  }
});