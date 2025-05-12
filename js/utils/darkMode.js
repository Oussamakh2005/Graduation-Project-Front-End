
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    const text = darkModeToggle.querySelector('span');
    const logoImg = document.getElementById('logo-img');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply initial mode
    if (isDarkMode) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
    
    // Function to enable dark mode
    function enableDarkMode() {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      text.textContent = 'الوضع النهاري';
      localStorage.setItem('darkMode', 'true');
      
      // Change logo to dark mode version
      if (logoImg) {
        logoImg.src = "https://i.postimg.cc/BQZ7T5fR/dark-logo-removebg-preview.png";
      }
    }
    
    // Function to disable dark mode
    function disableDarkMode() {
      body.classList.remove('dark-mode');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      text.textContent = 'الوضع الليلي';
      localStorage.setItem('darkMode', 'false');
      
      // Change logo to light mode version
      if (logoImg) {
        logoImg.src = getLogoLink();
      }
    }
    function getLogoLink(){
      const currentUrl = window.location.href;
      if(currentUrl.includes("login") || currentUrl.includes("signup")|| currentUrl.includes("faild_to_verify")|| currentUrl.includes("forgot_your_password")||currentUrl.includes("reset_your_password")){
        return "https://i.postimg.cc/rFvWVcjg/light-logo-removebg-preview.png";
      }else {
        return "https://i.postimg.cc/BQZ7T5fR/dark-logo-removebg-preview.png";
      }
    }
  });