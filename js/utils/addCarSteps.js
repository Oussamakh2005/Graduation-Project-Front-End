
let currentStep = 1;
const totalSteps = 3;

// Show step function
const showStep = (step) => {
    // Update steps visibility
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');

    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        const stepNum = index + 1;
        el.classList.remove('active', 'completed');

        if (stepNum === step) {
            el.classList.add('active');
        } else if (stepNum < step) {
            el.classList.add('completed');
            el.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            el.textContent = stepNum;
        }
    });

    // Update buttons
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'flex';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'flex';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'flex' : 'none';
};

// Next button event
document.getElementById('nextBtn').addEventListener('click', () => {
    // Validate current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = 'red';
            input.style.boxShadow = '0 0 0 2px rgba(255, 0, 0, 0.2)';
        } else {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    });

    if (isValid && currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
});

// Previous button event
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

// Form submission
document.getElementById('carForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);

    // Show success message
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <div style="font-size: 60px; color: var(--success); margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2 style="font-size: 24px; margin-bottom: 15px; color: var(--success);">تم حفظ بيانات السيارة بنجاح!</h2>
          <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 30px;">تمت إضافة السيارة الجديدة إلى قاعدة البيانات</p>
          <button type="button" class="btn btn-primary" onclick="window.location.reload()">
            <i class="fas fa-plus"></i> إضافة سيارة أخرى
          </button>
        </div>
      `;
});

// File upload preview for main image
document.getElementById('mainImageUpload').addEventListener('click', () => {
    document.getElementById('mainImage').click();
});

document.getElementById('mainImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewContainer = document.getElementById('mainImagePreview');
            previewContainer.innerHTML = `<img src="${e.target.result}" class="image-preview" alt="Main car image">`;
        }
        reader.readAsDataURL(file);
    }
});

// File upload preview for additional images
document.getElementById('additionalImagesUpload').addEventListener('click', () => {
    document.getElementById('additionalImages').click();
});

document.getElementById('additionalImages').addEventListener('change', function (e) {
    const files = e.target.files;
    const previewContainer = document.getElementById('additionalImagesPreview');
    //previewContainer.innerHTML = '';

    for (const [i, file] of Array.from(files).slice(0, 5).entries()) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview';
            img.alt = `Car image ${i + 1}`;
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }    
});

// Initialize
showStep(currentStep);