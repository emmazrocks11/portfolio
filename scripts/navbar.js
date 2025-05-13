gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// NAVBAR PADDING CHANGES
gsap.to("nav", {
    scrollTrigger: {
        trigger: "section:nth-of-type(1)",
        start: "top 10%",
        scrub: 0.5,
        onEnter: () => {
            gsap.to(".navbar", {
            paddingTop: "0.8rem",
            paddingBottom: "0.8rem",
            duration: 0.1
            });
        },
        onLeaveBack: () => {
            gsap.to(".navbar", {
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.1
            });
        }
    }
});

