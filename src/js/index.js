import '../css/global.css';
import '../scss/global.scss';

import { registerYoutube } from './youtube';
import { registerHeader } from './header';
import { registerHero } from './hero';
import { registerServices } from './services';
// import { registerReviews } from './reviews';
// import { registerQnA } from './qna';
import { registerOffer } from './offer';
import { registerFooter } from './footer';
import { registerAboutUs } from './aboutus';
import { registerModal } from './modal';
import { registerModalMobileMenu } from './modalMobileMenu';
import { registerModalBooking } from './modalBooking';
import { registerModalOffer } from './modalOffer';
import { registerButtons } from './buttons';

document.addEventListener('DOMContentLoaded', () => {
  registerHeader();
  registerHero();
  registerServices();
  registerYoutube();
  registerAboutUs();
  // registerReviews();
  // registerQnA();
  registerOffer();
  registerFooter();
  registerModal();
  registerModalMobileMenu();
  registerModalBooking();
  registerModalOffer();
  registerButtons();
});
