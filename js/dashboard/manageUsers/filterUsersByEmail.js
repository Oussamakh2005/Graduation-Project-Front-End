const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const email = document.getElementById('email-search').value.trim().toLowerCase();
    const usersRow = document.querySelectorAll('.user-row');
    
    for (const row of usersRow) {
        const rowEmail = row.dataset.email.toLowerCase();
        
        // If search is empty, show all rows
        if (email === '') {
            row.style.display = '';
        } 
        // If the row email contains the search term, show it
        else if (rowEmail.includes(email)) {
            row.style.display = '';
        } 
        // Otherwise hide it
        else {
            row.style.display = 'none';
        }
    }
});