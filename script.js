'use strict';

// PRELOAD ============================================================================
// Loading will end after document is loaded

const preloader = document.querySelector("[data-preload]");
window.addEventListener('load', () => {
    preloader.classList.add('loaded')
    document.body.classList.add('loaded')
});

//==========================================================================================

// #add event listener on multiple elements

const addEventOnElements = (elements, eventType, callback) => {
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// # NAVBAR ===============================================================================

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
    navbar.classList.add('active')
    overlay.classList.add('active')
    document.body.classList.toggle('nav-active')
}

addEventOnElements(navTogglers, 'click', toggleNavbar);

let closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    navbar.classList.remove('active')
    overlay.classList.remove('active')
});

// # HEADER AND BACK TO TOP BTN ============================================================

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector('[data-back-top-btn]');


let lastScrollPosition = 0;

const hideHeader = () => {
    // const isScrollBottom = lastScrollPosition < window.scrollY;
    if(lastScrollPosition < window.scrollY) {
        header.classList.add('hide')
        backTopBtn.classList.add('active')
    }else{
        header.classList.remove('hide')
        backTopBtn.classList.remove('active')
    }

    lastScrollPosition = window.scrollY;
}

window.addEventListener('scroll', () => {
    if(window.scrollY >= 50) {
        header.classList.add('active')
        hideHeader()
    }else {
        header.classList.remove('active')
    }
})

// =================================================================================
// ================= HERO SLIDER ==================

const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSlidesPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSlidesPos = () => {
    lastActiveSliderItem.classList.remove('active')
    heroSliderItems[currentSlidesPos].classList.add('active')
    lastActiveSliderItem = heroSliderItems[currentSlidesPos]
}

const slideNext = () => {
    if(currentSlidesPos >= heroSliderItems.length -1) {
        currentSlidesPos = 0;
    }else {
        currentSlidesPos++
    }
    
    updateSlidesPos()
}

heroSliderNextBtn.addEventListener('click', slideNext)

const slidePrev = () => {
    if(currentSlidesPos <= 0) {
        currentSlidesPos = heroSliderItems.length -1;
    }else {
        currentSlidesPos--
    }

    updateSlidesPos()
}

heroSliderPrevBtn.addEventListener('click', slidePrev)

// =============== AUTO SLIDE ===============

let autoSlideInterval;

const autoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slideNext()
    }, 7000)
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', () => {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseout', autoSlide)

window.addEventListener('load', autoSlide)

// ============================  PARALLAX EFFECT ==================================

const parallaxItems = document.querySelectorAll('[data-parallax-item]')
let x, y;

window.addEventListener('mousemove', (event) => {
    x = (event.clientX / window.innerWidth * 10) -5;
    y = (event.clientY / window.innerHeight * 10) -5;

    // reverse the number eg. 20 --> -20, 5 --> 5

    x = x - (x * 2);
    y = y - (y * 2);
    for(let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }
});