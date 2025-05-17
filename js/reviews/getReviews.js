import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";

document.addEventListener("DOMContentLoaded", async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const carId = urlParams.get('id');
    try {
        const response = await fetch(`${config.API_URL}/api/review/${carId}`, {
            method: 'GET',
        });
        const data = await response.json();
        if(data.ok){
            const reviewsContainer = document.getElementById("reviews");
            const comments = data.data;
            reviewsContainer.innerHTML = "<h2>مراجعات العملاء</h2>";
            for(const comment of comments){
                reviewsContainer.innerHTML += `
                    <div class="review">
                        <strong>${comment.user.firstName}:</strong> ${comment.comment}
                    </div>
                `;
            }
        }else{
            showToast("فشل الحصول على المراجعات","error")
        }
    } catch(err) {
        console.log(err)
        showToast("حدث خطأ غير متوقع","error")
    }
});