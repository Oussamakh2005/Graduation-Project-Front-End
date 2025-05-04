import { showToast } from "../../utils/showToast.js";
import { config } from "../../utils/config.js";
document.addEventListener('DOMContentLoaded', () => {
    const cancelBtn = document.getElementById('cancel-update');
    const confirmeBtn = document.getElementById('confirm-update');
    const dialog = document.getElementById('update-role-dialog');
    const updatePickUpBtn = document.getElementById("update-pickup-btn");

    // Show and hide dialog functions
    function showDialog() {
        dialog.style.display = "block";
    }

    function hideDialog() {
        dialog.style.display = "none";
    }

    // Handle clicks on dynamically added .btn-edit buttons
    updatePickUpBtn.addEventListener('click', () => {
        const saleId = updatePickUpBtn.dataset.id;
        confirmeBtn.dataset.id = saleId;
        showDialog();
    });

    // Handle cancel button inside the dialog
    cancelBtn.addEventListener('click', hideDialog);
    //Edit user role :
    confirmeBtn.addEventListener('click', async () => {
        const originalText = confirmeBtn.innerHTML;
        confirmeBtn.innerHTML = `<span class="spinner"></span> جاري التسجيل...`;
        confirmeBtn.disabled = true;
        const status = document.getElementById("pickup-status-form").value;
        const saleId = confirmeBtn.dataset.id;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${config.API_URL}/api/sale/pickup/${saleId}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    status,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                hideDialog();
                window.location.reload();
            } else {
                showToast("فشل تعديل الدور يرجى إعادة المحاولة لاحقا", "error");
            }
        } catch (error) {
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        } finally {
            confirmeBtn.innerHTML = originalText;
            confirmeBtn.disabled = false;
        }
    });
});