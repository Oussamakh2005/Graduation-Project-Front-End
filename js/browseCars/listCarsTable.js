import { config } from "../utils/config.js";
import { showToast } from "../utils/showToast.js";
try {
    const response = await fetch(`${config.API_URL}/api/car/all?skip=1`, {
        method: 'GET',
    });
    const data = await response.json();
    if (data.ok) {
        const cars = data.data;
        const carsTable = document.getElementById("car-table-body");
        for (const car of cars) {
            carsTable.innerHTML += `
          <tr>
            <td>${car.id}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${car.price} $</td>
            <td>${setAvailabiltyStatus(car.availability)}</td>
            <td>
              <a href="./edit_car.html?id=${car.id}"><button class="btn btn-view">عرض</button></a>
              <button class="btn btn-delete delete-car-btn" id="delete-car-btn" data-id="${car.id}">حذف</button>
            </td>
          </tr>
            `
        };

    } else {
        showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
    }
} catch (err) {
    showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
}

function setAvailabiltyStatus(status) {
    return status ? ` <span class="badge available">متوفرة</span>` : `<span class="badge unavailable">غير متاحه</span>`
}