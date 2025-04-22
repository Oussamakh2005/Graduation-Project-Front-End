// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    
    // If the user has explicitly chosen a theme, use it
    if (storedTheme) {
        body.classList.toggle('dark-mode', storedTheme === 'dark');
        updateToggleIcon(storedTheme === 'dark');
    } 
    // Otherwise, use their OS preference
    else if (prefersDarkScheme.matches) {
        body.classList.add('dark-mode');
        updateToggleIcon(true);
    }
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateToggleIcon(isDarkMode);
    });
    
    // Update the toggle button icon and text
    function updateToggleIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        
        if (isDarkMode) {
            icon.className = 'fas fa-sun';
            text.textContent = 'الوضع النهاري';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'الوضع الليلي';
        }
    }
});