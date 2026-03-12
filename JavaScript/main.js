// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Grab all the elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const closeBtn = document.getElementById('close-btn');

    // 2. SAFETY CHECK: Only run the event listeners if the container actually exists on this page
    if (container) {
        
        // Handle Sign Up click
        if (signUpButton) {
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
            });
        }

        // Handle Sign In click
        if (signInButton) {
            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
            });
        }

        // Handle Close Button click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Using a CSS class to hide things is usually cleaner than inline styles,
                // but this keeps your original logic perfectly intact!
                container.style.display = 'none'; 
            });
        }
    }

    // --- SCROLL REVEAL ANIMATION ---
    // 1. Find all elements we want to animate
    const revealElements = document.querySelectorAll('.reveal-up');

    // 2. Create the observer (the "watcher")
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element has scrolled into the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Trigger the CSS animation
                observer.unobserve(entry.target);     // Stop watching it so it only animates once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the very bottom of the screen
    });

    // 3. Tell the observer to watch every element we found
    revealElements.forEach(el => revealObserver.observe(el));

    // --- DYNAMIC STICKY HEADER ---
    const header = document.querySelector('.main-header');
    
    // Listen for the user scrolling
    window.addEventListener('scroll', () => {
        // If they scroll down more than 50 pixels
        if (window.scrollY > 50) {
            header.classList.add('scrolled'); // Add the frosted glass class
        } else {
            header.classList.remove('scrolled'); // Remove it if they are at the top
        }
    });

    // You can safely add more JavaScript for the homepage down here later!
});