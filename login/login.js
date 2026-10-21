document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("loginSection");
  const signupSection = document.getElementById("signupSection");
  const signupLink = document.getElementById("signupLink");
  const backToLogin = document.getElementById("backToLogin");

  // Signup Form
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginSection.classList.add("hidden");
    signupSection.classList.remove("hidden");
  });

  //  Login Form
  backToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });

  // Password Toggle 
  const setupPasswordToggle = (toggleBtnId, inputId) => {
    const toggleBtn = document.getElementById(toggleBtnId);
    const input = document.getElementById(inputId);

    if (toggleBtn && input) {
      toggleBtn.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";

        const icon = toggleBtn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-eye");
          icon.classList.toggle("fa-eye-slash");
        }
      });
    }
  };

  setupPasswordToggle("loginPasswordToggle", "loginPassword");
  setupPasswordToggle("signupPasswordToggle", "signupPassword");
  setupPasswordToggle("confirmPasswordToggle", "confirmPassword");
});

//  MODAL  
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');

  const privacyLink = document.getElementById('privacyPolicyLink');
  const termsLink = document.getElementById('termsLink');

  const closePrivacyBtn = document.getElementById('closePrivacyModal');
  const closeTermsBtn = document.getElementById('closeTermsModal');

  if (privacyLink && privacyModal) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.add('active');
    });
  }

  if (termsLink && termsModal) {
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.classList.add('active');
    });
  }

  if (closePrivacyBtn && privacyModal) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.remove('active');
    });
  }

  if (closeTermsBtn && termsModal) {
    closeTermsBtn.addEventListener('click', () => {
      termsModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === privacyModal) {
      privacyModal.classList.remove('active');
    }
    if (e.target === termsModal) {
      termsModal.classList.remove('active');
    }
  });
