import { gsap } from "gsap";    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const setInitStyles = () => {
  gsap.set('.about-cards .card', {
    opacity: 0,
    y: 32,
  });
}

const registerScrollTriggerStyles = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.youtube',
      start: 'bottom 80%',
      toggleActions: 'play play resume reverse',
    }
  }).to('.about-cards .card', {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
    stagger: {
      each: 0.1,
    }
  });
}

const registerCardHoverAnimation = (num) => {
  const tl = gsap.timeline({ paused: true });
  const elem = document.querySelector(`.about-cards .card${num}`);
  // const overlayElem = document.querySelector(`.about-cards .card${num} .overlay`);
  let hovered = false;

  tl.to(`.about-cards .card${num}`, {
    duration: 0.3,
    ease: "power3.out",
    scale: 1.3,
    zIndex: 55,
    overflow: 'visible',
  });
  tl.to(`.about-cards .card${num} .overlay`, {
    delay: -0.3,
    duration: 0.3,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 'auto',
    minHeight: '100%',
    border: `1px solid #A98F5C`,
    boxShadow: '0px 0px 141px 13px rgba(0,0,0,0.75)',
    cursor: 'pointer',
    top: 0,
  });
  tl.to(`.about-cards .card${num} .title`, {
    delay: -0.3,
    duration: 0.3,
    scale: 0,
    display: 'none',
  });
  tl.to(`.about-cards .card${num} .overlay-content`, {
    duration: 0.3,
    opacity: 1,
    display: 'flex',
  });
  
  elem.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
    hovered = true;
  });
  elem.addEventListener('mouseleave', () => {
    tl.timeScale(2).reverse();
    hovered = false;
  });
}

export const registerAboutUs = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  registerScrollTriggerStyles();

  registerCardHoverAnimation(1);
  registerCardHoverAnimation(2);
  registerCardHoverAnimation(3);
  registerCardHoverAnimation(4);
  registerCardHoverAnimation(5);
  registerCardHoverAnimation(6);
}