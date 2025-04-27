import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
export const initializeCar = async () => {
    const token = localStorage.getItem('token');
    const model = document.getElementById("model").value;
    const year = parseInt(document.getElementById("year").value);
    const type = document.getElementById("type").value;
    const transmission = document.getElementById("transmission").value;
    const driveType = document.getElementById("driveType").value;
    const price = parseInt(document.getElementById("price").value);
    const discount = parseInt(document.getElementById("discount").value) || 0;
    try{
        const response = await fetch(`${config.API_URL}/api/car/init`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${token}`
            },
            body : JSON.stringify({
                model,
                year,
                type,
                transmission,
                driveType,
                price,
                discount
            }),
        });
        const data = await response.json();
        if(data.ok){
            showToast("تم إضافة السيارة بنجاح يرجى إكمال باقي المعلومات","success");
            return data.data.id
        }else {
            console.log(data);
            showToast("حدث خطأ أثناء إضافة السياره يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا","error");
            return null;
        }

    }catch(error){
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا","error");
        return null;
    }
}