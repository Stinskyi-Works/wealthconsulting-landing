import { gsap } from 'gsap';

import { eventBus } from './eventBus';

const menuTl = gsap.timeline({ paused: true });

menuTl.to('#modal-booking', {
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
  gsap.set('#modal-booking', {
    display: 'none',
    opacity: 0,
    zIndex: -1,
  });
}

export const registerModalBooking = () => {
  setInitStyles();

  const elem = document.getElementById('modal-booking');

  eventBus.on('booking-click', () => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
  
    eventBus.emit('show-modal', {
      name: 'booking',
      element: fragment,
      showAnim: showModalAnimation,
      hideAnim: hideModalAnimation,
    });
  });
}