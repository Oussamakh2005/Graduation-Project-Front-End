import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";

document.addEventListener("DOMContentLoaded", async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const saleId = urlParams.get('id');
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${config.API_URL}/api/sale/${saleId}`,{
            method : 'GET',
            headers : {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if (data.ok) {
            //sale id :
            document.getElementById("sale-id").innerText = `${data.data.id}`;
            //sale date :
            document.getElementById("sale-date").innerText = `${data.data.saleDate}`;
            //car image :
            document.getElementById("car-image").src = `${data.data.carModel.mainImage}`;
            //car model :
            document.getElementById("car-model").innerText = `${data.data.carModel.model}`;
            //car color :
            document.getElementById("car-color").innerText = `${data.data.carColor}`;
            // customer first name :
            document.getElementById("customer-first-name").innerText = `${data.data.user.firstName}`;
            // customer last name :
            document.getElementById("customer-last-name").innerText = `${data.data.user.lastName}`;
            // customer last name :
            document.getElementById("customer-email").innerText = `${data.data.user.email}`;
            //sale price :
            document.getElementById('sale-price').innerText = `${data.data.salePrice} $`;
            //payment status :
            document.getElementById('payment-status').innerHTML = `
                         <span class="label">حالة الدفع:</span>
                         ${setPaymentStatus(data.data.paymentStatus)}
            `;
            //pickup status :
            document.getElementById('pickup-status').innerHTML = `
                <span class="label">حالة الاستلام:</span>
               ${setPickUpStatus(data.data.pickupStatus)}
           `;
           //set data-id to the button :
           document.getElementById("update-pickup-btn").dataset.id = `${data.data.id}`;
        } else {
            console.log(data.msg);
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
        }
    } catch (err) {
        console.log(err);
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});

function setPaymentStatus(status) {
    switch (status) {
        case 'PENDING':
            return '<span class="value status-pending">قيد الانتظار</span>';
        case 'IN_PROGRESS':
            return '<span class="value status-in-progress">قيد التقدم</span>';
        case 'COMPLETED':
            return '<span class="value status-completed">مكتمل</span>';
    }
}

function setPickUpStatus(status){
    switch (status) {
        case 'PENDING':
            return '<span class="value status-pending">قيد الانتظار</span>';
        case 'READY':
            return '<span class="value status-in-progress">جاهز للاستلام</span>';
        case 'PICKED_UP':
            return '<span class="value status-completed">تم الإستلام</span>';
    }
}