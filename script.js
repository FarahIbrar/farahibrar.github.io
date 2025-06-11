<!--Dark/light Mode Icon-->
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const isNowLight = body.classList.toggle('light');

    localStorage.setItem('theme', isNowLight ? 'light' : 'dark'); // Save the preference

    icon.classList = isNowLight ? 'fas fa-moon' : 'fas fa-sun'; // Set the icon to represent the *opposite* theme for toggling
}

window.addEventListener('DOMContentLoaded', () => { // Set icon on load
const savedTheme = localStorage.getItem('theme');
const icon = document.getElementById('theme-icon');

if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (icon) icon.classList = 'fas fa-moon'; // light mode → show moon to toggle to dark
    } else {
        if (icon) icon.classList = 'fas fa-sun'; // dark mode → show sun to toggle to light
    }
    });

<!--For the Form messages--> 
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
            
    eval(document.currentScript.textContent); // Reattach this script again so it continues working on reopen
}, 3000);
});

<!--For the Arrow to vanish on last page--> 
document.addEventListener("DOMContentLoaded", function () { // Scroll Arrow Behavior
    const arrow = document.querySelector(".scroll-down-arrow");
    const allSections = document.querySelectorAll(".scroll-page");
    const trueLastSection = allSections[allSections.length - 1];
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.target === trueLastSection) {
                    if (entry.isIntersecting) {
                        arrow.style.opacity = "0";
                        arrow.style.pointerEvents = "none";
                        arrow.style.animation = "none";
                    } else {
                        arrow.style.opacity = "1";
                        arrow.style.pointerEvents = "auto";
                        arrow.style.animation = "bounce 1.5s infinite";
                    }
                }
            });
        },
        
        {
            threshold: 0.5,
            rootMargin: "0px 0px -100px 0px"
        }
    );
    
    if (trueLastSection) {
        observer.observe(trueLastSection);
    }
    });

<!--For the Animation effects on all pages--> 
    // Improved scroll animation observer that retriggers
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
    
    // Modify your existing DOMContentLoaded event
    document.addEventListener("DOMContentLoaded", function() {
        // Your existing arrow code here...
        
        // Initialize scroll animations
        animateOnScroll();
        
        // Add this to retrigger on theme changes (optional)
        document.querySelector('.theme-toggle').addEventListener('click', function() {
            setTimeout(animateOnScroll, 300); // Wait for theme transition
        });
    });



    // Update your existing script with these modified functions
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
    
    // Keep all other existing functions exactly the same
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
