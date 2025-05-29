gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// NAVBAR PADDING CHANGES
ScrollTrigger.create({
    trigger: "section:nth-of-type(1)",
    start: "top 10%",
    end: "top 0%",
    onEnter: () => {
        gsap.to(".navbar", {
            paddingTop: "0.8rem",
            paddingBottom: "0.8rem",
            duration: 0.3,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(".navbar", {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.3,
            ease: "power2.out"
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar ul');
    let isMenuOpen = false;
  
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            gsap.to(navLinks, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    navLinks.classList.add('active');
                }
            });
        } else {
            gsap.to(navLinks, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    navLinks.classList.remove('active');
                    navLinks.style.display = 'none';
                }
            });
        }
    });
});

