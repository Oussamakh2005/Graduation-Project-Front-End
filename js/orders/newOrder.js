import { checkUserAuthenticated } from "../auth/auhenticated.js";
import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
const showDialogBtn = document.getElementById('show-dialog-btn');
const colorDialog = document.getElementById('color-dialog');
const closeDialogBtn = document.getElementById('close-dialog');
const cancelColorBtn = document.getElementById('cancel-color');
const confirmColorBtn = document.getElementById('confirm-color');
const token = localStorage.getItem('token');
showDialogBtn.addEventListener('click', async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageContainer = document.getElementById("container");
    if (!token) {
        window.location.href = "./login.html";
    } else {
        const auhtenticated = await checkUserAuthenticated(`${config.API_URL}/api/user/auhtenticated`);
        if (!auhtenticated.ok) {
            window.location.href = "./login.html";
        } else {
            colorDialog.style.display = 'flex';
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden'
        }
    }
});

//close the dialog :
function closeColorDialog() {
    colorDialog.style.display = 'none';
    document.body.style.overflow = 'auto';
}
closeDialogBtn.addEventListener('click', closeColorDialog);
cancelColorBtn.addEventListener('click', closeColorDialog);

//confirm order : 
confirmColorBtn.addEventListener('click', async() => {
    const selectedRadio = document.querySelector('input[name="carColor"]:checked');

    if (!selectedRadio) {
      showToast("الرجاء اختيار لون للسيارة", "warning");
      return;
    }
    ///get car id form the page url :
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageContainer = document.getElementById("container");
    const carColor = selectedRadio.value;
    const carId = urlParams.get('id');
    /////
    //add spinner to the button :
    const originalText = confirmColorBtn.innerHTML;
    confirmColorBtn.innerHTML = `<span class="spinner"></span> جاري ارسال الطلب ...`;
    confirmColorBtn.disabled = true;
    //
    try {
        const response = await fetch(`${config.API_URL}/api/sale/${carId}`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                carColor,
                paymentMethod: 'CASH',
            }),
        });
        const data = await response.json();
        if (data.ok) {
            showToast("تم إرسال طلبك بنجاح", "success");
            closeColorDialog();
        } else {
            showToast("فشل إرسال الطلب يرجى إعادة المحاولة لاحقا", "error");
        }
    } catch (error) {
        console.log(error);
        showToast("حدث خطأ ما غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }finally{
        confirmColorBtn.disabled = false;
        confirmColorBtn.innerHTML = originalText;
    }
});

