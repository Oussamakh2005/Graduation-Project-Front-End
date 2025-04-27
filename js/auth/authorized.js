export async function authorized(apiUrl) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "../../main/login.html";
        return;
    }
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if(!data.ok){
            window.location.href = "../../main/login.html";
            return;
        }
    } catch (error) {
        window.location.href = "../../main/login.html";
        return;
    }
}