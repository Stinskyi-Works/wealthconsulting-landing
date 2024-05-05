import { gsap } from 'gsap';

import { eventBus } from './eventBus';

const menuTl = gsap.timeline({ paused: true });

menuTl.set('#modal-offer', {
  display: 'flex',
});
menuTl.to('#modal-offer', {
  duration: 0.3,
  ease: "power3.out",
  y: 0,
  opacity: 1,
  display: 'flex',
  zIndex: 100,
  backgroundColor: 'rgba(0,0,0,0.9)',
});

const showModalAnimation = () => {
  menuTl.timeScale(1).play();
}

const hideModalAnimation = (afterCb) => {
  menuTl.timeScale(2).reverse().then(afterCb);
}

const setInitStyles = () => {
  gsap.set('#modal-offer', {
    display: 'none',
    opacity: 0,
    zIndex: -1,
  });
}

export const registerModalOffer = () => {
  setInitStyles();

  const elem = document.getElementById('modal-offer');

  eventBus.on('trigger-modal-offer', () => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
  
    eventBus.emit('show-modal', {
      name: 'offer',
      element: fragment,
      showAnim: showModalAnimation,
      hideAnim: hideModalAnimation,
    });
  });
}