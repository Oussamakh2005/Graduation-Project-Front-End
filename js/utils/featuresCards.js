// Tag input system functionality
document.addEventListener('DOMContentLoaded', function() {
  // Features tag system
  const featureInput = document.getElementById('feature-input');
  const addFeatureBtn = document.getElementById('add-feature-btn');
  const featuresContainer = document.getElementById('features-container');
  const featuresHiddenInput = document.getElementById('features');
  
  // Colors tag system
  const colorInput = document.getElementById('color-input');
  const addColorBtn = document.getElementById('add-color-btn');
  const colorsContainer = document.getElementById('colors-container');
  const colorsHiddenInput = document.getElementById('colors');
  
  // Features functionality
  addFeatureBtn.addEventListener('click', function() {
    addTag(featureInput, featuresContainer, featuresHiddenInput,"feature-tag");
  });
  
  featureInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(featureInput, featuresContainer, featuresHiddenInput);
    }
  });
  
  // Colors functionality
  addColorBtn.addEventListener('click', function() {
    addTag(colorInput, colorsContainer, colorsHiddenInput ,"color-tag");
  });
  
  colorInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(colorInput, colorsContainer, colorsHiddenInput);
    }
  });
  
  // Function to add a tag
  function addTag(inputElement, containerElement, hiddenInput ,tagClass) {
    const value = inputElement.value.trim();
    if (value) {
      // Create tag element
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = `
        <span class="${tagClass}">${value}</span>
        <i class="fas fa-times tag-remove"></i>
      `;
      
      // Add remove functionality
      tag.querySelector('.tag-remove').addEventListener('click', function() {
        containerElement.removeChild(tag);
        updateHiddenInput(containerElement, hiddenInput);
      });
      
      // Add to container
      containerElement.appendChild(tag);
      
      // Update hidden input
      updateHiddenInput(containerElement, hiddenInput);
      
      // Clear input
      inputElement.value = '';
      inputElement.focus();
    }
  }
  
  // Function to update hidden input with comma-separated values
  function updateHiddenInput(containerElement, hiddenInput) {
    const tags = containerElement.querySelectorAll('.tag span');
    const values = Array.from(tags).map(tag => tag.textContent);
    hiddenInput.value = values.join(',');
  }
});