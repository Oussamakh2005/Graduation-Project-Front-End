    // إظهار/إخفاء كلمات المرور
    function togglePassword(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        icon.addEventListener("click", () => {
          const type = input.getAttribute("type") === "password" ? "text" : "password";
          input.setAttribute("type", type);
          icon.classList.toggle("fa-eye");
          icon.classList.toggle("fa-eye-slash");
        });
      }
  
      togglePassword("newPassword", "toggleNewPass");
      togglePassword("confirmPassword", "toggleConfirmPass");