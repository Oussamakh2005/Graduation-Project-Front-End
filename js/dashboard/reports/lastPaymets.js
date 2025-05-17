import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const paymentsTable = document.getElementById("payments-table");
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${config.API_URL}/api/report/lastPayments`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if (data.ok) {
            const payments = data.data;
            for(const payment of payments){
                paymentsTable.innerHTML += `
                <tr>
                   <td>${payment.id}</td>
                   <td>${payment.sale.user.firstName + " "+payment.sale.user.lastName}</td>
                   <td>${payment.paymentAmount + "$"}</td>
                   <td>${setPaymentType(payment.paymentType)}</td>
                   <td>${payment.paymentDate}</td>
                </tr>
                `;
            }
        } else {
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
        }
    } catch (error) {
        console.log(error)
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }

});

function setPaymentType(type){
    return (type == 'FULL_PAYMENT')? `<span class="status completed"> تكميلية</span>` : `<span class="status pending">مسبقه</span>`;
}