document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Remove preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        preloader.style.display = 'none';
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / duration * 10;
        
        let currentCount = 0;
        const updateCounter = () => {
            currentCount += increment;
            counter.textContent = Math.ceil(currentCount);
            
            if(currentCount < target) {
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
});