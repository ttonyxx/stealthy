// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Waitlist Modal Functions
function openWaitlist() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWaitlist() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form and hide success message
    const form = document.querySelector('.waitlist-form');
    const successMessage = document.getElementById('successMessage');
    form.style.display = 'flex';
    successMessage.classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('waitlistModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeWaitlist();
    }
});

// Handle waitlist form submission
function handleWaitlistSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    console.log('Waitlist signup:', email);

    // Submit form via AJAX to avoid page redirect
    const formData = new FormData(form);

    fetch('https://formsubmit.co/ajax/tony@kikoff.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            _subject: 'New Stealthy Waitlist Signup!',
            _template: 'box',
            _cc: 'tyler@kikoff.com,gregroie@kikoff.com',
            _captcha: 'false'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form submitted successfully:', data);

        // Show success message
        form.style.display = 'none';
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('active');

        // Reset form
        form.reset();

        // Close modal after 3 seconds
        setTimeout(() => {
            closeWaitlist();
        }, 3000);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your email. Please try again.');
    });
}

// Tab functionality for procedures
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');

        // Filter procedure cards by category
        const category = this.getAttribute('data-category');
        const cards = document.querySelectorAll('.procedure-card');

        cards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');

            if (cardCategory === category) {
                // Show cards matching the selected category
                card.style.display = 'block';
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s`;
                }, 10);
            } else {
                // Hide cards that don't match
                card.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.saving-card, .procedure-card, .step');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add hover effect to saving cards - show more details
document.querySelectorAll('.saving-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--primary-color)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--gray-300)';
    });
});

// Animate numbers counting up
function animateNumber(element, target, duration = 2000, originalText) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format based on original text pattern
        if (originalText.includes('M')) {
            element.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
        } else if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (originalText.includes(',')) {
            element.textContent = Math.floor(current).toLocaleString();
        } else if (target >= 1000) {
            element.textContent = '$' + Math.floor(current / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;

            // Extract number from text
            let target;
            if (text.includes('M')) {
                target = parseFloat(text.replace(/[^0-9.]/g, '')) * 1000000;
            } else if (text.includes('%')) {
                target = parseInt(text.replace(/[^0-9]/g, ''));
            } else {
                target = parseInt(text.replace(/[^0-9]/g, ''));
            }

            animateNumber(number, target, 2000, text);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Search functionality
const searchInput = document.querySelector('.search-box input');

// Perform search function
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm.length === 0) {
        alert('Please enter a search term');
        return;
    }

    // Scroll to procedures section
    const proceduresSection = document.getElementById('procedures');
    if (proceduresSection) {
        proceduresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show a temporary search results message
    const searchMessage = document.createElement('div');
    searchMessage.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    searchMessage.innerHTML = `
        <strong>🔍 Searching for:</strong><br>
        "${searchTerm}"<br>
        <small style="opacity: 0.9; font-size: 13px;">Full search results coming soon!</small>
    `;
    document.body.appendChild(searchMessage);

    // Remove message after 4 seconds
    setTimeout(() => {
        searchMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => searchMessage.remove(), 500);
    }, 4000);

    console.log('Searching for:', searchTerm);
}

// Add enter key support for search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Add visual feedback on input
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Add visual feedback
    if (searchTerm.length > 0) {
        searchInput.style.borderColor = 'var(--primary-color)';
    } else {
        searchInput.style.borderColor = 'var(--gray-300)';
    }
});

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't add loading state to modal close button
        if (this.classList.contains('modal-close')) return;

        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Change theme colors temporarily
        document.documentElement.style.setProperty('--primary-color', '#FFD700');
        document.documentElement.style.setProperty('--primary-light', '#FFA500');

        // Show confetti or special message
        alert('🎉 You found the secret! Healthcare transparency for all! 🎉');

        // Reset after 5 seconds
        setTimeout(() => {
            document.documentElement.style.setProperty('--primary-color', '#2D6A4F');
            document.documentElement.style.setProperty('--primary-light', '#52B788');
        }, 5000);

        konamiCode = [];
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }

    // Escape to close modal
    if (e.key === 'Escape') {
        closeWaitlist();
    }
});

// Lazy load images (if you add any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--pink-primary), var(--pink-light));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Footer link functionality
document.querySelectorAll('.footer-column a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Skip the "coming soon" modal for links with actual href values
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '') {
            return; // Allow the link to work normally
        }

        e.preventDefault();
        const linkText = this.textContent;

        // Show "coming soon" message
        const comingSoonMessage = document.createElement('div');
        comingSoonMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: var(--gray-900);
            padding: 40px 50px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            text-align: center;
            animation: scaleIn 0.3s ease;
            max-width: 400px;
        `;
        comingSoonMessage.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
            <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 12px; color: var(--primary-color);">
                Coming Soon!
            </h3>
            <p style="color: var(--gray-700); font-size: 16px; margin-bottom: 20px;">
                <strong>${linkText}</strong> page is under construction.
            </p>
            <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();"
                    style="background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
                           color: white; border: none; padding: 12px 24px; border-radius: 8px;
                           font-weight: 600; cursor: pointer; transition: transform 0.2s ease;">
                Got it!
            </button>
        `;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 1999;
            animation: fadeIn 0.3s ease;
        `;
        overlay.addEventListener('click', () => {
            comingSoonMessage.remove();
            overlay.remove();
        });

        document.body.appendChild(overlay);
        document.body.appendChild(comingSoonMessage);
    });
});

console.log('🏥 Stealthy - Healthcare Transparency Platform');
console.log('💪 Making healthcare costs transparent, one procedure at a time!');
