
gsap.registerPlugin(ScrollTrigger);

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


gsap.to(".nav-divider", {
    scrollTrigger: {
        trigger: "section:nth-of-type(2)",
        start: "top 80%",
        end: "bottom top",
        scrub: false,
        onEnter: () => {
            gsap.to(".nav-divider", {
            opacity: 0,
            duration: 0.2
            });
        },
        onLeaveBack: () => {
            gsap.to(".nav-divider", {
            opacity: 1,
            duration: 0.2
            });
        }
    }
});

gsap.to(".navbar", {
    scrollTrigger: {
        trigger: "section:nth-of-type(1)",
        start: "top 10%",
        scrub: false,
        onEnter: () => {
            gsap.to(".navbar", {
            paddingTop: "0.8rem",
            paddingBottom: "0.8rem"
            });
        },
        onLeaveBack: () => {
            gsap.to(".navbar", {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem"
            });
        }
    }
});