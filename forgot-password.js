document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgotForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!username || !email) {
      alert('Please fill in both fields.');
      return;
    }

    // Simulate API call
    alert(`A reset link will be sent to ${email} (if associated with ${username}).`);
    form.reset();
  });
});
