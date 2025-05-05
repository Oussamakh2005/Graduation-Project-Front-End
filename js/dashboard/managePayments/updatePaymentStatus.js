import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const cancelmBtn = document.getElementById("cancel-update");
    const confirmBtn = document.getElementById("confirm-update");
    function showDialog(status) {
        let text = "";
        let apiRoute = "";
        if (status === "PENDING") {
            text = "إتمام الدفعه المسبقه";
            apiRoute = "api/payment/downpayment";
        } else {
            text = "إتمام الدفعه التكميليه";
            apiRoute = "api/payment/fullpayment";
        }
        confirmBtn.dataset.route = apiRoute;
        document.getElementById("diaglog-action").innerText = text;
        document.getElementById("update-role-dialog").style.display = "block";
    }
    function hideDialog() {
        document.getElementById("update-role-dialog").style.display = "none";
    }

    // Handle clicks on dynamically added .btn-edit buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('process-btn')) {
            const saleId = e.target.dataset.id;
            confirmBtn.dataset.id = saleId;
            showDialog(e.target.dataset.status);
        }
    });

    cancelmBtn.addEventListener("click",hideDialog);

    //update payment status : 
    confirmBtn.addEventListener('click', async() => {
        const token = localStorage.getItem("token");
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
        try{
            const response = await fetch(`${config.API_URL}/${confirmBtn.dataset.route}/${confirmBtn.dataset.id}`,{
                method : "POST",
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const data = await response.json();
            if(data.ok){
                hideDialog();
               window.location.reload();
            }else{
                showToast("فشل إكمال العملية يرجى إعادة المحاولة لاحقا", "error");
            }
        }catch(error){
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        }finally{
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        }
    });
});