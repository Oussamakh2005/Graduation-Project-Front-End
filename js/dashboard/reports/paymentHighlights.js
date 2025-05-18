import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener('DOMContentLoaded', async () => {
    const fullPaymentsCard = document.getElementById("full-payments");
    const downPaymentsCard = document.getElementById("down-payments");
    const totalRevenuCard = document.getElementById("total-revenues");
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${config.API_URL}/api/report/paymentHighlights`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if(data.ok){
            fullPaymentsCard.innerText = data.data.fullPayments;
            downPaymentsCard.innerText = data.data.downPayments;
            totalRevenuCard.innerText = setMoneyShort(data.data.totalRevenu); 
        }else{
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة","error")
        }
    }catch(error){
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});

function setMoneyShort(num) {
    if(num >= 1000000){
        return `${num / 1000000}M$`
    }else{
        return `${num / 1000}K$`
    }
}