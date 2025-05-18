// Get the modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close');

// Get all images in the gallery
const galleryImages = document.querySelectorAll('.ui-screens img');

// Add click event to all gallery images
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
        modalImg.alt = this.alt;
    });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let startX, moveX;
    let isDragging = false;
    let startTranslate = 0;
    let currentTranslate = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
        updateDots();
    }

    // Update slide position
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Next slide
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlidePosition();
            updateDots();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
            updateDots();
        }
    }

    // Handle drag start
    function dragStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        startTranslate = currentIndex * -100;
        track.style.transition = 'none';
    }

    // Handle drag move
    function dragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = moveX - startX;
        const translate = startTranslate + (diff / track.offsetWidth * 100);
        track.style.transform = `translateX(${translate}%)`;
    }

    // Handle drag end
    function dragEnd() {
        isDragging = false;
        track.style.transition = 'transform 0.5s ease';
        const diff = moveX - startX;
        const threshold = track.offsetWidth * 0.2; // 20% of track width

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex > 0) {
                prevSlide();
            } else if (diff < 0 && currentIndex < slides.length - 1) {
                nextSlide();
            } else {
                updateSlidePosition();
            }
        } else {
            updateSlidePosition();
        }
        updateDots();
    }

    // Touch events
    track.addEventListener('touchstart', dragStart);
    track.addEventListener('touchmove', dragMove);
    track.addEventListener('touchend', dragEnd);

    // Mouse events
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('mouseleave', dragEnd);

    // Prevent context menu on long press
    track.addEventListener('contextmenu', (e) => e.preventDefault());

    // Button click events
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Get the hero button
    const heroButton = document.querySelector('.hero-button');
    
    // Add click event listener
    heroButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section
        const targetSection = document.querySelector('#final-prototype');
        
        // Smooth scroll to the section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});