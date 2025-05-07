import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
export const uploadFeatures = async (carModelId) => {
    const token = localStorage.getItem('token');
    const colors = getColorsAndColors("color-tag");//document.getElementById("colors").value.split(',');
    const features = getColorsAndColors("feature-tag");//document.getElementById("features").value.split(',');
    const seats = parseInt(document.getElementById("seats").value);
    const doors = parseInt(document.getElementById("doors").value);
    const maxSpeed = parseInt(document.getElementById("max-speed").value);
    if(colors && features){
        try{
            const response = await fetch(`${config.API_URL}/api/car/feature/${carModelId}`,{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify({
                    maxSpeed,
                    seats,
                    doors,
                    colors,
                    features,
                }),
            });
            const data = await response.json();
            if(data.ok){
                showToast("تم إضافة الميزات بنجاح يرجى إكمال باقي المعلومات","success");
                return data.data.id
            }else {
                console.log(data);
                showToast("حدث خطأ أثناء إضافة الميزات يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا","error");
                return null;
            }
    
        }catch(error){
            console.log(error);
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا","error");
            return null;
        }
    }else {
        showToast("يرجى ملأ كل المعلومات المطلوبه","info");
        return null;
    }
}

function getColorsAndColors(tag){
    const elements = document.getElementsByClassName(tag);
    const features = [];
    for(const element of elements){
        features.push(element.innerHTML);
    }
    if(features.length == 0){
        return null;
    }
    return features;
}