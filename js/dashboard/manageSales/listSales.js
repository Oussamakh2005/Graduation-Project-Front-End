import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${config.API_URL}/api/sale`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
        }
    });
    const data = await response.json();
    if (data.ok) {
        const sales = data.data;
        const salesTable = document.getElementById("sale-table-body");
        for (const sale of sales) {
            salesTable.innerHTML += `
          <tr data-id=${sale.id} class="sales-row">
            <td>${sale.id}</td>
            <td>${sale.user.firstName + " " + sale.user.lastName}</td>
            <td>${sale.carModel.model}</td>
            <td>${sale.salePrice} $</td>
            <td>${sale.saleDate}</td>
            <td>${setPaymentStatus(sale.paymentStatus)}</td>
            <td>${setPickUpStatus(sale.pickupStatus)}</td>
            <td><a href="./sale.html?id=${sale.id}" class="btn">عرض</a></td>
          </tr>
            `
        };

    } else {
        console.log(data.msg);
        showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
    }
} catch (err) {
    console.log(err);
    showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
}

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
function setPickUpStatus(status) {
    switch (status) {
        case 'PENDING':
            return '<span class="badge pending">قيد الانتظار</span>';
        case 'READY':
            return '<span class="badge processing">جاهز</span>';
        case 'PICKED_UP':
            return '<span class="badge completed">تم</span>';
    }
}