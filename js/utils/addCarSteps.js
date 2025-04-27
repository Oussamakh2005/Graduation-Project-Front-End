import { initializeCar } from '../dashboard/upload_car/initializeCar.js';
import { uploadEngineData } from '../dashboard/upload_car/uploadEngineData.js';
import {uploadFeatures} from '../dashboard/upload_car/uploadFeatures.js';

const steps = document.querySelectorAll('.step');
const progressSteps = document.querySelectorAll('.progress-step');
const nextBtn = document.getElementById('nextBtn');
//const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const carForm = document.getElementById('carForm');
const uploadBtn = document.getElementById('upload-btn');
let carId = '';
let currentStep = 0;
nextBtn.disabled = true;
const originalText = uploadBtn.innerHTML;
uploadBtn.addEventListener('click', async () => {
  uploadBtn.disabled = true;
  uploadBtn.innerHTML = `<span class="spinner"></span> جاري التحميل ....`;
  switch (currentStep) {
    case 0:
      carId = await initializeCar();
      break;
    case 1:
      carId = await uploadEngineData(carId);
      break;
    case 2:
      carId = await uploadFeatures(carId);
      break;
    case 3 :
      break;
  }
  if (carId) {
    nextBtn.disabled = false;
  }else{
    uploadBtn.disabled = false;
  }
  uploadBtn.innerHTML = originalText;
})
nextBtn.addEventListener('click', () => {
  nextBtn.disabled = true;
  uploadBtn.disabled = false;
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove('active');
    progressSteps[currentStep].classList.remove('active');
    progressSteps[currentStep].classList.add('completed');
    currentStep++;
    steps[currentStep].classList.add('active');
    progressSteps[currentStep].classList.add('active');
    updateButtons();
  }
});

/*prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    steps[currentStep].classList.remove('active');
    progressSteps[currentStep].classList.remove('active');
    currentStep--;
    steps[currentStep].classList.add('active');
    progressSteps[currentStep].classList.remove('completed');
    progressSteps[currentStep].classList.add('active');
    updateButtons();
  }
});*/

carForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('تم إضافة السيارة بنجاح!');
  carForm.reset();
  location.reload();
});

function updateButtons() {
  //prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
  nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
  submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';
}

// استعراض الصور بعد الرفع
const imagesInput = document.getElementById('images');
const previewContainer = document.getElementById('preview');

imagesInput.addEventListener('change', function () {
  previewContainer.innerHTML = '';
  Array.from(this.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'image-preview';
      previewContainer.appendChild(img);
    }
    reader.readAsDataURL(file);
  });
});

updateButtons();