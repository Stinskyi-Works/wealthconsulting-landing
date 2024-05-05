import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { eventBus } from './eventBus';

let MENU_OPEN = false;
let scroll = 0;
let direction = 0;
let manuallyShownHeader = false;

const hideHeader = () => {
  const header = document.querySelector('header');
  const headerWrapper = document.getElementById('header');
  
  manuallyShownHeader = false;

  if (scroll > window.innerHeight) {
    gsap.to(header, {
      yPercent: -100,
      duration: 0.3,
      height: 'auto',
      position: 'fixed',
    });
  } else {
    gsap.to(header, {
      duration: 0.3,
      height: 'auto',
      position: 'absolute',
    });
  }

  gsap.to(headerWrapper, {
    backgroundColor: 'rgba(0,0,0,0)',
    duration: 0.3,
  });
}

const showHeader = () => {
  const header = document.querySelector('header');
  const headerWrapper = document.getElementById('header');
  
  manuallyShownHeader = true;
  
  gsap.to(header, {
    yPercent: 0,
    duration: 0.3,
    height: '100vh',
    position: 'fixed',
  });
  gsap.to(headerWrapper, {
    backgroundColor: 'rgba(0,0,0,0.9)',
    duration: 0.3,
  });
};

const showCloseBtn = () => {
  if (window.innerWidth > 900) {
    gsap.set('#menu-btn', {
      display: 'flex',
    });
    gsap.set('#menu-large-content', {
      display: 'none',
    });
  }
}

const hideCloseBtn = () => {
  const hamburgerElem = document.getElementById('hamburger');

  if (window.innerWidth > 900) {
    gsap.set('#menu-btn', {
      display: 'none',
    });
    gsap.set('#menu-large-content', {
      display: 'flex',
    });
  } else {
    hamburgerElem.classList.remove('active');
  }
}

export const registerHeader = () => {
  gsap.registerPlugin(ScrollTrigger);
  const header = document.querySelector('header');
  const headerWrapper = document.getElementById('header');
  let heroVisible = true;

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      direction = self.direction;
      scroll = self.end * self.progress;

      if (manuallyShownHeader) {
        return;
      }

      if (!MENU_OPEN) {
        if (self.end * self.progress > window.innerHeight) {
          if (self.direction === -1) {
            gsap.to(header, {
              yPercent: 0,
              duration: 0.3,
            });
            gsap.set(headerWrapper, {
              backgroundColor: 'rgba(0,0,0,0.9)',
            });
          } else {
            gsap.set(header, {
              height: 'auto',
              position: 'fixed',
            });
            gsap.set(headerWrapper, {
              backgroundColor: 'rgba(0,0,0,0.9)',
            });
            
            if (heroVisible) {
              gsap.set(header, {
                yPercent: -100,
                duration: 0.3,
              });
            } else {
              gsap.to(header, {
                yPercent: -100,
                duration: 0.3,
              });
            }
          }

          heroVisible = false;
        } else {
          gsap.set(header, {
            position: 'absolute',
            yPercent: 0,
            height: 'auto',
          });
          gsap.set(headerWrapper, {
            backgroundColor: 'rgba(0,0,0,0)',
          });

          heroVisible = true;
        }
      }
    }
  });

  eventBus.on('show-header', showHeader);
  eventBus.on('hide-header', hideHeader);
  eventBus.on('show-close-btn', showCloseBtn);
  eventBus.on('hide-close-btn', hideCloseBtn);
}