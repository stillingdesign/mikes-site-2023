import { gsap } from "gsap";

const hoverableMediaThreshold = window.matchMedia("(min-width: 768px)")

if(document.querySelectorAll(`[data-copy-click]`) && hoverableMediaThreshold.matches) {
    document.querySelectorAll(`[data-copy-click]`).forEach(element => {
        const customValue  = element.getAttribute(`data-copy-value`);
        const customTitle  = element.getAttribute(`data-copy-title`);
        const customNote   = element.getAttribute(`data-copy-note`);
        const noteOffset   = element.getAttribute(`data-copy-offset`);
        const notification = `<div data-copy-notification class="absolute block bg:sheet-1 font:2xs uppercase border:1 border:edge leading:100 py:4 px:8 radius:full space:nowrap" style="opacity:0">${customNote}</div>`

        element.setAttribute(`title`, customTitle)
        element.addEventListener(`click`, function(event) {
            
            event.preventDefault();
            navigator.clipboard.writeText(customValue);
            element.insertAdjacentHTML(`afterend`, notification);

            const notificationEl  = element.nextElementSibling;
            function rmNotification() { notificationEl.remove(); }

            const tl = gsap.timeline({ onComplete:rmNotification });
            tl.to(notificationEl, { y: noteOffset, duration: 0.5, ease: `power2.inOut`})
              .to(notificationEl, { autoAlpha: 1, duration: 1, ease: `power2.inOut`}, `-=0.5`)
              .to(notificationEl, { autoAlpha: 0, duration: 0.5}, `+=1`);
        });
    });
};