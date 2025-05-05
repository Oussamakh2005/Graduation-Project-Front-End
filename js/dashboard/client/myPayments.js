import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";

document.addEventListener("DOMContentLoaded", async () => {
    const paymentTable = document.getElementById("payments-table");
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${config.API_URL}/api/payment/user`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if (data.ok) {
            const payments = data.data;
            for(const payment of payments){
                paymentTable.innerHTML += `
                <tr>
                  <td>${payment.id}</td>
                  <td>${payment.paymentDate}</td>
                  <td>${payment.paymentAmount} دينار</td>
                  <td>${setPaymentType(payment.paymentType)}</td>
                </tr>
                `
            }
        }
        else {
            console.log(data.msg);
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
        }
    } catch (err) {
        console.log(err);
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});

function setPaymentType(type){
    return (type === "DOWNPAYMENT")? `<span class="status scheduled">مسبقه</span>` : `<span class="status completed">تكميليه</span>`;
}