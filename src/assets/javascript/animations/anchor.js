import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

if(document.querySelectorAll(`[data-anchor]`)) {
    document.querySelectorAll(`[data-anchor]`).forEach(anchor => {
        const link = anchor.href;
        const sectionId = link.split("/").pop();
        const offset = anchor.getAttribute(`data-anchor-offset`);
        console.log(sectionId)

        const scrollToSection = (event) => {
            event.preventDefault();
            gsap.to(window, {duration:1, scrollTo: {y: sectionId, offsetY: offset}, ease: "power3.inOut"});
        }
        
        anchor.addEventListener(`click`, scrollToSection, false);
    })
}