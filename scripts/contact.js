function copyEmail() {
    const email = 'emmaleannzhang@gmail.com';
    const emailBox = document.querySelector('.email-box');
    const notification = document.querySelector('.copy-notification');
    
    // Copy email to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show notification
        notification.classList.add('show');
        
        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
} 