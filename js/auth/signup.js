import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", async () => {
    const originalText = signupBtn.innerHTML;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    signupBtn.disabled = true;
    signupBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
    try {
        const response = await fetch(`${config.API_URL}/api/user/signup`, {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.ok) {
            showToast("تم التسجيل بنجاح يرجى تأكيد البريد الإلكتروني", "success");
        } else {
            showToast(`Sign up faild ${data.msg}`, "error");
        }
    } catch (err) {
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    } finally {
        // Restore button
        signupBtn.disabled = false;
        signupBtn.innerHTML = originalText;
    }
});