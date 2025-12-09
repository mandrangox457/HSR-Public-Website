document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the necessary elements from the HTML
    const track = document.querySelector('.carousel-track');
    // Check if the track element exists before proceeding
    if (!track) return; 
    
    const slides = Array.from(document.querySelectorAll('.roadmap-slide'));
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const totalSlides = slides.length;
    
    let currentSlideIndex = 0;
    
    // Function to move the carousel track
    const moveToSlide = (index) => {
        // Calculate the amount to translate (move left) the track.
        // The movement is based on the slides' width (100% of the container)
        const amountToMove = index * 100;
        track.style.transform = `translateX(-${amountToMove}%)`;
    };
    
    // Function to handle moving to the next slide
    const handleNextClick = () => {
        // Increment the index, and loop back to 0 if it exceeds the total number of slides
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
        } else {
            currentSlideIndex = 0; // Loop back to the first slide
        }
        moveToSlide(currentSlideIndex);
    };
    
    // Function to handle moving to the previous slide
    const handlePrevClick = () => {
        // Decrement the index, and jump to the last slide if it goes below 0
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
        } else {
            currentSlideIndex = totalSlides - 1; // Loop back to the last slide
        }
        moveToSlide(currentSlideIndex);
    };

    // 2. Attach event listeners to the buttons
    if (nextButton) nextButton.addEventListener('click', handleNextClick);
    if (prevButton) prevButton.addEventListener('click', handlePrevClick);
    
    // (Optional) Implement basic touch/swipe functionality for mobile
    let touchstartX = 0;
    let touchendX = 0;

    const handleGesture = () => {
        // Check if the swipe was a significant distance (e.g., more than 50 pixels)
        const swipeDistance = touchstartX - touchendX;
        
        if (swipeDistance > 50) {
            handleNextClick();
        } else if (swipeDistance < -50) {
            handlePrevClick();
        }
    };
    
    track.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    // 3. Initialize the position (ensure the first slide is visible on load)
    moveToSlide(currentSlideIndex);
});