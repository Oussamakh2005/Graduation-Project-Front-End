import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        console.log(email);
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
        try {
            const response = await fetch(`${config.API_URL}/api/user/password/verification`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body : JSON.stringify({email}),
            });
            const data = await response.json();
            if (data.ok) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast(" يرجى تأكيد البريد الإلكتروني", "success")
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast("اجل ارسال البريد الالكتروني يرجى التحقق من البريد المدخل", "error");
            }
        } catch(error) {
            console.log(error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        }
    });
});