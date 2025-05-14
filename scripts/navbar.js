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

