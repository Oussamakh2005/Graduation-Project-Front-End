import { config } from "../utils/config.js";

const signBtn = document.getElementById("signin-btn");
signBtn.addEventListener("click",async() => {
    const originalText = signBtn.innerHTML;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signBtn.disabled = true;
    signBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
    try {
        const response = await fetch(`${config.API_URL}/api/user/login`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                email,
                password
            }),
        });
        const data = await response.json();
        if(data.ok){
            localStorage.setItem("token",data.data);
            window.location.href = "./home.html";
        }else{
            signBtn.disabled = false;
            signBtn.innerHTML = originalText;
            showToast(`فشل تسجيل الدخول ${data.msg}`,"error");
        }
    }catch(err){
        signBtn.disabled = false;
        signBtn.innerHTML = originalText;
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});