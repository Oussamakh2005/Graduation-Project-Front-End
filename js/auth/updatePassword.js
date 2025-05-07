import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", async () => {
        const password = document.getElementById("newPassword").value;
        const confirmedPassword = document.getElementById("confirmPassword").value;
        ////
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');
        if (password == confirmedPassword) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
            try {
                const response = await fetch(`${config.API_URL}/api/user/password/update`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`,
                    },
                    method: "POST",
                    body: JSON.stringify({ password }),
                });
                const data = await response.json();
                console.log(data)
                if (data.ok) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    window.location.href = 'login.html';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    showToast("الرابط غير صالح", "error");
                }
            } catch (error) {
                console.log(error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            }
        } else {
            showToast("يرجى تاكد من كلمه السر المدخله", "error");
        }
    });
});