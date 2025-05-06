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
    end: () => "+=" + document.querySelector(".right-cards").offsetHeight,
    pin: ".left-header",
    scrub: false
});