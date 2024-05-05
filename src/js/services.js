import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const registerZeroCardHoverAnimation = () => {
  const elem = document.querySelector(`.card-zero`);
  const tl = gsap.timeline({ paused: true });

  tl.to(`.card-zero`, {
    duration: 0.3,
    scale: 1.03,
    zIndex: 60,
  });
  tl.to(`.card-zero .overlay`, {
    duration: 0.3,
    height: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#B39864',
    zIndex: 60,
  });
  tl.to(`.card-zero .left`, {
    duration: 0.3,
    display: 'flex',
    opacity: 1,
  });

  elem.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
  });
  elem.addEventListener('mouseleave', () => {
    tl.timeScale(2).reverse();
  });
}

const registerCardHoverAnimation = (num) => {
  const elem = document.querySelector(`.card${num}`);
  const tl = gsap.timeline({ paused: true });

  tl.to(`.card${num}`, {
    duration: 0.3,
    ease: "power3.out",
    scale: 1.3,
    border: 'none',
    boxShadow: '0px 0px 141px 13px rgba(0,0,0,0.75)',
    zIndex: 60,
  });
  tl.to(`.card-overlay${num}`, {
    delay: -0.3,
    duration: 0.3,
    border: `1px solid #A98F5C`,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 'auto',
    top: 0,
    minHeight: '100%',
    justifyContent: 'flex-start',
  });
  tl.to(`.card${num} .card-title`, {
    delay: -0.3,
    duration: 0.3,
    scale: 0,
  });
  tl.set(`.card${num} .card-title`, {
    display: 'none',
  });
  tl.set(`.card-content${num}`, {
    duration: 0.3,
    display: 'flex',
    flex: 1,
  });
  tl.to(`.card-content${num}`, {
    duration: 0.3,
    opacity: 1,
  });
  tl.to(`.card-link-button${num}`, {
    duration: 0.3,
    opacity: 1,
  });

  elem.addEventListener('mouseenter', () => {
    tl.timeScale(1).play();
  });
  elem.addEventListener('mouseleave', () => {
    tl.timeScale(2).reverse();
  });
}

const setInitStyles = () => {
  gsap.set(['.services .card', '.services .card-zero', '.services .table'], {
    y: 32,
    opacity: 0,
  });
}

const registerScrollTriggerStyles = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.services',
      start: 'top 80%',
      toggleActions: 'play play resume reverse',
    }
  }).to(`.services .card-zero`, {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.services .card-zero',
      start: 'top center',
      toggleActions: 'play play resume reverse',
    }
  }).to(`.services .card`, {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
    stagger: {
      each: 0.1,
    }
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.services .cards-wrapper',
      start: 'top center',
      toggleActions: 'play play resume reverse',
    }
  }).to(`.services .table`, {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
  });
}

export const registerServices = () => {
  gsap.registerPlugin(ScrollTrigger);

  registerZeroCardHoverAnimation();
  registerCardHoverAnimation(1);
  registerCardHoverAnimation(2);
  registerCardHoverAnimation(3);
  registerCardHoverAnimation(4);

  setInitStyles();
  registerScrollTriggerStyles();
}