document.addEventListener('DOMContentLoaded', function() {
    // Get the hero button
    const heroButton = document.querySelector('.hero-button');
    
    // Add click event listener
    heroButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section
        const targetSection = document.querySelector('#brand-package');
        
        // Smooth scroll to the section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

document.addEventListener('DOMContentLoaded', async () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const counter = document.querySelector('.carousel-counter');
    const slider = document.querySelector('.carousel-slider');
    
    if (!carousel || !prevBtn || !nextBtn || !counter || !slider) {
        console.error('Carousel elements not found');
        return;
    }
    
    let currentIndex = 0;
    const itemWidth = 36; // width in rem
    const gap = 2; // gap in rem
    const totalSlides = 34; // Total number of slides
    
    // Set up slider
    slider.min = 0;
    slider.max = totalSlides - 1;
    slider.value = 0;
    
    // Define links for specific slides
    const slideLinks = {
        32: 'https://www.youtube.com/watch?v=_nvKLerHdWI&ab_channel=ChocoPie',
        33: 'https://www.youtube.com/@choco-pie-lotte'
    };
    
    // Set initial counter
    counter.textContent = `1 / `;
    const strong = document.createElement('strong');
    strong.textContent = totalSlides;
    counter.appendChild(strong);
    
    // Convert rem to pixels
    const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    // Function to update active slide
    const updateActiveSlide = (index) => {
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            if (i === index || i === index + totalSlides) {
                item.classList.add('active');
                // Enable links only for active slide
                const link = item.querySelector('.slide-link');
                if (link) {
                    link.style.pointerEvents = 'auto';
                }
            } else {
                item.classList.remove('active');
                // Disable links for non-active slides
                const link = item.querySelector('.slide-link');
                if (link) {
                    link.style.pointerEvents = 'none';
                }
            }
        });
    };
    
    // Function to get display index (1-based)
    const getDisplayIndex = (index) => {
        return ((index % totalSlides) + totalSlides) % totalSlides + 1;
    };
    
    // Initialize navigation immediately
    const scrollToIndex = (index, animate = true) => {
        // Calculate the exact scroll position for the target slide
        const scrollAmount = index * (remToPx(itemWidth + gap));
        
        // Update counter immediately
        currentIndex = index;
        counter.textContent = `${getDisplayIndex(currentIndex)} / `;
        const strong = document.createElement('strong');
        strong.textContent = totalSlides;
        counter.appendChild(strong);
        
        // Update slider
        slider.value = currentIndex % totalSlides;
        
        // Update active slide
        updateActiveSlide(currentIndex % totalSlides);
        
        if (animate) {
            // Animate scroll with GSAP
            gsap.to(carousel, {
                scrollLeft: scrollAmount,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    // Ensure final position is exact
                    carousel.scrollLeft = scrollAmount;
                }
            });
        } else {
            carousel.scrollLeft = scrollAmount;
        }
    };
    
    // Add click event listeners to buttons immediately
    prevBtn.onclick = () => {
        scrollToIndex(currentIndex - 1);
    };
    
    nextBtn.onclick = () => {
        scrollToIndex(currentIndex + 1);
    };
    
    // Add slider event listener
    slider.addEventListener('input', () => {
        scrollToIndex(parseInt(slider.value));
    });
    
    // Function to render PDF pages
    const renderPDF = async (pdfUrl) => {
        try {
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            const numPages = pdf.numPages;
            
            // Clear existing carousel items
            carousel.innerHTML = '';
            
            // Create canvas for each page
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                
                // Add click handler for the carousel item
                carouselItem.onclick = (e) => {
                    // Only handle clicks if it's not a link
                    if (!e.target.closest('.slide-link')) {
                        const items = carousel.querySelectorAll('.carousel-item');
                        const clickedIndex = Array.from(items).indexOf(carouselItem) % totalSlides;
                        scrollToIndex(clickedIndex);
                    }
                };
                
                // Add link wrapper for slides 32-33
                if (slideLinks[i]) {
                    const linkWrapper = document.createElement('a');
                    linkWrapper.href = slideLinks[i];
                    linkWrapper.target = '_blank';
                    linkWrapper.rel = 'noopener noreferrer';
                    linkWrapper.className = 'slide-link';
                    linkWrapper.style.pointerEvents = 'none'; // Disable clicks by default
                    
                    // Create icon element
                    const icon = document.createElement('i');
                    icon.className = 'ti ti-external-link';
                    icon.style.marginLeft = '0.5rem';
                    
                    // Create text span
                    const text = document.createElement('span');
                    text.textContent = 'Watch videos!';
                    
                    // Create tooltip container
                    const tooltip = document.createElement('div');
                    tooltip.className = 'slide-tooltip';
                    tooltip.appendChild(text);
                    tooltip.appendChild(icon);
                    
                    linkWrapper.appendChild(canvas);
                    linkWrapper.appendChild(tooltip);
                    carouselItem.appendChild(linkWrapper);
                } else {
                    carouselItem.appendChild(canvas);
                }
                
                carousel.appendChild(carouselItem);
            }
            
            // Duplicate slides for infinite scroll
            const items = carousel.querySelectorAll('.carousel-item');
            items.forEach(item => {
                const clone = item.cloneNode(true);
                // Copy the click handler to the clone
                clone.onclick = item.onclick;
                carousel.appendChild(clone);
            });
            
            // Set initial active slide
            updateActiveSlide(0);
            
            // Center the first slide
            setTimeout(() => {
                carousel.scrollLeft = 0;
            }, 100);
            
            // Add scroll event listener
            carousel.onscroll = () => {
                const scrollLeft = carousel.scrollLeft;
                const itemWidthPx = remToPx(itemWidth + gap);
                const newIndex = Math.round(scrollLeft / itemWidthPx);
                
                // Handle infinite scroll
                if (newIndex >= totalSlides) {
                    // If we've scrolled past the original slides, jump back to the start
                    scrollToIndex(newIndex % totalSlides, false);
                } else if (newIndex < 0) {
                    // If we've scrolled before the start, jump to the end
                    scrollToIndex(totalSlides + newIndex, false);
                } else {
                    // Only update if the index has actually changed
                    if (newIndex !== currentIndex) {
                        currentIndex = newIndex;
                        counter.textContent = `${getDisplayIndex(currentIndex)} / `;
                        const strong = document.createElement('strong');
                        strong.textContent = totalSlides;
                        counter.appendChild(strong);
                        slider.value = currentIndex % totalSlides;
                        updateActiveSlide(currentIndex);
                    }
                }
            };
            
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };
    
    // Load the PDF
    await renderPDF('assets/choco-pie-presentation.pdf');
});
