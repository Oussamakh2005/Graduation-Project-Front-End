import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener("DOMContentLoaded", async () => {
    const basicInfoConfirmBtn = document.getElementById("basic-info-confirm");
    const engineInfoConfirmBtn = document.getElementById("engine-confirm");
    const featuresConfirmBtn = document.getElementById("features-confirm");
    const imageConfirmBtn = document.getElementById("images-confirm");
    const token = localStorage.getItem('token');
    //////////////////////////////////////////////////////////////////
    async function updateBasicInfo(carId) {
        const model = document.getElementById("model").value;
        const year = parseInt(document.getElementById("year").value);
        const type = document.getElementById("type").value;
        const transmission = document.getElementById("transmission").value;
        const driveType = document.getElementById("driveType").value;
        const price = parseInt(document.getElementById("price").value);
        const discount = parseInt(document.getElementById("discount").value) || 0;
        try {
            const response = await fetch(`${config.API_URL}/api/car/update/main/${carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
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
            if (data.ok) {
                showToast("تم تحديث بيانات السياره بنجاح", "success");
            } else {
                console.log(data);
                showToast("حدث خطأ أثناء تحديث بيانات السياره يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا", "error");
            }

        } catch (error) {
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        }
    }
    //////////////////////////////////////////////////////////////////////////
    async function updateEngineInfo(engineId) {
        const capacity = parseInt(document.getElementById("capacity").value);
        const type = document.getElementById("engine-type").value;
        const horsepower = parseInt(document.getElementById("horsepower").value);
        try {
            const response = await fetch(`${config.API_URL}/api/car/update/engine/${engineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    capacity,
                    type,
                    horsepower,
                }),
            });
            const data = await response.json();
            if (data.ok) {
                showToast("تم تحديث المحرك بنجاح", "success");
            } else {
                console.log(data);
                showToast("حدث خطأ أثناء تحديث المحرك يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا", "error");
            }

        } catch (error) {
            console.log(error);
            showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
        }
    }
    /////////////////////////////////////////////////////////////////////////
    async function updateFeatures(carId) {
        const colors = getColorsAndColors("color-tag");//document.getElementById("colors").value.split(',');
        const features = getColorsAndColors("feature-tag");//document.getElementById("features").value.split(',');
        const seats = parseInt(document.getElementById("seats").value);
        const doors = parseInt(document.getElementById("doors").value);
        const maxSpeed = parseInt(document.getElementById("max-speed").value);
        if (colors && features) {
            try {
                const response = await fetch(`${config.API_URL}/api/car/feature/${carId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({
                        maxSpeed,
                        seats,
                        doors,
                        colors,
                        features,
                    }),
                });
                const data = await response.json();
                if (data.ok) {
                    showToast("تم تحديث الميزات بنجاح", "success");
                } else {
                    console.log(data);
                    showToast("حدث خطأ أثناء تحديث الميزات يرجى التحقق من البيانات المدخله أو إعادة المحاولة لاحقا", "error");
                }

            } catch (error) {
                console.log(error);
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            }
        } else {
            showToast("يرجى ملأ كل المعلومات المطلوبه", "info");
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    async function upadeImage(carModelId) {
        const imageInput = document.getElementById('image');
        const formData = new FormData();
        if (!imageInput.files[0]) {
            showToast("يرجى إختيار صورة للسيارة", "error");
        } else {
            formData.append('image', imageInput.files[0]);
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${config.API_URL}/api/car/update/image/${carModelId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `${token}`
                    },
                    body: formData,
                });
                const data = await response.json();
                if (data.ok) {
                    showToast("تم تحديث الصوره بنجاح ", "success");
                } else {
                    console.log(data);
                    showToast("حدث خطأ أثناء تحديث الصورة", "error");
                }

            } catch (error) {
                console.log(error);
                showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
            }
        }
    }
    ////////////////////////////////////
    function getColorsAndColors(tag) {
        const elements = document.getElementsByClassName(tag);
        const features = [];
        for (const element of elements) {
            features.push(element.innerHTML);
        }
        if (features.length == 0) {
            return null;
        }
        return features;
    }

    basicInfoConfirmBtn.addEventListener("click", () => {
        updateBasicInfo(basicInfoConfirmBtn.dataset.id);
    });
    engineInfoConfirmBtn.addEventListener("click", () => {
        updateEngineInfo(engineInfoConfirmBtn.dataset.id);
    });
    featuresConfirmBtn.addEventListener("click", () => {
        updateFeatures(featuresConfirmBtn.dataset.id);
    });
    imageConfirmBtn.addEventListener("click",() => {
        upadeImage(imageConfirmBtn.dataset.id);
    });
});

