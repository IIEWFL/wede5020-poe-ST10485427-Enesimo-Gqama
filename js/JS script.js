//Botshabelo website functionality

document.addEventListener('DOMContentLoaded', function() {
    //Mobile Navigation toggle
    initMobileNavigation();

    //Form Validation
    initFormValidation();

    //Interactive Elements
    initAccordions();
    initImageGallery();

    //Smooth Scrolling
    initSmoothScrolling();

    //Dynamic Content
    loadDynamicContent();
});

//Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.textContent = nav.classList('active') ? '✕' : '☰';
        });
    }
}

//Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });

        //Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.error-message') ||
createErrorElement(field);

    //Clear previous error
    clearError(field);

    //Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }

    //Email Validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.name === 'phone' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function createErrorElement(field) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    field.parentElement.appendChild(errorElement);
    return errorElement;
}

//Accordion functionality 
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.style.display === 'block';

            //Close all accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.display = 'none';
            });

            //Open current one if it was closed
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });
}

//Image gallery with lightbox
function initImageGallery() {
    //lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightbox.querySelector('.lightbox-content').src = imgSrc;
            lightbox.style.display = 'flex';
        });
    });

    //Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

//Smooth scrolling 
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

//Dynamic Content Loading 
function loadDynamicContent() {
    //Simulate loading blog post/news
    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer) {
        setTimeout(() => {
            blogContainer.innerHTML = `
                <div class="blog-post">
                    <h3>New Playground Equipment Installed</h3>
                    <p>Thanks to generous donations, we've installed new safe playground equipment for our children.</p>
                    <small>Posted on: December 15, 2024</small>
                </div>
                <div class="blog-post">
                    <h3>Volunteer Appreciation Day</h3>
                    <p>Join us in celebrating our amazing volunteers who make Botshabelo possible.</p>
                    <small>Posted on: December 10, 2024</small>
                </div>
            `;
        }, 1000);
    }
}

//Form Submission Handler
function handleFormSubmission(form, successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    //Simulate form submission
    setTimeout(() => {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = successMessage;
        successElement.style.display = 'block';

        form.parentNode.insertBefore(successElement, form);
        form.reset();

        submitButton.textContent = originalText;
        submitButton.disabled = false;

        //Remove success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }, 2000);
}



