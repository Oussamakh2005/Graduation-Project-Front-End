import { config } from "../utils/config.js";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageContainer = document.getElementById("container");
const carId = urlParams.get('id');
if (!carId) {
    renderNoCarFound();
} else {
    try {
        const respose = await fetch(`${config.API_URL}/api/car/${carId}`);
        const data = await respose.json();
        if (data.ok) {
            renderCarDetails(data.data);
        } else {
            renderNoCarFound()
        }
    } catch (error) {
        renderNoCarFound()
    }
}

function renderNoCarFound() {
    pageContainer.innerHTML = `
        <div class="error-container">
      <i class="fas fa-exclamation-triangle error-icon"></i>
      <div class="error-code">404</div>
      <h1 class="error-message">الصفحة غير موجودة</h1>
      <p class="error-description">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
        يرجى التحقق من الرابط والمحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
      </p>
      <a href="./home.html" class="back-home">
        <i class="fas fa-home"></i> العودة للصفحة الرئيسية
      </a>
    </div>
    `
}

function renderCarDetails(data) {
    const image = document.getElementById('car-image');
    const model = document.getElementById('model');
    const price = document.getElementById('price');
    const features = document.getElementById('features');
    const specsTable = document.getElementById('specs-table');
    const colorList = document.getElementById('colors-list');
    const featuresList = document.getElementById('features-list');
    const colorsOptions = document.getElementById('color-options');

    //set image :
    image.src = data.mainImage;
    model.innerText = data.model;
    price.innerText = `${data.price} $`;
    //set features :
    features.innerHTML = `
          <div class="feature"><i class="fas fa-cogs"></i> ${setTransmission()}</div>
          <div class="feature"><i class="fas fa-gas-pump"></i> ${setFuleType(data.engine[0].type)}</div>
          <div class="feature"><i class="fas fa-road"></i> ${setDriveType(data.driveType)}</div>
          <div class="feature"><i class="fa-solid fa-gauge"></i>${data.maxSpeed}</div>
    `
    //set specs table :
    specsTable.innerHTML = `
              <tr>
            <th>نوع الوقود</th>
            <td>${setFuleType(data.engine[0].type)}</td>
          </tr>
          <tr>
            <th>سعة المحرك</th>
            <td>${data.engine[0].capacity} لتر</td>
          </tr>
          <tr>
            <th>ناقل الحركة</th>
            <td>${setTransmission()}</td>
          </tr>
          <tr>
            <th>عدد المقاعد</th>
            <td>${data.doors}</td>
          </tr>
          <tr>
            <th>عدد الأبواب</th>
            <td>${data.seats}</td>
          </tr>
          <tr>
            <th>سنة الصنع</th>
            <td>${data.year}</td>
          </tr>
          <tr>
            <th>نوع السيارة</th>
            <td>${data.type}</td>
          </tr>
          <tr>
            <th>السرعه القصوى </th>
            <td>${data.maxSpeed} كلم/ساعه</td>
          </tr>
    `;
    //set colors :
    for(let color of data.colors){
      colorList.innerHTML += `<li>${color}</li>`;
      colorsOptions.innerHTML += `
            <div class="radio-option">
            <input type="radio" name="carColor" value="${color}">
            <label>${color}</label>
           </div>
      `;
    }
    for(let feature of data.features){
      featuresList.innerHTML += `<li>${feature}</li>`;
    }
}

function setTransmission(transmission) {
    return transmission === 'MANUAL' ? 'يدوي' : `أوتوماتيك`;
}
function setFuleType(fuleType) {
    switch (fuleType) {
        case 'PETROL':
            return 'بنزين';
        case 'GAS':
            return 'غاز';
        case 'DIESEL':
            return 'ديزل';
        case 'HYBRID':
            return 'هايبرد';
        case 'ELECTRIC':
            return 'كهربائي';
    }
}

function setDriveType(driveType) {
    switch (driveType) {
        case 'FRONT_WHEEL':
            return 'دفع أمامي';
        case 'REAR_WHEEL':
            return 'دفع خلفي';
        case 'ALL_WHEEL':
            return 'دفع رباعي';
    }
}