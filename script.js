// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const closeSidebar = document.getElementById('closeSidebar');

menuToggle.addEventListener('click', () => {
    mobileSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

closeSidebar.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Scroll to top button and navbar background change
const scrollTop = document.getElementById('scrollTop');
const hero = document.querySelector('.hero');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const heroHeight = hero.offsetHeight;
    const scrollPosition = window.pageYOffset;

    // Change navbar background at 30% of hero section
    if (scrollPosition > heroHeight * 0.2) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show scroll to top button
    if (scrollPosition > heroBottom) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation on scroll
let counterAnimated = false;
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');

function checkStatsSection() {
    if (counterAnimated) return;

    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        counterAnimated = true;
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            animateCounter(number, target);
        });
    }
}

//------------- Form ---------------

// Initialize EmailJS with your public key
(function () {
    // Replace this with your EmailJS public key
    emailjs.init("1e30XXKIO2GFLzadB");
})();

// Get form and success message elements
const contactForm = document.getElementById('contactForm');

// Add form submit event listener
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
        to_name: "Admin",
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        from_phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        reply_to: document.getElementById('email').value // This allows you to reply directly to the sender
    };

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';

    // Send email using EmailJS
    // Replace Service_ID and Template_ID with your EmailJS service and template IDs
    emailjs.send('service_xqaimfl', 'template_b9tv0hp', formData)
        .then(response => {
            if (response.status === 200) {
                const audio = new Audio('images/Message send.mp3');
                audio.play();
                Swal.fire({
                    title: "Message sent",
                    text: "Thank you for contacting us.",
                    icon: "success",
                    confirmButtonText: "OK"
                });
                contactForm.reset();
            } else {
                throw new Error("An error occurred while sending");
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Not sent!",
                text: error.message || "Failed to send message. Please try again.",
                icon: "error",
                confirmButtonText: "Try again"
            });
        })
        .finally(() => {
            button.textContent = originalText;
        });
});

//------------- End Form ---------------


// Check on scroll
window.addEventListener('scroll', checkStatsSection);

// Check on page load
window.addEventListener('load', checkStatsSection);