import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
export const uploadCarImage = async (carModelId) => {
    const imageInput = document.getElementById('image');
    const formData = new FormData();
    if(!imageInput.files[0]){
        showToast("يرجى إختيار صورة للسيارة",error);
        return null;
    }
    formData.append('image',imageInput.files[0]);
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(`${config.API_URL}/api/car/images/${carModelId}`,{
            method : 'PUT',
            headers : {
                'Authorization' : `${token}`
            },
            body : formData,
        });
        const data = await response.json();
        if(data.ok){
            showToast("تم إضافة الصورة بنجاح ","success");
            return data.data.id
        }else {
            console.log(data);
            showToast("حدث خطأ أثناء إضافة الصورة","error");
            return null;
        }

    }catch(error){
        console.log(error);
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا","error");
        return null;
    }
}