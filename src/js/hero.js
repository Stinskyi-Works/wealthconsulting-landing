import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { gsap } from "gsap";

import 'swiper/css';

const OFFICES = [
  'Office in Dubai',
  'Office in Miami',
  'Office in London',
  'Office in Bangkok',
  'Office in Riyadh',
  'Office in Tokyo',
];
let activeOfficeLabelIndex = 0;

const setInitStyles = () => {
  gsap.set(['.title-container h1', '.title-container h2', '.title-container .cta', '.bottom-container .office', '.bottom-container .social'], {
    y: 32,
    opacity: 0,
  });
}

const registerScrollTriggerStyles = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top 80%',
      toggleActions: 'play pause resume reverse',
    }
  });

  tl.to(['.title-container h1', '.title-container h2', '.title-container .cta', '.bottom-container .office', '.bottom-container .social'], {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
    stagger: {
      each: 0.3,
      delay: 0.3,
      ease: "power1.in"
    }
  });
}

export const registerHero = () => {
  setInitStyles();
  registerScrollTriggerStyles();

  const officesEl = document.querySelector('.office .title');

  officesEl.textContent = OFFICES[activeOfficeLabelIndex];

  var swiper = new Swiper(".hero-swiper", {
    modules: [ Autoplay ],
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 4000,
    },
  });

  swiper.onAny((event) => {
    if (event === 'realIndexChange') {
      activeOfficeLabelIndex += 1;

      if (activeOfficeLabelIndex > swiper.slides.length - 1) {
        activeOfficeLabelIndex = 0;
      }

      officesEl.textContent = OFFICES[activeOfficeLabelIndex];
      gsap.fromTo(officesEl, {
        y: -20,
        opacity: 0,
        duration: 0.3,
      }, {
        y: 0,
        opacity: 1,
      });
    }
  });
}