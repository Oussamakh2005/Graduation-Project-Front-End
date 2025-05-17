import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${config.API_URL}/api/sale/user`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if (data.ok) {
            const sales = data.data;
            const salesTable = document.getElementById("sales-table");
            console.log(sales);
            for (const sale of sales) {
                salesTable.innerHTML += `
                <tr>
                  <td>${sale.id}</td>
                  <td>${sale.carModel.model}</td>
                  <td>${sale.salePrice} $</td>
                  <td>${sale.saleDate}</td>
                  <td>${setPaymentStatus(sale.paymentStatus)}</td>
                  <td>${setPrice(sale.paymentStatus,sale.salePrice)} دينار</td>
                  <td><button class="btn btn-view" data-id="${sale.id}">عرض</button></td>
                </tr>
                `;
            };

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
            return '<span class="badge pending">قيد الانتظار</span>';
        case 'IN_PROGRESS':
            return '<span class="badge processing">قيد المعالجة</span>';
        case 'COMPLETED':
            return '<span class="badge completed">مكتملة</span>';
    }
}


function setPrice(status,price){
    switch (status) {
        case 'PENDING':
            return price;
        case 'IN_PROGRESS':
            return parseInt(price) * 0.8;
        case 'COMPLETED':
            return 0;
    }
}