// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

// Hero slider
const slides = document.querySelectorAll('.slide');
let current = 0;
const intervalTime = 5000;
let slideInterval;

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
}
function nextSlide() { current = (current + 1) % slides.length; showSlide(current); }
function prevSlide() { current = (current - 1 + slides.length) % slides.length; showSlide(current); }
document.querySelector('.next').addEventListener('click', () => { nextSlide(); resetInterval(); });
document.querySelector('.prev').addEventListener('click', () => { prevSlide(); resetInterval(); });
function startSlideShow() { slideInterval = setInterval(nextSlide, intervalTime); }
function resetInterval() { clearInterval(slideInterval); startSlideShow(); }
showSlide(current); startSlideShow();


$(document).ready(function(){
  // Projects carousel
  $('.projects-carousel').slick({
    slidesToShow: 3,        // show 3 projects at once
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseonHover: false,
    pauseonFocus:false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  });

  // Instagram carousel
  $('.insta-carousel').slick({
    slidesToShow: 4,        // show 4 insta posts at once
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: false,
    autoplay: false,
    // autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });
});


// Lightbox for Projects
const projectImages = document.querySelectorAll('.projects-carousel .carousel-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = projectImages[index];
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.alt;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.classList.remove('show');
  setTimeout(() => {
    lightbox.style.display = 'none';
  }, 300);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % projectImages.length;
  openLightbox(currentIndex);
}

projectImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

function makeCarouselInfinite(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const items = [...container.children];
  items.forEach((item, index) => {
    const clone = item.cloneNode(true);
    const img = clone.querySelector('img');
    if (img) img.style.pointerEvents = "none"; 
    container.appendChild(clone);
  });

  container.addEventListener('scroll', () => {
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }
  });
}

makeCarouselInfinite('.insta-carousel');

function autoScrollCarousel(selector, speed = 0.7) {
  const container = document.querySelector(selector);
  if (!container) return;

  let scrollAmount = 0;
  function step() {
    container.scrollLeft += speed;
    scrollAmount += speed;

    // reset to start when reaching the end
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0;
    }
    requestAnimationFrame(step);
  }
  step();
}

// Apply to Projects + Instagram
autoScrollCarousel('.projects-carousel', 0.7); 
autoScrollCarousel('.insta-carousel', 0.5);  