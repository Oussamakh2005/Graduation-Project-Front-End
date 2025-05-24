import { showToast } from "../../utils/showToast.js";
import { config } from "../../utils/config.js";
document.addEventListener('DOMContentLoaded', () => {
    const cancelBtn = document.getElementById('cancel-btn');
    const closeBtn = document.getElementById('close-btn');
    const confirmeBtn = document.getElementById('confirm-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const dialog = document.getElementById('messageModal');

    // Show and hide dialog functions
    function showDialog() {
        dialog.style.display = "block";
    }

    function hideDialog() {
        dialog.style.display = "none";
    }

    // Handle clicks on dynamically added .btn-edit buttons
    document.body.addEventListener('click', async (e) => {
        if (e.target.classList.contains('show-dialog-btn')) {
            const messageId = e.target.dataset.id;
            confirmeBtn.dataset.id = messageId;
            deleteBtn.dataset.id = messageId;
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${config.API_URL}/api/inquiry/${messageId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                const data = await response.json();
                if (data.ok) {
                    document.getElementById("messageContent").innerText = data.data.message;
                } else {
                    showToast("فشل تعديل الدور يرجى إعادة المحاولة لاحقا", "error");
                }
            } catch (error) {
                console.log(error);
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            }
            showDialog();
        }
    });
    //send response to the user email :
    confirmeBtn.addEventListener('click', async () => {
        const originalText = confirmeBtn.innerHTML;
        confirmeBtn.innerHTML = `<span class="spinner"></span> جاري الارسال...`;
        confirmeBtn.disabled = true;
        const responseMessage = document.getElementById("responseText").value;
        const messageId = confirmeBtn.dataset.id;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${config.API_URL}/api/inquiry/response/${messageId}`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    'message': responseMessage,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                hideDialog();
                window.location.reload();
            } else {
                showToast("فشل  ارسال الرساله يرجى إعادة المحاولة لاحقا", "error");
            }
        } catch (error) {
            console.log(error);
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        } finally {
            confirmeBtn.innerHTML = originalText;
            confirmeBtn.disabled = false;
        }
    });
    // Delete inquiry :
        deleteBtn.addEventListener('click', async () => {
        const originalText = deleteBtn.innerHTML;
        deleteBtn.innerHTML = `<span class="spinner"></span> جاري الحذف ...`;
        deleteBtn.disabled = true;
        const messageId = deleteBtn.dataset.id;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${config.API_URL}/api/inquiry/${messageId}`, {
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
                showToast("فشل  الحذف يرجى إعادة المحاولة لاحقا", "error");
            }
        } catch (error) {
            console.log(error);
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        } finally {
            deleteBtn.innerHTML = originalText;
            deleteBtn.disabled = false;
        }
    })
    // Handle cancel button inside the dialog
    cancelBtn.addEventListener('click', hideDialog);
    closeBtn.addEventListener('click', hideDialog);
});