import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(`[data-slide-title]`).forEach(section => {
    const animateEl = section.querySelector(`[data-slide-title-animate]`);
    const direction = section.getAttribute(`data-slide-title`);
    const distance = animateEl.offsetWidth / 5;
    const desktopThreshold = window.matchMedia("(min-width: 768px)");

    // Change scrub speed based on device
    function scrubVal(speed) {
        speed = true;
        if(desktopThreshold.matches) { speed = 2; }
        return speed
    }

    // Apply animations
    if(direction === 'left') {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: `top 110%`,
                end: `bottom -10%`,
                scrub:  scrubVal(),
            },
        });
        tl.to(animateEl, { x: distance * -1, duration: 1 })
    } else {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: `top 110%`,
                end: `bottom -10%`,
                scrub: scrubVal(),
            },
        });
        tl.to(animateEl, { x: distance, duration: 1 })
    }
})
