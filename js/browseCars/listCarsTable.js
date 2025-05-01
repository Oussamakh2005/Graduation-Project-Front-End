import { config } from "../utils/config.js";
try {
    const response = await fetch(`${config.API_URL}/api/car/all?skip=1`, {
        method: 'GET',
    });
    const data = await response.json();
    if (data.ok) {
        const cars = data.data;
        const carsTable = document.getElementById("car-table-body");
        for (const car of cars){ 
            carsTable.innerHTML += `
          <tr>
            <td>${car.id}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${car.price}</td>
            <td>${setAvailabiltyStatus(car.availability)}</td>
            <td>
              <button class="btn btn-view">عرض</button>
              <button class="btn btn-delete">حذف</button>
            </td>
          </tr>
            `
        };

    }else{
        console.log(data.msg);
    }
} catch (err) {
    console.log(err);
    console.log("Error fetching cars");
}

function setAvailabiltyStatus(status){
    return status ? ` <span class="badge available">متوفرة</span>` :  `<span class="badge unavailable">غير متاحه</span>`
}