import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const setInitStyles = () => {
  gsap.utils.toArray(".accordion").forEach((elem) => {
    Array.from(elem.children).forEach((child) => {
      const type = child.getAttribute('data-type');

      if (type === 'head') {
        Array.from(child.children).forEach((ch) => {
          const t = ch.getAttribute('data-type');

          if (t === 'icon') {
            gsap.to(ch, {
              rotateZ: -90,
              duration: 0.3,
            });
          }
        });
      } else if (type === 'body') {
        gsap.set(child, {
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        });

        Array.from(child.children).forEach((ch) => {
          gsap.set(ch, {
            opacity: 0,
          });
        });
      }
    });

    // gsap.set(elem, {
    //   duration: 0.3,
    //   ease: "power3.in",
    //   opacity: 0,
    //   y: -32,
    // });
  });
}

const registerScrollTriggerStyles = () => {
  const statesOpened = new Map();
  
  gsap.utils.toArray(".accordion").forEach((elem) => {
    const tl = gsap.timeline({ paused: true });
    
    Array.from(elem.children).forEach((child) => {
      const type = child.getAttribute('data-type');
      statesOpened.set(child, false);

      if (type === 'head') {
        child.onclick = () => {
          let opened = statesOpened.get(child);
          opened = !opened;
          statesOpened.set(child, opened);
          
          if (opened) {

            tl.play();
          } else {
            tl.reverse();
          }

          Array.from(child.children).forEach((ch) => {
            const t = ch.getAttribute('data-type');

            if (t === 'icon') {
              if (opened) {
                gsap.to(ch, {
                  rotateZ: 0,
                  duration: 0.3,
                });
              } else {
                gsap.to(ch, {
                  rotateZ: -90,
                  duration: 0.3,
                });
              }
            }
          });
        }
      } else if (type === 'body') {
        tl.to(child, {
          duration: 0.3,
          height: 'auto',
          opacity: 1,
        });

        Array.from(child.children).forEach((ch) => {
          tl.to(ch, {
            duration: 0.3,
            opacity: 1,
          });
        });
      }
    });
  });

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.qna',
  //     start: 'top 80%',
  //     toggleActions: 'play pause resume reverse',
  //   }
  // });

  // tl.to(`.accordion`, {
  //   duration: 0.3,
  //   ease: "power3.in",
  //   opacity: 1,
  //   y: 0,
  //   stagger: {
  //     each: 0.3,
  //   }
  // });
}

export const registerQnA = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  registerScrollTriggerStyles();
}