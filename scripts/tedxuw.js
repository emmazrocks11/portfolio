document.addEventListener('DOMContentLoaded', function() {
    // Get the hero button
    const heroButton = document.querySelector('.hero-button');
    
    // Add click event listener
    heroButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section
        const targetSection = document.querySelector('#deliverables');
        
        // Smooth scroll to the section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}); 