
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';




const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  speed: 200,
  centeredSlides: true,
  loop: true,
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});