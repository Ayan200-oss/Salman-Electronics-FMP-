 // =================================================================
// 1. SPINNER, MODAL, and HERO TEXT ANIMATION
// =================================================================

// --- Constants ---
const MINIMUM_LOADER_DISPLAY_TIME = 1000; // 2 seconds minimum for the loader
const MODAL_DELAY_AFTER_LOADER = 1000;   // 1 second delay AFTER the loader is hidden
const startTime = Date.now();

window.addEventListener("load", () => {
    const spinnerWrapper = document.getElementById("spinner");
    const welcomeModalElement = document.getElementById('welcomeModal');
    // Ensure this class is applied to your main hero slogan container (e.g., slogan-container)
    const sloganContent = document.querySelector('.slogan-container'); 
    
    // 1. Loader Logic
    const elapsedTime = Date.now() - startTime;
    const loaderRemainingTime = MINIMUM_LOADER_DISPLAY_TIME - elapsedTime;
    
    setTimeout(() => {
        if (spinnerWrapper) {
            spinnerWrapper.classList.add("hidden");
        }

        // 2. Modal Logic (Unchanged)
        setTimeout(() => {
            if (welcomeModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const welcomeModal = new bootstrap.Modal(welcomeModalElement);
                welcomeModal.show();
            }
        }, MODAL_DELAY_AFTER_LOADER); 

    }, Math.max(0, loaderRemainingTime)); 
    
    
    // 3. Hero Text Animation Logic (Uses its own 'is-visible' class)
    if (sloganContent) {
        const observerOptions = {
            root: null, 
            // Ensures observer doesn't trigger immediately on page load, 
            // enabling animation only on actual scroll/visibility change.
            rootMargin: '0px 0px -200px 0px', 
            threshold: 0 
        };
        
        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible'); 
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        heroObserver.observe(sloganContent);
    }
    }
);



    // Updated ID reference
    var navList = document.getElementById("qa-nav-list-id");
    function Show() {
        navList.classList.add("qa-nav__list--show");
    }
    function Hide(){
        navList.classList.remove("qa-nav__list--show");
    }

    function myFunction() {
        var input, filter, ul, li, a, i;
        // Updated ID reference
        input = document.getElementById("qa-search-input"); 
        filter = input.value.toUpperCase();
        // Updated ID reference
        ul = document.getElementById("qa-search-list"); 
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (filter !== "" && a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "block"; // Show match
            } else {
                li[i].style.display = "none"; // Hide non-match/empty search
            }
        }
    }

   // --- INPUT PLACEHOLDER TYPING ANIMATION ---
    const searchInput = document.getElementById('qa-search-input');
    const fullPlaceholder = "Search iPhone, Samsung, Xiaomi, etc..."; // The full text to type
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Speed in milliseconds
    const pauseDuration = 2000; // Pause at the end before repeating

    function typePlaceholder() {
        // Determine the current text to display
        const currentText = fullPlaceholder.substring(0, charIndex);
        searchInput.setAttribute('placeholder', currentText);

        if (!isDeleting) {
            // Typing forward
            if (charIndex < fullPlaceholder.length) {
                charIndex++;
                setTimeout(typePlaceholder, typingSpeed);
            } else {
                // Done typing, start pause
                isDeleting = true;
                setTimeout(typePlaceholder, pauseDuration);
            }
        } else {
            // Deleting backward
            if (charIndex > 0) {
                charIndex--;
                setTimeout(typePlaceholder, typingSpeed / 2); // Faster deletion
            } else {
                // Done deleting, start typing again
                isDeleting = false;
                setTimeout(typePlaceholder, 500); // Short pause before re-typing
            }
        }
    }

    // Start the animation when the page loads
    if (searchInput) {
        typePlaceholder();
    }






 
// Configuration for the Intersection Observer
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        // Callback function to run when an intersection occurs
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in the viewport, trigger the animation
                    entry.target.classList.add('in-view');
                    // Stop observing this element once it's animated
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create the Intersection Observer instance
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Find all elements with the 'animate-on-scroll' class and observe them
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });

         

    