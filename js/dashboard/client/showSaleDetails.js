import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const dialog = document.getElementById("purchase-details-modal");
    const closeBtn = document.getElementById("close-btn");
    //show dialog :
    function showDialog() {
        dialog.style.display = "block";
    }
    //hide dialog :
    function hideDialog() {
        console.log('hidden')
        dialog.style.display = "none";
    }

    // Handle clicks on dynamically added .btn-edit buttons
    document.body.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-view')) {
            const saleId = e.target.dataset.id;
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${config.API_URL}/api/sale/${saleId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
                const data = await response.json();
                if (data.ok) {
                    //set car image 
                    document.getElementById("car-image").src = data.data.carModel.mainImage;
                    //set sale id
                    document.getElementById("sale-id").innerText = data.data.id;
                    //set car model 
                    document.getElementById("car-model").innerText = data.data.carModel.model;
                    //set client name  
                    document.getElementById("client-name").innerText = data.data.user.firstName + " " +data.data.user.lastName;
                    //set total price 
                    document.getElementById("total-price").innerText = data.data.salePrice + " دينار";
                    //set down payment 
                    document.getElementById("down-payment").innerText = data.data.salePrice * 0.2 +" دينار";
                    //set pick up status 
                    document.getElementById("car-pickup-status").innerHTML = setPickUpStatus(data.data.pickupStatus);
                    showDialog();
                } else {
                    console.log(data.msg);
                    showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
                }
            } catch (error) {
                console.log(error);
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            }
        }
    });

    closeBtn.addEventListener("click", hideDialog);
});

function setPickUpStatus(status){
    switch (status) {
        case 'PENDING':
            return `
            <span class="detail-label">حالة الاستلام:</span>
            <span class="detail-value status-pending" id="pickup-status">قيد الانتظار</span>`;
        case 'READY':
            return `
            <span class="detail-label">حالة الاستلام:</span>
            <span class="detail-value status-in-progress"  id="pickup-status">جاهز للاستلام</span>`;
        case 'PICKED_UP':
            return `
            <span class="detail-label">حالة الاستلام:</span>        
            <span class="detail-value status-completed" id="pickup-status">تم الإستلام</span>`;
    }
}