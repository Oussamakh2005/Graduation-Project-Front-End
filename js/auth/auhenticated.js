export async function checkUserAuthenticated(apiUrl) {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}
