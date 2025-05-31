document.addEventListener('DOMContentLoaded', function () {
  checkAuthState();

  typeText('.content h1', 'Analyze Your Resume', 100, () => {
    cycleFeatures();
  });

  document.getElementById('resumeUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    if (!file) return;

    const uploadBtn = document.querySelector('.upload-btn');
    const originalText = uploadBtn.textContent;
    uploadBtn.innerHTML = '<div class="loader"></div> Processing...';

    setTimeout(() => {
      const fileSizeKB = file.size / 1024;
      const fileType = file.type;

      if (fileType !== 'application/pdf') {
        errorMessage.textContent = 'Only PDF files are allowed.';
        this.value = '';
        uploadBtn.textContent = originalText;
        return;
      }

      if (fileSizeKB < 100 || fileSizeKB > 1024) {
        errorMessage.textContent = 'File size must be between 100KB and 1MB.';
        this.value = '';
        uploadBtn.textContent = originalText;
        return;
      }

      uploadBtn.textContent = '✓ Analysis Complete!';
      setTimeout(() => {
        uploadBtn.textContent = originalText;
        window.location.href = 'results.html';
      }, 1500);
    }, 2000);
  });
});

function typeText(selector, text, speed, callback) {
  const element = document.querySelector(selector);
  element.textContent = '';

  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
      if (callback) callback();
    }
  }, speed);
}

function typeFeature(element, text, speed, callback) {
  element.textContent = '';
  element.style.opacity = '1';

  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
      if (callback) callback();
    }
  }, speed);
}

function cycleFeatures() {
  const features = [
    "Keyword optimization",
    "ATS compatibility check",
    "Skills gap analysis",
    "Formatting suggestions",
    "Impactful bullet points"
  ];

  const featureElement = document.getElementById('singleFeatureItem');
  let currentIndex = 0;

  function showNextFeature() {
    featureElement.style.opacity = '0';

    setTimeout(() => {
      typeFeature(featureElement, features[currentIndex], 50, () => {
        featureElement.style.opacity = '1';

        setTimeout(() => {
          currentIndex = (currentIndex + 1) % features.length;
          showNextFeature();
        }, 2000);
      });
    }, 500);
  }

  showNextFeature();
}

function checkAuthState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    const nav = document.querySelector('nav');
    nav.innerHTML = `
      <a href="dashboard.html" class="dashboard">Dashboard</a>
      <a href="#" class="logout" id="logoutBtn">Logout</a>
    `;

    document.getElementById('logoutBtn').addEventListener('click', function () {
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    });
  }
}
