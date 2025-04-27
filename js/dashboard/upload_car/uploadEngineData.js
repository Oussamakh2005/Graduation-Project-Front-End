import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
export const uploadEngineData = async (carModelId) => {
    const token = localStorage.getItem('token');
    const capacity = parseInt(document.getElementById("capacity").value);
    const type = document.getElementById("engine-type").value;
    const horsepower = parseInt(document.getElementById("horsepower").value);
    try{
        const response = await fetch(`${config.API_URL}/api/car/engine`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${token}`
            },
            body : JSON.stringify({
                carModelId,
                capacity,
                type,
                horsepower,
            }),
        });
        const data = await response.json();
        if(data.ok){
            showToast("تم إضافة المحرك بنجاح يرجى إكمال باقي المعلومات","success");
            return data.data.id
        }else {
            console.log(data);
            showToast("حدث خطأ أثناء إضافة المحرك يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا","error");
            return null;
        }

    }catch(error){
        console.log(error);
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا","error");
        return null;
    }
}