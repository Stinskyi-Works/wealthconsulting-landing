import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { eventBus } from './eventBus';

let menuOpen = false;
const hamburgerElem = document.getElementById('hamburger');

const onBooking = () => {
  eventBus.emit('booking-click');
  menuOpen = true;

  hamburgerElem.classList.add('active');
}
const onMenu = () => {
  if (menuOpen) {
    eventBus.emit('hide-modal', {
      name: 'current',
    });
  } else {
    eventBus.emit('menu-click');
  }

  menuOpen = !menuOpen;

  if (menuOpen) {
    hamburgerElem.classList.add('active');
  } else {
    hamburgerElem.classList.remove('active');
  }
}

const onYoutubeOpenChannel = () => {
  window.open('https://www.youtube.com/@WealthConsultingLLC');
}

export const registerButtons = () => {
  document.getElementById('hero-book-call')?.addEventListener('click', onBooking);
  document.getElementById('services-book-call')?.addEventListener('click', onBooking);
  document.getElementById('services-vip-book-call')?.addEventListener('click', onBooking);
  document.getElementById('header-book-call')?.addEventListener('click', onBooking);
  document.getElementById('mobile-menu-book-call')?.addEventListener('click', onBooking);
  document.getElementById('menu-btn')?.addEventListener('click', onMenu);
  document.getElementById('youtube-book-call')?.addEventListener('click', onBooking);
  document.getElementById('youtube-open-channel')?.addEventListener('click', onYoutubeOpenChannel);
  document.getElementById('reviews-book-call')?.addEventListener('click', onBooking);
  document.getElementById('offer-book-call')?.addEventListener('click', onBooking);
  document.getElementById('footer-book-call')?.addEventListener('click', onBooking);

  gsap.registerPlugin(ScrollToPlugin);

  gsap.utils.toArray(["#header a", "#footer a"]).forEach((item, index) => {
    item.addEventListener("click", (event) => {
      let target = event.target;
      let hash = target.hash;
      
      if (!hash) {
        return;
      }
      
      event.preventDefault();
  
      gsap.to(window, {
        duration: 1,
        scrollTo: hash,
        ease: "Power1.easeInOut"
      });
    });
  });

  gsap.utils.toArray("#mobile-menu-links a").forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      eventBus.emit('hide-modal', {
        name: 'current',
        afterCb: () => {
          let target = event.target;
          let hash = target.hash;
      
          gsap.to(window, {
            duration: 1,
            scrollTo: hash,
            ease: "Power1.easeInOut"
          });
        },
      });
    });
  });
}