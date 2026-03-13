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

    // --- 1. SIGN IN DRAWER LOGIC ---
    const authSidebar = document.getElementById('authSidebar');
    const authOverlay = document.getElementById('authOverlay');
    const closeAuthBtn = document.getElementById('closeAuth');

    // This grabs ANY button with the class 'login' OR the User Icon in the header
    const loginTriggers = document.querySelectorAll('.login, .fa-user');

    // Function to Open the Drawer
    const openAuthPanel = (e) => {
        e.preventDefault(); // Prevents the link from reloading the page
        if(authSidebar && authOverlay) {
            authSidebar.classList.add('active');
            authOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevents scrolling behind the menu!
        }
    };

    // Function to Close the Drawer
    const closeAuthPanel = () => {
        if(authSidebar && authOverlay) {
            authSidebar.classList.remove('active');
            authOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restores background scrolling
        }
    };

    // Attach the open event to all login buttons/icons
    loginTriggers.forEach(trigger => {
        // If clicking an icon inside a button, we target the closest parent button
        const target = trigger.closest('button') || trigger;
        target.addEventListener('click', openAuthPanel);
    });

    // Close when clicking the "X" button
    if(closeAuthBtn) {
        closeAuthBtn.addEventListener('click', closeAuthPanel);
    }

    // Close when clicking on the dark background overlay
    if(authOverlay) {
        authOverlay.addEventListener('click', closeAuthPanel);
    }

    // --- 2. SEARCH OVERLAY LOGIC ---
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchBtn = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    
    // Finds the magnifying glass icon in the header
    const searchTriggers = document.querySelectorAll('.fa-magnifying-glass');

    const openSearchPanel = (e) => {
        e.preventDefault();
        if(searchOverlay) {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Locks background scrolling
            
            // Automatically puts the blinking text cursor inside the input box after it slides down
            setTimeout(() => {
                searchInput.focus();
            }, 500); 
        }
    };

    const closeSearchPanel = () => {
        if(searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Unlocks background scrolling
        }
    };

    // Attach click events to the magnifying glass
    searchTriggers.forEach(trigger => {
        const target = trigger.closest('button') || trigger;
        target.addEventListener('click', openSearchPanel);
    });

    // Attach click event to the Close 'X' button
    if(closeSearchBtn) {
        closeSearchBtn.addEventListener('click', closeSearchPanel);
    }

    // BONUS: Allow the user to press the "Escape" key on their keyboard to close panels
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchPanel();
            
            // If you added the Auth Drawer earlier, this will close it too!
            const authOverlay = document.getElementById('authOverlay');
            const authSidebar = document.getElementById('authSidebar');
            if(authOverlay) authOverlay.classList.remove('active');
            if(authSidebar) authSidebar.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    });

    // --- 3. SHOPPING CART DRAWER LOGIC ---
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');
    const continueShoppingBtn = document.getElementById('continueShopping');
    
    // Finds the shopping bag icon in the header
    const cartTriggers = document.querySelectorAll('.fa-bag-shopping');

    const openCartPanel = (e) => {
        e.preventDefault();
        if(cartSidebar && cartOverlay) {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeCartPanel = (e) => {
        if(e) e.preventDefault();
        if(cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Attach click events to the shopping bag
    cartTriggers.forEach(trigger => {
        const target = trigger.closest('button') || trigger;
        target.addEventListener('click', openCartPanel);
    });

    // Close events
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCartPanel);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCartPanel);
    if(continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCartPanel);

    // Update the Escape key listener to close EVERYTHING
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const authOverlayEl = document.getElementById('authOverlay');
            const authSidebarEl = document.getElementById('authSidebar');
            const searchOverlayEl = document.getElementById('searchOverlay');
            
            if(authOverlayEl) authOverlayEl.classList.remove('active');
            if(authSidebarEl) authSidebarEl.classList.remove('active');
            if(searchOverlayEl) searchOverlayEl.classList.remove('active');
            
            closeCartPanel(); // Closes the cart
            
            document.body.style.overflow = ''; // Unlocks screen
        }
    });

    // --- 4. MOBILE HAMBURGER MENU LOGIC ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    const openMobileMenu = () => {
        if(mainNav && mobileOverlay) {
            mainNav.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMobileMenuPanel = () => {
        if(mainNav && mobileOverlay) {
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if(closeMobileMenu) closeMobileMenu.addEventListener('click', closeMobileMenuPanel);
    if(mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenuPanel);
    
});

// --- PAGE PRELOADER LOGIC ---
// We use window 'load' instead of 'DOMContentLoaded' because it waits 
// for ALL images, videos, and CSS to finish downloading completely!
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // We add a tiny 500ms delay so the user can actually see the 
        // premium loading screen even if they have super fast internet.
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Clean up: removes the preloader from the document flow 
            // after the 0.8s CSS fade animation finishes.
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); 
            
        }, 500); 
    }
});

