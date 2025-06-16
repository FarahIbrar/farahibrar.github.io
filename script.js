//Dark/light Mode Icon
// Theme toggle with pre-rendering prevention
let themeTransitionInProgress = false;

function toggleTheme() {
    if (themeTransitionInProgress) return;
    themeTransitionInProgress = true;
    
    // Disable transitions during the switch
    document.documentElement.classList.add('no-transitions');
    
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const isNowLight = body.classList.toggle('light');
    icon.className = isNowLight ? 'fas fa-moon' : 'fas fa-sun';
    
    // Force synchronous layout calculation
    void body.offsetWidth;
    
    // Re-enable transitions after a minimal delay
    setTimeout(() => {
        document.documentElement.classList.remove('no-transitions');
        themeTransitionInProgress = false;
    }, 10);
}

// Initialize theme icon
window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = 'fas fa-sun';
    }
    
    // Add no-transitions class initially to prevent flash on load
    document.documentElement.classList.add('no-transitions');
    setTimeout(() => {
        document.documentElement.classList.remove('no-transitions');
    }, 500);
});
    
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('DOMContentLoaded', handleScrollAnimations);

document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const nextSection = document.querySelector('.about-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
    
// Progress dots //
document.addEventListener("DOMContentLoaded", function() {
    // Check if dots already exist
    if (document.querySelector('.progress-indicator')) return;
    
    // Create progress dots container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-indicator';
    progressContainer.innerHTML = '<div class="progress-dots"></div>';
    document.body.appendChild(progressContainer);
    
    // Initialize dots
    const sections = document.querySelectorAll(".scroll-page");
    const dotsContainer = document.querySelector(".progress-dots");
    
    sections.forEach((section, index) => {
        const dot = document.createElement("div");
        dot.className = "progress-dot";
        dot.addEventListener("click", () => {
            window.scrollTo({
                top: section.offsetTop - 20,
                behavior: "smooth"
            });
        });
        dotsContainer.appendChild(dot);
    });
    
    // Update active dot
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(sections).indexOf(entry.target);
            const dots = document.querySelectorAll(".progress-dot");
            if (entry.isIntersecting) {
                dots[index].classList.add("active");
            } else {
                dots[index].classList.remove("active");
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: "-20px 0px -20px 0px"
    });
    
    sections.forEach(section => observer.observe(section));
});


//For the Form messages
const form = document.querySelector("#contactForm");
const modalContent = document.querySelector(".modal-content");
const originalForm = form.innerHTML; // just the inner form, not entire modal

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(form).entries());
    
    try {
        const res = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (!res.ok) throw new Error("Formspark rejected the submission");
        
        modalContent.innerHTML = `
        <div style="text-align: center; font-size: 1.2rem; padding: 2rem;">
            ✅ Message sent, I'll get back to you shortly!
            </div>`;
        } catch (err) {
            modalContent.innerHTML = `
            <div style="text-align: center; font-size: 1.2rem; padding: 2rem; color: red;">
                ❌ Failed to send message. Please try again.
                </div>`;
            }
            
    setTimeout(() => {
        document.getElementById("contactModal").style.display = "none";
        modalContent.innerHTML = `
        <span class="close" onclick="document.getElementById('contactModal').style.display='none'">&times;</span>
        <h3 style="animation: fadeInSlide 0.8s ease-out;">Let's Work Together</h3>
        <p style="margin-top: -0.5rem; font-size: 0.85rem; animation: fadeInSlide 1.2s ease-out;">
            I'm always open to discussing new projects, job opportunities, or partnerships. Feel free to reach out using the form below or through my social channels.
            </p>
            
            <form id="contactForm" action="https://submit-form.com/s1eLtaukd" method="POST">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your Email Address" required>
            <textarea name="message" rows="5" placeholder="Tell me about your project or job opportunity..." required></textarea>
            <button type="submit">Send Message →</button>
            </form>
            `;
            
    eval(document.currentScript.textContent);
}, 3000);
});


//For the progress dots
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".scroll-page");
    const dotsContainer = document.querySelector(".progress-dots");
    const pageContainer = document.querySelector(".page-container");
    
    // Create minimal dots
    sections.forEach((section, index) => {
        const dot = document.createElement("div");
        dot.className = "progress-dot";
        dot.addEventListener("click", (e) => {
            // Prevent any default behaviour
            e.preventDefault();
            e.stopPropagation();
            
            // Get the section's position and add offset to show the title
            const sectionTop = section.offsetTop;
            const offset = 80;
            
            // Scroll the page container (not window) with offset to ensure title is visible
            pageContainer.scrollTo({
                top: sectionTop - offset,
                behavior: "smooth"
            });
        });
        dotsContainer.appendChild(dot);
    });

    // Update active dot with intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(sections).indexOf(entry.target);
            const dots = document.querySelectorAll(".progress-dot");
            
            if (entry.isIntersecting) {
                dots[index].classList.add("active");
            } else {
                dots[index].classList.remove("active");
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "-20px 0px -20px 0px", // Prevents pushing content up
        root: pageContainer // Set the scrolling container as the root
    });

    sections.forEach(section => observer.observe(section));
});

// Remove from the last page
const lastSection = document.querySelector('.contact-section');
const progressContainer = document.querySelector('.progress-indicator');

if (lastSection && progressContainer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            progressContainer.style.opacity = entry.isIntersecting ? '0' : '1';
            progressContainer.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
    }, { 
        threshold: 0.5,
        root: document.querySelector(".page-container") // Also fix this observer
    });
    
    observer.observe(lastSection);
}


