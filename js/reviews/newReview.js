import { checkUserAuthenticated } from "../auth/auhenticated.js";
import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const submitBtn = document.getElementById("submit-review-btn");
    submitBtn.addEventListener("click", async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const pageContainer = document.getElementById("container");
        if (!token) {
            window.location.href = "./login.html";
        } else {
            const auhtenticated = await checkUserAuthenticated(`${config.API_URL}/api/user/auhtenticated`);
            if (!auhtenticated.ok) {
                window.location.href = "./login.html";
            }else{
                console.log("you are authenticated you can add review")
            }
        }
    });
});