import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


const cid = "UCmosAKEUsLJie7YglitEWnA";
const channelURL = encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`
);
const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;


const fetchYoutubeVideos = async () => {
  return new Promise((resolve, reject) => {

    fetch(reqURL)
      .then((response) => response.json())
      .then((result) => {
        resolve(result.items);
      })
      .catch((error) => reject(error));
  });
}

const getVideoId = (video) => video?.guid?.split(":")[2] ?? "";

const injectIframes = (videos) => {
  const containerElems = document.querySelectorAll('.youtube .video-container');
  const titleElems = document.querySelectorAll('.youtube .title');

  containerElems?.forEach((elem, index) => {
    if (videos[index]) {
      const extra = index === 1 ? '&autoplay=1' : '';
      const ifrm = document.createElement("iframe");
      ifrm.setAttribute("src", `https://www.youtube.com/embed/${getVideoId(videos[index])}?mute=1&${extra}`);
      ifrm.classList.add('frame');
      ifrm.setAttribute('allow', 'autoplay; encrypted-media');
      ifrm.setAttribute('allowfullscreen', '');
      elem.appendChild(ifrm);

      console.log(videos[index].title)
      const textElem = document.createTextNode(videos[index]?.title || '');
      titleElems[index].appendChild(textElem);
    }
  });
}

export const injectYoutubeVideos = async () => {
  try {
    const videos = await fetchYoutubeVideos();

    injectIframes(videos);
  } catch (error) {
    console.log(error);
  }
}

const setInitStyles = () => {
  new Swiper(".youtube-swiper", {
    modules: [ Autoplay, Navigation],
    initialSlide: 1,
    loop: false,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    speed: 1000,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      699: {
        slidesPerView: 2,
      },
      899: {
        slidesPerView: 2,
      },
    }
  });

  gsap.set(['.youtube .youtube-card', '.youtube .button-container button'], {
    opacity: 0,
    y: 32,
  });
}

const registerScrollTriggerStyles = () => {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.services',
      start: 'bottom 80%',
      toggleActions: 'play play resume reverse',
    }
  }).to('.youtube .youtube-card', {
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
      trigger: '.youtube .youtube-swiper-container',
      start: 'bottom 80%',
      toggleActions: 'play play resume reverse',
    }
  }).to('.youtube .button-container button', {
    duration: 0.3,
    ease: "power3.in",
    opacity: 1,
    y: 0,
    stagger: {
      each: 0.3,
    }
  });
}

export const registerYoutube = () => {
  gsap.registerPlugin(ScrollTrigger);

  setInitStyles();
  registerScrollTriggerStyles();
  injectYoutubeVideos();
}