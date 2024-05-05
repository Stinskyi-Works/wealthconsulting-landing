import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const setInitStyles = () => {
  gsap.set('footer', {
    y: 32,
    opacity: 0,
  });
}

const registerScrollTriggerStyles = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.offer',
      start: 'top center',
      toggleActions: 'play pause resume reverse',
    }
  });

  tl.to(`footer`, {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
  });
}

export const registerFooter = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  registerScrollTriggerStyles();
}