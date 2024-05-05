import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const setInitStyles = () => {
  gsap.set('.offer .card', {
    y: 32,
    opacity: 0,
  });
  gsap.set('.offer .title', {
    y: 32,
    opacity: 0,
  });
  gsap.set('.offer .description', {
    y: 32,
    opacity: 0,
  });
  gsap.set('.offer .cta', {
    opacity: 0,
  });
}

const registerScrollTriggerStyles = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.offer',
      start: 'top bottom',
      id: 'of',
      // markers: true,
      toggleActions: 'play pause resume reverse',
    }
  });

  tl.to(`.offer .card`, {
    duration: 0.3,
    ease: "power3.in",
    y: 0,
    opacity: 1,
  }).to(`.offer .title`, {
    duration: 0.3,
    y: 0,
    opacity: 1,
  }).to(`.offer .description`, {
    duration: 0.3,
    y: 0,
    opacity: 1,
  }).to(`.offer .cta`, {
    duration: 0.3,
    delay: 0.5,
    opacity: 1,
  });
}

export const registerOffer = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  registerScrollTriggerStyles();
}