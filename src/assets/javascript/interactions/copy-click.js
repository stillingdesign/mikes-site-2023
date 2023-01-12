import { gsap } from "gsap";

const hoverableMediaThreshold = window.matchMedia("(min-width: 768px)")

if(document.querySelectorAll(`[data-copy-click]`) && hoverableMediaThreshold.matches) {
    document.querySelectorAll(`[data-copy-click]`).forEach(element => {
        const customValue = element.getAttribute(`data-copy-value`);
        const customTitle = element.getAttribute(`data-copy-title`);
        const customNote  = element.getAttribute(`data-copy-note`);
        const notification = `<div data-copy-notification class="absolute bottom:n24 block bg:sheet-1 font:2xs uppercase border:1 border:edge leading:100 py:4 px:8 radius:full space:nowrap" style="opacity:0">${customNote}</div>`

        element.setAttribute(`title`, customTitle)
        element.addEventListener(`click`, function(event) {
            
            event.preventDefault();
            navigator.clipboard.writeText(customValue);
            element.insertAdjacentHTML(`afterend`, notification);

            const notificationEl  = element.nextElementSibling;
            function rmNotification() { notificationEl.remove(); }

            const tl = gsap.timeline({ onComplete:rmNotification });
            tl.to(notificationEl, { autoAlpha: 1, duration: 0.5})
              .to(notificationEl, { autoAlpha: 0, duration: 0.5}, `+=1`);
        });
    });
};