// Select DOM elements
const slideContainer = document.querySelector('.container');
const slides = document.querySelector('.slides');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Use let for variables that will change
let slideElements = document.querySelectorAll('.slide');
let index = 1;
let slideId;
const interval = 3000;

// Function to get fresh slide elements (needed after cloning)
const getSlides = () => document.querySelectorAll('.slide');

// Clone first and last slides for infinite effect
const firstClone = slideElements[0].cloneNode(true);
const lastClone = slideElements[slideElements.length - 1].cloneNode(true);

// Assign IDs to cloned elements
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

// Append clones to slides
slides.appendChild(firstClone);
slides.prepend(lastClone);

// Calculate slide width and set initial position
const slideWidth = getSlides()[index].clientWidth;
slides.style.transform = `translateX(${-slideWidth * index}px)`;

// Auto-slide functionality
const startSlide = () => {
    slideId = setInterval(() => {
        moveToNextSlide();
    }, interval);
};

// Move to next slide
const moveToNextSlide = () => {
    const slides = getSlides();
    if (index >= slides.length - 1) return;
    
    index++;
    const slideWidth = slides[index].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(${-slideWidth * index}px)`;
};

// Move to previous slide
const moveToPreviousSlide = () => {
    const slides = getSlides();
    if (index <= 0) return;
    
    index--;
    const slideWidth = slides[index].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(${-slideWidth * index}px)`;
};

// Handle infinite loop transitions
slides.addEventListener('transitionend', () => {
    const slides = getSlides();
    
    if (slides[index].id === 'first-clone') {
        document.querySelector('.slides').style.transition = 'none';
        index = 1;
        const slideWidth = slides[index].clientWidth;
        document.querySelector('.slides').style.transform = `translateX(${-slideWidth * index}px)`;
    }
    
    if (slides[index].id === 'last-clone') {
        document.querySelector('.slides').style.transition = 'none';
        index = slides.length - 2;
        const slideWidth = slides[index].clientWidth;
        document.querySelector('.slides').style.transform = `translateX(${-slideWidth * index}px)`;
    }
    
    document.querySelector('.slides').style.transition = '0.7s';
});

// Event listeners for manual navigation
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

// Pause on hover
slideContainer.addEventListener('mouseenter', () => {
    clearInterval(slideId);
});

// Resume on mouse leave
slideContainer.addEventListener('mouseleave', startSlide);

// Start the slider
startSlide();