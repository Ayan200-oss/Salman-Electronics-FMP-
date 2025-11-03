// --- Mobile Menu Toggle Functions ---
        function Show() {
            const navList = document.getElementById('qa-nav-list-id');
            if (navList) {
                // Toggling the class defined in the custom CSS for mobile menu visibility
                navList.classList.add('qa-nav__list--show'); 
            }
        }
        
        function Hide() {
            const navList = document.getElementById('qa-nav-list-id');
            if (navList) {
                // Toggling the class defined in the custom CSS for mobile menu visibility
                navList.classList.remove('qa-nav__list--show'); 
            }
        }
        

        // --- INPUT PLACEHOLDER TYPING ANIMATION ---
    const searchInput = document.getElementById('qa-search-input');
    const fullPlaceholder = "Search for iPhone, Samsung, Xiaomi, etc..."; // The full text to type
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


        // --- Scroll Animation Setup (integrated from Canvas file) ---
        function setupScrollAnimations() {
            // Find all sections that should animate on scroll
            const sectionsToObserve = document.querySelectorAll('section');

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add the class to trigger the CSS transition
                        entry.target.classList.add('is-visible'); 
                        // Stop observing once the element is visible
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observerOptions = {
                root: null, 
                // Triggers 100px before the bottom of the viewport
                rootMargin: '0px 0px -100px 0px', 
                threshold: 0 
            };
            
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            
            sectionsToObserve.forEach(section => {
                observer.observe(section);
            });
        }




        // Set minimum times for loader display and modal delay
        const MINIMUM_LOADER_DISPLAY_TIME = 2000; // 2 seconds minimum for the loader
        const MODAL_DELAY_AFTER_LOADER = 1000;   // 1 second delay AFTER the loader is hidden
        const startTime = Date.now();
        
        // --- Main Initialization on Page Load (integrated from Canvas file) ---
        window.addEventListener("load", () => {
            const spinnerWrapper = document.getElementById("spinner");
            const welcomeModalElement = document.getElementById('welcomeModal');
            
            // 1. Loader Logic
            const elapsedTime = Date.now() - startTime;
            const loaderRemainingTime = MINIMUM_LOADER_DISPLAY_TIME - elapsedTime;
            
            setTimeout(() => {
                if (spinnerWrapper) {
                    spinnerWrapper.classList.add("hidden");
                }

                // 2. Modal Logic (Show the Modal after the loader is gone and delayed)
                setTimeout(() => {
                    // Check if Bootstrap is loaded before trying to use the Modal class
                    if (welcomeModalElement && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                        const welcomeModal = new bootstrap.Modal(welcomeModalElement);
                        welcomeModal.show();
                    }
                }, MODAL_DELAY_AFTER_LOADER);

            }, Math.max(0, loaderRemainingTime));
            
            // --- FAQ Toggle Logic (Integrated and improved) ---
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(item => {
                item.addEventListener('click', () => {
                    const faqItem = item.closest('.faq-item'); 
                    
                    if (faqItem) {
                        faqItem.classList.toggle('active');
                        
                        // Simple height toggle to enable CSS transition
                        const answer = faqItem.querySelector('.faq-answer');
                        if (answer) {
                            if (faqItem.classList.contains('active')) {
                                // Set max-height dynamically
                                answer.style.maxHeight = answer.scrollHeight + 50 + "px"; // Add buffer
                                answer.style.paddingTop = "1rem";
                            } else {
                                // Collapse
                                answer.style.maxHeight = "0";
                                answer.style.paddingTop = "0";
                            }
                        }
                    }
                });
            });
            
            // Initialize the FAQ answers to closed state (maxHeight: 0)
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                const answer = faqItem.querySelector('.faq-answer');
                if(answer) {
                    answer.style.maxHeight = '0';
                    answer.style.paddingTop = '0';
                }
            });

            // Call the Scroll Animation function
            setupScrollAnimations();
        });
