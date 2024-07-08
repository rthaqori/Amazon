document.addEventListener('DOMContentLoaded', function() {
    const mediaSlide = document.querySelector('.desktop-banner');
    const images = document.querySelectorAll('.desktop-banner a');
    const navLinks = document.querySelectorAll('.banner-nav a');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentIndex = 0;
    let slideInterval;
    let isUserScrolling = false;
    const scrollAmount = mediaSlide.scrollWidth / images.length;

    function slideImages() {
        if (!isUserScrolling) {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            mediaSlide.scrollTo({
                left: currentIndex * scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(slideImages, 5000);
    }

    function updateCurrentIndex() {
        const scrollLeft = mediaSlide.scrollLeft;
        currentIndex = Math.round(scrollLeft / scrollAmount);
    }

    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = index;
            mediaSlide.scrollTo({
                left: currentIndex * scrollAmount,
                behavior: 'smooth'
            });
            isUserScrolling = true;
            resetSlideInterval();
            setTimeout(() => isUserScrolling = false, 500);
        });
    });

    let userScrollTimeout;
    mediaSlide.addEventListener('scroll', function() {
        clearTimeout(userScrollTimeout);
        isUserScrolling = true;
        updateCurrentIndex();
        resetSlideInterval();
        userScrollTimeout = setTimeout(() => isUserScrolling = false, 500);
    });

    leftBtn.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        mediaSlide.scrollTo({
            left: currentIndex * scrollAmount,
            behavior: 'smooth'
        });
        isUserScrolling = true;
        resetSlideInterval();
        setTimeout(() => isUserScrolling = false, 500);
    });

    rightBtn.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        mediaSlide.scrollTo({
            left: currentIndex * scrollAmount,
            behavior: 'smooth'
        });
        isUserScrolling = true;
        resetSlideInterval();
        setTimeout(() => isUserScrolling = false, 500);
    });

    // Start the automatic sliding
    slideInterval = setInterval(slideImages, 5000);

    // Intersection Observer for active class
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe each image
    images.forEach(image => {
        observer.observe(image);
    });
});