//For the Animation effects on all pages
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Remove the class when element leaves viewport
                    entry.target.classList.remove('visible'); 
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Smaller margin makes it trigger sooner
        });
    
        elements.forEach(element => {
            // Initialize as not visible
            element.classList.remove('visible');
            observer.observe(element);
        });
    }
    
    // Modify existing DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", function() {        
        
        // Initialize scroll animations
        animateOnScroll();
        
        // Retrigger on theme changes
        document.querySelector('.theme-toggle').addEventListener('click', function() {
            setTimeout(animateOnScroll, 300);
        });
    });


// Outlier detection and Copy Button functions
    function setupCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-button');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeBlock = this.closest('.code-container')?.querySelector('.code-block') || 
                                this.closest('.horizontal-code-container')?.querySelector('.code-block');
                const codeText = codeBlock.textContent;
                
                navigator.clipboard.writeText(codeText).then(() => {
                    const icon = this.querySelector('i');
                    const originalClass = icon.className;
                    icon.className = 'fas fa-check';
                    
                    setTimeout(() => {
                        icon.className = originalClass;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        });
    }
    
    function setupOutlierDemo() {
        const detectBtn = document.getElementById('detect-btn');
        if (!detectBtn) return;
        
        detectBtn.addEventListener('click', function() {
            const input = document.getElementById('data-input').value;
            const resultsContainer = document.getElementById('modal-results');
            const modal = document.getElementById('results-modal');
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            this.disabled = true;
            
            // Small delay for better UX
            setTimeout(() => {
                try {
                    const data = input.split(',')
                        .map(item => parseFloat(item.trim()))
                        .filter(item => !isNaN(item));
                    
                    if (data.length === 0) {
                        resultsContainer.innerHTML = '<span class="error">Please enter valid numbers</span>';
                        modal.style.display = 'flex';
                        return;
                    }
                    
                    const outliers = detectOutliers(data);
                    
                    if (outliers.length > 0) {
                        resultsContainer.innerHTML = `
                            <div class="result-group">
                                <label>Outliers Found:</label>
                                <span class="outlier-value">${outliers.join(', ')}</span>
                            </div>
                            <div class="result-group">
                                <label>Normal Values:</label>
                                <span>${data.filter(x => !outliers.includes(x)).join(', ')}</span>
                            </div>
                            <div class="result-group stats">
                                <label>Stats:</label>
                                <span>Q1: ${Math.min(...data).toFixed(2)} | Q3: ${Math.max(...data).toFixed(2)} | IQR: ${(Math.max(...data) - Math.min(...data)).toFixed(2)}</span>
                            </div>`;
                    } else {
                        resultsContainer.innerHTML = `
                            <div class="result-group">
                                <label>Result:</label>
                                <span class="success">No outliers detected</span>
                            </div>
                            <div class="result-group">
                                <label>All Values:</label>
                                <span>${data.join(', ')}</span>
                            </div>`;
                    }
                    
                    modal.style.display = 'flex';
                } catch (error) {
                    resultsContainer.innerHTML = `<span class="error">Error: ${error.message}</span>`;
                    modal.style.display = 'flex';
                } finally {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }
            }, 300);
        });
        
        
        // Close modal when clicking X
        document.querySelector('.close-modal').addEventListener('click', function() {
            document.getElementById('results-modal').style.display = 'none';
        });
        
        // Close modal when clicking outside
        document.getElementById('results-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
    
    function detectOutliers(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;
        
        return data.filter(x => x < lowerBound || x > upperBound);
    }
    
    // Initialize everything when DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {
        animateOnScroll();
        setupCopyButtons();
        setupOutlierDemo();
        initSyntaxHighlighting();
    });

    // Icon for more information on outlier detection:
    document.getElementById('iqr-info-btn')?.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if it's a link
        console.log("View full documentation on GitHub");
    });

// Keyboard navigation for scroll-snap sections
document.addEventListener('DOMContentLoaded', function() {
    const pageContainer = document.querySelector('.page-container');
    const sections = document.querySelectorAll('.scroll-page');
    let currentSectionIndex = 0;
    let isScrolling = false;
    const scrollDelay = 800;
    
    // Function to scroll to a specific section with offset
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;
        
        isScrolling = true;
        currentSectionIndex = index;
        
        // Get the section element
        const section = sections[index];
        let sectionPosition = section.offsetTop;
        
        // Apply offset only if it's the outlier section (similar to dots implementation)
        if (section.classList.contains('outlier-page')) {
            const offset = 20; // Same as your dots offset
            sectionPosition -= offset;
        }
        
        // Smooth scroll to position
        pageContainer.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });

        // Prevent rapid scrolling
        setTimeout(() => {
            isScrolling = false;
        }, scrollDelay);
    }

    // Keyboard event listener
    document.addEventListener('keydown', function(e) {
        // Only handle arrow keys if not in a text input/textarea
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });

    // Update current section on scroll
    pageContainer.addEventListener('scroll', function() {
        if (isScrolling) return;

        // Find which section is currently in view
        const scrollPosition = pageContainer.scrollTop + (window.innerHeight / 2);
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionIndex = index;
            }
        });
    });

    // Initialize current section on load
    currentSectionIndex = 0;
});


//Footer Update
    // Auto-update year
    document.getElementById('year').textContent = new Date().getFullYear();


//Watermark Footer Boundary Fix
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.page-container');
        const lastPage = document.querySelector('.scroll-page:last-child');
        
        let isScrolling = false;
        
        container.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            // Check if trying to scroll past last page
            const lastPageBottom = lastPage.offsetTop + lastPage.offsetHeight;
            const scrollBottom = container.scrollTop + window.innerHeight;
            
            if (scrollBottom > lastPageBottom) {
                isScrolling = true;
                container.scrollTo({
                    top: lastPage.offsetTop,
                    behavior: 'smooth'
                });
                setTimeout(() => { isScrolling = false; }, 500);
            }
        });
    });
