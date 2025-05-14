gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Green background when second section reaches viewport
gsap.to("body", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%", // When top of section hits 80% of viewport
        end: "bottom center", // Until bottom of section reaches center
        scrub: false, // Animation is triggered, not scrubbed
        onEnter: () => {
        gsap.to("body", {
            backgroundColor: "#567741",
            duration: 0.2
        });
        },
        onLeaveBack: () => {
        gsap.to("body", {
            backgroundColor: "white",
            duration: 0.2
        });
        }
    }
});

// NAV-DIVIDER LINE OPACITY
gsap.to(".nav-divider", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%",
        end: "bottom top",
        scrub: false,
        onEnter: () => {
            gsap.to(".nav-divider", {
            opacity: 0,
            duration: 0.1
            });
        },
        onLeaveBack: () => {
            gsap.to(".nav-divider", {
            opacity: 1,
            duration: 0.1
            });
        }
    }
});

// PROJECT CARDS Left and Right
ScrollTrigger.create({
    trigger: ".feat-proj",
    start: "top top",
    end: "bottom bottom",
    pin: ".left-header",
    pinSpacing: false,
    scrub: false
});



// CIRCULAR TEXT

document.addEventListener('DOMContentLoaded', () => {
    const circularText = document.querySelector('.circular-text');
    if (!circularText) return;

    // Helper to add spaces between each letter
    function addSpaces(str, n = 1) {
        return str.split('').join(' '.repeat(n));
    }

    // Phrase and repetition
    const phrase = addSpaces('   h o v e r    o v e r    m e   ', 1); // 1 space between each letter
    const repeatCount = 2;
    const separator = ' • ';
    // Add separator after every phrase, including the last
    let text = '';
    for (let i = 0; i < repeatCount; i++) {
        text += phrase + separator;
    }
    // Remove any previous content
    circularText.innerHTML = '';

    // Parameters
    const radius = 5.5; // rem, adjust for your matcha size
    const totalLetters = text.length;
    const spacingFactor = 1.5; // Added for the new angle calculation

    // Create letters in a circle
    for (let i = 0; i < totalLetters; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.style.position = 'absolute';
        letter.style.top = '50%';
        letter.style.left = '50%';
        // Calculate angle for this letter
        const angle = (i / totalLetters) * 360;
        letter.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}rem)`;
        circularText.appendChild(letter);
    }

    // Animate rotation
    let rotation = 0;
    gsap.to({}, {
        duration: 100,
        repeat: -1,
        ease: 'none',
        onUpdate: function() {
            rotation -= 0.5;
            circularText.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
    });

    // Add hover effect for matcha wrapper
    const matchaWrapper = document.querySelector('.matcha-wrapper');
    const matchaText = document.querySelector('.matcha-text');

    matchaWrapper.addEventListener('mouseenter', () => {
        gsap.to(circularText, {
            x: '-15%',
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    matchaWrapper.addEventListener('mouseleave', () => {
        gsap.to(circularText, {
            x: '0%',
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// CIRCULAR TExT COLOR
gsap.to(".circular-text span", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%",
        end: "bottom top",
        scrub: false,
        onEnter: () => {
            gsap.to(".circular-text span", {
            color: "#ffffff",
            duration: 0.1
            });
        },
        onLeaveBack: () => {
            gsap.to(".circular-text span", {
            color: "#292929",
            duration: 0.1
            });
        }
    }
});

// MATCHA TEXT COLOR
gsap.to(".matcha-text p", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%",
        end: "bottom top",
        scrub: false,
        onEnter: () => {
            gsap.to(".matcha-text p", {
            color: "#ffffff",
            duration: 0.1
            });
        },
        onLeaveBack: () => {
            gsap.to(".matcha-text p", {
            color: "#292929",
            duration: 0.1
            });
        }
    }
});

// COW JOKE TEXT COLOR
gsap.to(".cow-joke h1", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%",
        end: "bottom top",
        scrub: false,
        onEnter: () => {
            gsap.to(".cow-joke h1", {
            color: "#5a7d43",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            duration: 0.1
            });
        },
        onLeaveBack: () => {
            gsap.to(".cow-joke h1", {
            color: "#ffffff",
            textShadow: "none",
            duration: 0.1
            });
        }
    }
});