// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu when clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous error states
    removeErrorStates();
    
    // Validate inputs
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        addErrorState(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        addErrorState(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        addErrorState(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!messageInput.value.trim()) {
        addErrorState(messageInput, 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    }
});

// Helper functions
function addErrorState(element, message) {
    element.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function removeErrorStates() {
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add scroll-based animations for skills progress bars
const skillsSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress');
let animated = false;

function animateProgressBars() {
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition && !animated) {
        progressBars.forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateProgressBars);

// Resume download function
function downloadResume() {
    // Use the server endpoint
    window.location.href = 'http://localhost:8000/download-resume';
} 