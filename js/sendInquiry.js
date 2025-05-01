import { config } from './utils/config.js';
import {showToast} from './utils/showToast.js'
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', async () => {
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    submitBtn.innerHTML = `<span class="spinner"></span> جاري الإرسال...`;
    try {
        const response = await fetch(`${config.API_URL}/api/inquiry/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                message
            })
        });
        const data = await response.json();
        console.log(data)
        if (data.ok) {
            showToast("تم إرسال الاستفسار بنجاح سيتم إرسال الإجابة في البريد الإلكتروني المرفق في وقت لاحق", "success");
        } else {
            showToast("حدث خطأ أثناء إرسال الاستفسار", "error");
        }
    } catch (error) {
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا ", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});