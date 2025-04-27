/**
 * Toast Notification System
 * Displays toast notifications at the bottom right of the screen
 * with support for different types (success, error, info, warning)
 */

// Toast container reference - create if it doesn't exist
let toastContainer = document.getElementById('toastContainer');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toastContainer';
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds (default: 5000ms)
 */
export function showToast(message, type = 'info', duration = 5000) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Set icon based on type
  let icon = '';
  switch(type) {
    case 'success':
      icon = 'fa-circle-check';
      break;
    case 'error':
      icon = 'fa-circle-xmark';
      break;
    case 'warning':
      icon = 'fa-triangle-exclamation';
      break;
    case 'info':
    default:
      icon = 'fa-circle-info';
      break;
  }
  
  // Create toast content
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="toast-message">${message}</div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Set progress bar animation duration
  toast.style.setProperty('--progress-duration', `${duration}ms`);
  
  // Trigger animation after a small delay (for proper rendering)
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out forwards';
  }, 10);
  
  // Set up close button
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    closeToast(toast);
  });
  
  // Auto-close after duration
  const timeoutId = setTimeout(() => {
    closeToast(toast);
  }, duration);
  
  // Store timeout ID on the element for potential early closing
  toast.dataset.timeoutId = timeoutId;
}

/**
 * Closes a toast notification with animation
 * @param {HTMLElement} toast - The toast element to close
 */
function closeToast(toast) {
  // Clear any existing timeout
  clearTimeout(parseInt(toast.dataset.timeoutId));
  
  // Play exit animation
  toast.style.animation = 'slideOut 0.3s ease-out forwards';
  
  // Remove from DOM after animation completes
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Example usage (remove this in production)
//showToast("تم تسجيل الدخول بنجاح", "success");