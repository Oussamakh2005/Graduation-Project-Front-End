import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener('DOMContentLoaded', async () => {
    const totalCarsCard = document.getElementById("total-cars");
    const totalUsersCard = document.getElementById("total-users");
    const totalRevenuCard = document.getElementById("total-revenues");
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${config.API_URL}/api/report/adminHighlights`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if(data.ok){
            totalCarsCard.innerText = data.data.totalCars;
            totalUsersCard.innerText = data.data.totalUsers;
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