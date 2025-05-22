import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const cancelBtn = document.getElementById('cancel-delete');
    //const closeBtn = document.getElementById('close-btn');
    const confirmeBtn = document.getElementById('confirm-delete');
    const dialog = document.getElementById('delete-confirmation-dialog');
    //show dialog:
    function showDialog() {
        dialog.style.display = "block";
    }
    //close dialog:
    function hideDialog() {
        dialog.style.display = "none";
    }

    cancelBtn.addEventListener("click", hideDialog);
    document.body.addEventListener("click", async (e) => {
        if (e.target.classList.contains('btn-cancel')) {
            const saleId = e.target.dataset.id;
            confirmeBtn.dataset.id = saleId;
            showDialog();
        }
    });

        confirmeBtn.addEventListener('click', async () => {
            const originalText = confirmeBtn.innerHTML;
            confirmeBtn.innerHTML = `<span class="spinner"></span> جاري الإلغاء...`;
            confirmeBtn.disabled = true;
            const saleId = confirmeBtn.dataset.id;
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${config.API_URL}/api/sale/${saleId}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                const data = await response.json();
                if (data.ok) {
                    hideDialog();
                    window.location.reload();
                } else {
                    showToast("فشل إلغاء العملية يرجى إعادة المحاولة لاحقا", "error");
                }
            } catch (error) {
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            } finally {
                confirmeBtn.innerHTML = originalText;
                confirmeBtn.disabled = false;
            }
        });
});