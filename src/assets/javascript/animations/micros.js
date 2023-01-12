import { gsap } from "gsap";

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Emojis from btn
if(document.querySelectorAll(`[data-animate-emoji-float]`)) {
    document.querySelectorAll(`[data-animate-emoji-float]`).forEach(element => {
        element.querySelectorAll(`[data-animate-emoji-floating]`).forEach(emoji => {
            const xPos = emoji.getAttribute(`data-float-x`);
            const yPos = emoji.getAttribute(`data-float-y`);
            const rot = randomBetween(-180, 180);
            const delay = randomBetween(0, 5);
            const duration = randomBetween(2, 5);
            const fadeTiming = duration / 2;
            gsap.set(emoji, {display: `block`});
            const tl = gsap.timeline({ repeat: -1 });
            tl.to(emoji, { autoAlpha: 1, duration: delay})
              .to(emoji, { x: xPos, y: yPos, rotate: rot, duration: duration}, `+=${delay}`)
              .to(emoji, { autoAlpha: 0, duration: fadeTiming}, `-=${fadeTiming}`);
        })
    })
}