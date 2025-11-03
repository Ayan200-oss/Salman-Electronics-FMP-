

// =================================================================
// 1. SPINNER, MODAL, and HERO TEXT ANIMATION
// =================================================================

// --- Constants ---
const MINIMUM_LOADER_DISPLAY_TIME = 2000; // 2 seconds minimum for the loader
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

         // <--- CRITICAL INSERTION POINT: WhatsApp Timer Starts Here! --->
                    if (typeof window.startWhatsappTimer === 'function') {
                        window.startWhatsappTimer(); 
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

    
    
    
    // =================================================================
    // 2. GENERAL SCROLL REVEAL ANIMATION (FOR ALL .scroll-hidden elements)
    // =================================================================

    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For regular elements (titles, wrappers, etc.)
                entry.target.classList.add('scroll-reveal');
                entry.target.classList.remove('scroll-hidden');
                
                // Stop observing standard elements
                if (!entry.target.classList.contains('card-grid')) {
                    generalObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        root: null, 
        rootMargin: '0px 0px -15% 0px', // Trigger when 15% from the bottom of the viewport
        threshold: 0.1 
    });

    // Observe all elements that should animate (e.g., titles, wrappers)
    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach(el => generalObserver.observe(el));


    // 3. SPECIAL LOGIC FOR STAGGERED PRODUCT CARDS
    const cardGrid = document.querySelector('.card-grid');

    if (cardGrid) {
        // Create a separate observer specifically for the card grid container
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.card');
                    
                    cards.forEach((card, index) => {
                        // Apply a delay based on its position in the grid
                        card.style.transitionDelay = `${index * 0.1}s`;
                        card.classList.add('scroll-reveal');
                    });
                    
                    // Stop observing the grid container once cards are revealed
                    gridObserver.unobserve(entry.target);
                    
                    // Also unobserve the grid from the general observer if it was tracked
                    generalObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -20% 0px' }); // Trigger the grid slightly sooner

        gridObserver.observe(cardGrid);
    }
});


// =================================================================
// 3. COMPANY LOGO AUTO SCROLLING CODE
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('brands-container');
    const leftBtn = document.getElementById('scroll-left-btn');
    const rightBtn = document.getElementById('scroll-right-btn');
    
    // Check if the required elements exist
    if (!container || !leftBtn || !rightBtn) return;

    const scrollAmount = 300; // Manual scroll distance
    const autoScrollStep = 1; // Pixels per interval (speed)
    const autoScrollInterval = 20; // Time in ms (lower = smoother/faster animation)
    const transitionDuration = 3000; // Time to wait before resuming auto-scroll
    const totalUniqueCards = 7; // NOTE: Reverting to 7 unique cards for safety. Adjust if you truly duplicated them to 14.
    let scrollTimer;

    // --- Auto Scroll Loop ---
    const startAutoScroll = () => {
        clearInterval(scrollTimer); 
        
        scrollTimer = setInterval(() => {
            // Check if scroll is near the end
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                
                const firstCard = container.querySelector('.brand-card');
                if (firstCard) {
                    // Calculating jump distance based on card width
                    const cardWidth = firstCard.offsetWidth + 
                                    parseInt(window.getComputedStyle(firstCard).marginRight || 0) + 
                                    parseInt(window.getComputedStyle(firstCard).marginLeft || 0);
                    
                    // Jump back by the length of the UNIQUE set of cards
                    container.scrollLeft -= (totalUniqueCards * cardWidth);
                } else {
                    container.scrollLeft = 0;
                }
            } else {
                // Normal auto-scroll movement
                container.scrollLeft += autoScrollStep;
            }
        }, autoScrollInterval);
    };

    const stopAutoScroll = () => {
        clearInterval(scrollTimer);
    };

    // --- Interaction Handlers (Pause on Hover/Touch, Manual Arrow Movement) ---

    // Look for the closest wrapper that handles the hover/touch
    const carouselArea = container.closest('.group') || container; 
    carouselArea.addEventListener('mouseenter', stopAutoScroll);
    carouselArea.addEventListener('mouseleave', startAutoScroll);
    carouselArea.addEventListener('touchstart', stopAutoScroll);
    carouselArea.addEventListener('touchend', () => {
        setTimeout(startAutoScroll, transitionDuration);
    });

    leftBtn.addEventListener('click', () => {
        stopAutoScroll(); 
        container.scrollLeft -= scrollAmount;
        setTimeout(startAutoScroll, transitionDuration);
    });

    rightBtn.addEventListener('click', () => {
        stopAutoScroll(); 
        container.scrollLeft += scrollAmount;
        setTimeout(startAutoScroll, transitionDuration);
    });
    
    // Start the auto-scroll when the page loads
    startAutoScroll();
});

// Company Logo auto Scrolling Code Ends









