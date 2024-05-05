import { gsap } from 'gsap';

import { eventBus } from './eventBus';

const menuTl = gsap.timeline({ paused: true });

menuTl.to('#modal-mobile-menu', {
  duration: 0.3,
  ease: "power3.out",
  y: 0,
  opacity: 1,
  display: 'flex',
  zIndex: 100,
  backgroundColor: 'rgba(0,0,0,0.9)',
}).to("#modal-mobile-menu .menu-link", {
  delay: -0.3,
  opacity: 1,
  x: 0,
  stagger: {
    each: 0.1,
    ease: "power1.in"
  }
}).to('#modal-mobile-menu .call-btn', {
  duration: 0.3,
  opacity: 1,
  ease: 'poser3.out',
});

const showModalAnimation = () => {
  menuTl.timeScale(1).play();
}

const hideModalAnimation = (afterCb) => {
  menuTl.timeScale(2).reverse().then(afterCb);
}

const setInitStyles = () => {
  gsap.set('#modal-mobile-menu', {
    display: 'none',
    opacity: 0,
    zIndex: -1,
  });
}

export const registerModalMobileMenu = () => {
  setInitStyles();

  const elem = document.getElementById('modal-mobile-menu');

  eventBus.on('menu-click', () => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(elem);

    eventBus.emit('show-modal', {
      name: 'mobile-menu',
      element: fragment,
      showAnim: showModalAnimation,
      hideAnim: hideModalAnimation,
    });
  });
}