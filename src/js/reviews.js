import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const setInitStyles = () => {
  new Swiper(".reviews-swiper", {
    modules: [ Autoplay, Navigation, Pagination ],
    initialSlide: 2,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // effect: "coverflow",
    // coverflowEffect: {
    //   rotate: 0,
    //   stretch: 0,
    //   depth: 150,
    //   modifier: 1,
    //   slideShadows: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      699: {
        slidesPerView: 2,
      },
      899: {
        slidesPerView: 4,
      },
    }
  });

  // gsap.set('.reviews .section-header', {
  //   opacity: 0,
  // });
  // gsap.set('.reviews-swiper-container', {
  //   opacity: 0,
  //   y: 32,
  // });
}

const registerScrollTriggerStyles = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.reviews',
      start: '-40% 40%',
      toggleActions: 'play pause resume reverse',
      markers: true,
    }
  });

  tl.to('.reviews .section-header', {
    duration: 0.3,
    opacity: 1,
  });
  tl.to('.reviews-swiper-container', {
    duration: 0.3,
    opacity: 1,
    y: 0,
  });
}

export const registerReviews = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  // registerScrollTriggerStyles();
}