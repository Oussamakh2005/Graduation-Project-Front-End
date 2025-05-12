import { config } from '../../utils/config.js';
import { showToast } from '../../utils/showToast.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get car ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  
  if (!carId) {
    showToast('خطأ', 'لم يتم تحديد السيارة المطلوبة', 'error');
    setTimeout(() => {
      window.location.href = './cars.html';
    }, 2000);
    return;
  }
  
  // Store car ID in hidden input
  document.getElementById('carId').value = carId;
  
  // Show loading overlay
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.style.display = 'flex';
  
  // Fetch car data
  fetchCarData(carId);
});

async function fetchCarData(carId) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${config.API_URL}/api/car/${carId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!data.ok) {
      throw new Error('Failed to fetch car data');
    }
    populateFormWithCarData(data.data);
    
  } catch (error) {
    console.error('Error fetching car data:', error);
    showToast('فشل في تحميل بيانات السيارة', 'error');
  } finally {
    // Hide loading overlay
    document.getElementById('loadingOverlay').style.display = 'none';
  }
}

function populateFormWithCarData(carData) {
  // Add car id to update buttons :
  document.getElementById("basic-info-confirm").dataset.id = carData.id;
  document.getElementById("engine-confirm").dataset.id = carData.engine[0].id;
  document.getElementById("features-confirm").dataset.id = carData.id;
  document.getElementById("images-confirm").dataset.id = carData.id;
  // Basic Information (Section 1)
  document.getElementById('model').value = carData.model || '';
  document.getElementById('year').value = carData.year || '';
  document.getElementById('type').value = carData.type || 'SEDAN';
  document.getElementById('transmission').value = carData.transmission || 'AUTO';
  document.getElementById('driveType').value = carData.driveType || 'FRONT_WHEEL';
  document.getElementById('price').value = carData.price || 0;
  document.getElementById('discount').value = carData.discount || 0;
  
  // Engine Details (Section 2)
  if (carData.engine) {
    document.getElementById('capacity').value = carData.engine[0].capacity || '';
    document.getElementById('engine-type').value = carData.engine[0].type || 'PETROL';
    document.getElementById('horsepower').value = carData.engine[0].horsepower || '';
  }
  
  // Features and Colors (Section 3)
  document.getElementById('doors').value = carData.doors || '';
  document.getElementById('seats').value = carData.seats || '';
  document.getElementById('max-speed').value = carData.maxSpeed || '';
  
  // Populate features
  const featuresContainer = document.getElementById('features-container');
  featuresContainer.innerHTML = '';
  
  if (carData.features && carData.features.length > 0) {
    carData.features.forEach(feature => {
      addTag(feature, featuresContainer, 'feature');
    });
    
    // Update hidden input
    document.getElementById('features').value = JSON.stringify(carData.features);
  }
  
  // Populate colors
  const colorsContainer = document.getElementById('colors-container');
  colorsContainer.innerHTML = '';
  
  if (carData.colors && carData.colors.length > 0) {
    carData.colors.forEach(color => {
      addTag(color, colorsContainer, 'color');
    });
    
    // Update hidden input
    document.getElementById('colors').value = JSON.stringify(carData.colors);
  }
  
  // Display current images
  displayCurrentImages([carData.mainImage] || []);
}

function displayCurrentImages(images) {
  const currentImagesContainer = document.getElementById('current-images');
  currentImagesContainer.innerHTML = '';
  
  if (images.length === 0) {
    const noImagesMsg = document.createElement('p');
    noImagesMsg.textContent = 'لا توجد صور حالية';
    noImagesMsg.className = 'no-images-message';
    currentImagesContainer.appendChild(noImagesMsg);
    return;
  }
  
  images.forEach((imageUrl, index) => {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-preview';
    imageContainer.dataset.imageUrl = imageUrl;
    
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = `Car Image ${index + 1}`;
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-image';
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    removeButton.addEventListener('click', (e) => {
      e.preventDefault();
      imageContainer.remove();
      // Keep track of removed images to delete them on the server
      const removedImagesInput = document.getElementById('removedImages') || 
        (() => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.id = 'removedImages';
          input.name = 'removedImages';
          input.value = '[]';
          document.getElementById('images-section').appendChild(input);
          return input;
        })();
      
      const removedImages = JSON.parse(removedImagesInput.value);
      removedImages.push(imageUrl);
      removedImagesInput.value = JSON.stringify(removedImages);
    });
    
    imageContainer.appendChild(image);
    imageContainer.appendChild(removeButton);
    currentImagesContainer.appendChild(imageContainer);
  });
}

function addTag(text, container, type) {
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.textContent = text;
  
  const removeBtn = document.createElement('span');
  removeBtn.className = 'remove-tag';
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => {
    tag.remove();
    updateHiddenInput(type);
  });
  
  tag.appendChild(removeBtn);
  container.appendChild(tag);
}

function updateHiddenInput(type) {
  const container = document.getElementById(`${type}s-container`);
  const tags = Array.from(container.querySelectorAll('.tag')).map(tag => {
    return tag.textContent.replace('×', '').trim();
  });
  
  document.getElementById(`${type}s`).value = JSON.stringify(tags);
}

// Initialize tag input functionality
document.addEventListener('DOMContentLoaded', () => {
  // Features tag input
  document.getElementById('add-feature-btn').addEventListener('click', () => {
    const input = document.getElementById('feature-input');
    const text = input.value.trim();
    
    if (text) {
      const container = document.getElementById('features-container');
      addTag(text, container, 'feature');
      updateHiddenInput('feature');
      input.value = '';
    }
  });
  
  // Colors tag input
  document.getElementById('add-color-btn').addEventListener('click', () => {
    const input = document.getElementById('color-input');
    const text = input.value.trim();
    
    if (text) {
      const container = document.getElementById('colors-container');
      addTag(text, container, 'color');
      updateHiddenInput('color');
      input.value = '';
    }
  });
  
  // Allow pressing Enter to add tags
  document.getElementById('feature-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('add-feature-btn').click();
    }
  });
  
  document.getElementById('color-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('add-color-btn').click();
    }
  });
});

// Handle image preview functionality
document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('image');
  const previewContainer = document.getElementById('preview');
  
  imageInput.addEventListener('change', (event) => {
    const files = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type and size
      if (!file.type.match('image.*')) {
        showToast('يرجى اختيار ملفات صور فقط', 'error');
        continue;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
        continue;
      }
      
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-preview';
        
        const image = document.createElement('img');
        image.src = e.target.result;
        image.alt = 'Car Image Preview';
        
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-image';
        removeButton.innerHTML = '<i class="fas fa-times"></i>';
        removeButton.addEventListener('click', (e) => {
          e.preventDefault();
          imageContainer.remove();
        });
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(removeButton);
        previewContainer.appendChild(imageContainer);
      };
      
      reader.readAsDataURL(file);
    }
  });
});