import { config } from "../utils/config.js";
try {
    const response = await fetch(`${config.API_URL}/api/car/all?skip=1`, {
        method: 'GET',
    });
    const data = await response.json();
    if (data.ok) {
        const cars = data.data;
        let carlist = ``;
        const carListContainer = document.getElementById("car-list");
        for (const car of cars){ 
            carlist += `
                  <div class="car-card" data-price="high" data-fuel="${car.engine[0].type}" data-transmission="${car.transmission}" data-seats="7">
        <img src="${car.mainImage}" alt="${car.model}" />
        <div class="info">
          <h4>${car.model}</h4>
          <p class="price">${car.price - car.discount} ريال</p>
          <a href="./pdp.html?id=${car.id}" class="details-btn">عرض التفاصيل</a>
        </div>
      </div>
            `
        };
        carListContainer.innerHTML += carlist;

    }else{
        console.log(data.msg);
    }
} catch (err) {
    console.log(err);
    console.log("Error fetching cars");
}