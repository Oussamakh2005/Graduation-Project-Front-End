
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
        logoImg.src = "https://i.postimg.cc/x1kDTBRh/dark-logo-removebg-preview.png";
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
        logoImg.src = "https://i.postimg.cc/wBK5RsXH/light-logo-removebg-preview.png";
      }
    }
  });