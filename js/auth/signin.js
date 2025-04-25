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
            switch(data.role){
                case "ADMIN" :
                    window.location.href = "../dashboard/admin/dashboard.html";
                    break;
                case "CLIENT" :
                    window.location.href = "../dashboard/client/purchases.html";
                    break;
                case "PAYMENT" :
                    window.location.href = "../dashboard/payments_manager/dashboard.html";
                    break;
                case "SALES" :
                    window.location.href = "../dashboard/sales_manager/dashboard.html";
                    break;
            }
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