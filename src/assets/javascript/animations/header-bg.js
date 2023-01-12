import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function fadeInHeaderBg() {
    const headerBg = document.querySelector(`[data-header-bg]`);
    const firstSection = document.querySelector(`[data-first-section]`);
    const desktopThreshold = window.matchMedia("(min-width: 768px)");

    // Change scrub speed based on device
    function startVal(val) {
        val = 'top top';
        if(desktopThreshold.matches) { val = 'bottom center'; }
        return val
    }

    function endVal(val) {
        val = 'bottom center';
        if(desktopThreshold.matches) { val = 'bottom top'; }
        return val
    }

    gsap.set(headerBg, { autoAlpha:0 });
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: firstSection,
            start: startVal(),
            end: endVal(),
            scrub: true,
        },
    });
    tl.to(headerBg, { autoAlpha: 1, duration: 1 })
}
fadeInHeaderBg();