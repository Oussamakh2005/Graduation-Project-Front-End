import { checkUserAuthenticated } from "../auth/auhenticated.js";
import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const submitBtn = document.getElementById("submit-review-btn");
    submitBtn.addEventListener("click", async () => {
        if (!token) {
            window.location.href = "./login.html";
        } else {
            const auhtenticated = await checkUserAuthenticated(`${config.API_URL}/api/user/auhtenticated`);
            if (!auhtenticated.ok) {
                window.location.href = "./login.html";
            } else {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const carId = urlParams.get('id');
                newReview(carId);
            }
        }
    });
    async function newReview(carId) {
        const originalText = submitBtn.innerHTML;
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner"></span> جاري الاضافه...`;
            const comment = document.getElementById('user-comment').value;
            const response = await fetch(`${config.API_URL}/api/review/${carId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    comment
                }),
            });
            const data = await response.json();
            if (data.ok) {
                showToast("تم إضافة التعليق بنجاح", "success");
                submitBtn.disabled = false;
                document.getElementById('user-comment').value = "";
            } else {
                console.log(data.msg)
                showToast("فشل إضافة التعليق يرجى إعادة المحاولة لاحقا", "error");
            }
        } catch (err) {
            console.log(err)
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        } finally {
            submitBtn.innerHTML = originalText;
        }
    }
});