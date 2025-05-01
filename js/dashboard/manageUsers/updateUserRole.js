import {showToast} from "../../utils/showToast.js";
import {config} from "../../utils/config.js";
document.addEventListener('DOMContentLoaded', () => {
    const cancelBtn = document.getElementById('cancel-update');
    const confirmeBtn = document.getElementById('confirm-update');
    const dialog = document.getElementById('update-role-dialog');

    // Show and hide dialog functions
    function showDialog() {
        dialog.style.display = "block";
    }

    function hideDialog() {
        dialog.style.display = "none";
    }

    // Handle clicks on dynamically added .btn-edit buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const userId = e.target.dataset.id;
            confirmeBtn.dataset.id = userId;
            showDialog();
        }
    });

    // Handle cancel button inside the dialog
    cancelBtn.addEventListener('click', hideDialog);
    //Edit user role :
    confirmeBtn.addEventListener('click', async () => {
        const originalText = confirmeBtn.innerHTML;
        confirmeBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
        confirmeBtn.disabled = true;
        const role = document.getElementById("role-select").value;
        const userId = confirmeBtn.dataset.id;
        const token = localStorage.getItem("token");
        try{
            const response = await fetch(`${config.API_URL}/api/user/role/${userId}`,{
                method : "PATCH",
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization': `${token}`,
                },
                body : JSON.stringify({
                    role,
                }),
            });
            const data = await response.json();
            if(data.ok){
                hideDialog();
               window.location.reload();
            }else{
                showToast("فشل تعديل الدور يرجى إعادة المحاولة لاحقا", "error");
            }
        }catch(error){
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        }finally{
            confirmeBtn.innerHTML = originalText;
            confirmeBtn.disabled = false;
        }
    });
});
