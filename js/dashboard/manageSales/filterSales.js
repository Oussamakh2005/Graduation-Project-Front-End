const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const id = document.getElementById('email-search').value.trim().toLowerCase();
    const salesRow = document.querySelectorAll('.sales-row');
    
    for (const row of salesRow) {
        const rowEmail = row.dataset.id.toLowerCase();
        
        // If search is empty, show all rows
        if (id === '') {
            row.style.display = '';
        } 
        // If the row email contains the search term, show it
        else if (rowEmail.includes(id)) {
            row.style.display = '';
        } 
        // Otherwise hide it
        else {
            row.style.display = 'none';
        }
    }
});