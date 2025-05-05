import { config } from "../../utils/config.js";
import {showToast} from "../../utils/showToast.js"
document.addEventListener("DOMContentLoaded",async() => {
    const totalSalesCard = document.getElementById("total-sales");
    const completedSalesCard = document.getElementById("completed-sales");
    const pendingSalesCard = document.getElementById("pending-sales");
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${config.API_URL}/api/report/clientHightlights`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if(data.ok){
            totalSalesCard.innerText = data.data.totalSales;
            completedSalesCard.innerText = data.data.completedSales;
            pendingSalesCard.innerText = data.data.pendingSales; 
        }else{
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة","error")
        }
    }catch(error){
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});