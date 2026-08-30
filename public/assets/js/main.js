/* ==========================================================================
   ARNOBOT — Main Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ── Standard Scroll Reveal Observer (from index.html) ───────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

    // ── GSAP Animations ─────────────────────────────────────────────────────
    // ── GSAP Animations ─────────────────────────────────────────────────────
    // ── GSAP Animations ─────────────────────────────────────────────────────
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Clear default CSS .reveal transition classes to let GSAP handle reveals smoothly with advanced options
        gsap.set('.reveal', { opacity: 1, y: 0, transition: 'none' });

        // Default scroll reveal trigger for general sections
        document.querySelectorAll('.reveal').forEach((section) => {
            // Check if this section has its own customized GSAP animation.
            // If not, we run a default fade-in-up animation.
            const hasCustomAnimation = section.classList.contains('about') ||
                section.classList.contains('excellence') ||
                section.classList.contains('products') ||
                section.classList.contains('environment') ||
                section.classList.contains('industries') ||
                section.classList.contains('cta') ||
                section.classList.contains('about-story') ||
                section.classList.contains('why-choose-us') ||
                section.classList.contains('journey') ||
                section.classList.contains('vision-mission') ||
                section.classList.contains('leadership') ||
                section.classList.contains('facility') ||
                section.classList.contains('product-hero') ||
                section.classList.contains('product-details') ||
                section.classList.contains('product-specs-section') ||
                section.classList.contains('product-showcase-section') ||
                section.classList.contains('bm-canvas-section') ||
                section.classList.contains('bm-banner-sec');

            if (!hasCustomAnimation) {
                gsap.from(section, {
                    opacity: 0,
                    y: 35,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            }
        });

        // ── HOME PAGE (index.php) ANIMATIONS ───────────────────────────────
        if (document.querySelector('.hero')) {
            const playHeroAnimations = () => {
                const loadTl = gsap.timeline();

                // 1. Initial State for BG Image Zoom
                loadTl.from('.hero-bg', {
                    scale: 1.12,
                    duration: 1.8,
                    ease: 'power3.out'
                });

                // 2. Header Elements Fade In & Slide Down
                loadTl.from('.logo', {
                    opacity: 0,
                    scale: 0.9,
                    y: -10,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=1.4');

                loadTl.from('.nav-left a', {
                    opacity: 0,
                    y: -15,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=1.0');

                loadTl.from('.nav-right a', {
                    opacity: 0,
                    y: -15,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=1.0');

                // 3. Hero Content Fade & Slide Up (staggered)
                loadTl.from('.hero-content .eyebrow', {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.8');

                loadTl.from('.hero h1', {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6');

                loadTl.from('.hero-sub', {
                    opacity: 0,
                    y: 30,
                    duration: 0.7,
                    ease: 'power3.out'
                }, '-=0.5');

                loadTl.from('.hero-actions .btn, .hero-actions .btn-secondary', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, '-=0.4');

                // 4. Play Button Pop In
                loadTl.from('.hero-play', {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.6');

                // --- Scroll Parallax & Scrub Animations ---
                gsap.to('.hero-bg', {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                gsap.to('.hero-content', {
                    yPercent: -12,
                    opacity: 0.2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom 40%',
                        scrub: true
                    }
                });

                gsap.to('.hero-play', {
                    scale: 0.8,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom 50%',
                        scrub: true
                    }
                });
            };

            const introSplash = document.getElementById('intro-splash');

            if (!introSplash || sessionStorage.getItem('arnobot_entered') === 'true') {
                if (introSplash) {
                    introSplash.style.display = 'none';
                }
                document.body.classList.remove('lock-scroll');
                playHeroAnimations();
            } else {
                const loaderPercent = introSplash.querySelector('.loader-percent');
                const loaderCircleVal = introSplash.querySelector('.loader-circle-val');
                const loaderStatus = introSplash.querySelector('.loader-status');
                const enterBtnWrap = introSplash.querySelector('.enter-btn-wrap');
                const enterBtn = introSplash.querySelector('#enter-btn');

                const statuses = [
                    "Initializing Robotics Core...",
                    "Loading Navigation Subsystems...",
                    "Establishing Telemetry Link...",
                    "Connecting to Altius & Saibya Platforms...",
                    "Systems Operational. Ready to Boot."
                ];

                const setProgress = (val) => {
                    if (loaderCircleVal) {
                        const offset = 283 - (val / 100) * 283;
                        loaderCircleVal.style.strokeDashoffset = offset;
                    }
                    if (loaderPercent) {
                        loaderPercent.innerText = `${Math.round(val)}%`;
                    }
                    if (loaderStatus) {
                        let statusIdx = Math.floor((val / 100) * statuses.length);
                        if (statusIdx >= statuses.length) statusIdx = statuses.length - 1;
                        loaderStatus.innerText = statuses[statusIdx];
                    }
                };

                const progressObj = { val: 0 };
                gsap.to(progressObj, {
                    val: 100,
                    duration: 2.2,
                    ease: "power1.inOut",
                    onUpdate: () => {
                        setProgress(progressObj.val);
                    },
                    onComplete: () => {
                        // Fade out loader-circle and status
                        gsap.to([introSplash.querySelector('.loader-container'), loaderStatus], {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            stagger: 0.1,
                            onComplete: () => {
                                introSplash.querySelector('.loader-container').style.display = 'none';
                                loaderStatus.style.display = 'none';

                                // Show Enter button with beautiful entrance
                                enterBtnWrap.style.display = 'flex';
                                gsap.fromTo(enterBtnWrap,
                                    { opacity: 0, scale: 0.8, y: 15 },
                                    {
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        duration: 0.6,
                                        ease: "back.out(1.5)"
                                    }
                                );
                            }
                        });
                    }
                });

                if (enterBtn) {
                    enterBtn.addEventListener('click', () => {
                        sessionStorage.setItem('arnobot_entered', 'true');

                        const exitTl = gsap.timeline({
                            onComplete: () => {
                                introSplash.style.display = 'none';
                                document.body.classList.remove('lock-scroll');
                                playHeroAnimations();
                            }
                        });

                        exitTl.to(enterBtnWrap, {
                            opacity: 0,
                            scale: 0.9,
                            y: -15,
                            duration: 0.3,
                            ease: "power2.in"
                        });

                        exitTl.to(introSplash.querySelector('.splash-logo'), {
                            opacity: 0,
                            scale: 0.95,
                            y: -20,
                            duration: 0.4,
                            ease: "power2.in"
                        }, "-=0.15");

                        exitTl.to(introSplash, {
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.inOut"
                        }, "-=0.25");
                    });
                }
            }
        }

        // About Section (Home Page)
        if (document.querySelector('.about')) {
            if (document.querySelector('.about-img')) {
                gsap.from('.about-img', {
                    opacity: 0,
                    scale: 0.92,
                    y: 40,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
            }

            gsap.from('.about-img-a', {
                opacity: 0,
                x: -60,
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.about-img-b', {
                opacity: 0,
                y: 60,
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.about-copy > *', {
                opacity: 0,
                x: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Excellence & Metrics Section (Home Page)
        if (document.querySelector('.excellence')) {
            gsap.from('.excellence-title > *', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.excellence',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.metric', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.excellence',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Interactive Metric Count-Up Animation (runs on scroll down)
            ScrollTrigger.create({
                trigger: '.excellence',
                start: 'top 80%',
                once: true,
                onEnter: () => runCountUp()
            });

            function runCountUp() {
                document.querySelectorAll('.metric strong').forEach(el => {
                    const originalText = el.getAttribute('data-val') || el.innerText.trim();
                    if (!el.getAttribute('data-val')) {
                        el.setAttribute('data-val', originalText); // Store original target text
                    }

                    if (originalText.includes('+')) {
                        const num = parseInt(originalText.replace('+', ''), 10);
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: num,
                            duration: 1.5,
                            ease: 'power2.out',
                            onUpdate: () => {
                                el.innerText = Math.floor(obj.val) + '+';
                            }
                        });
                    } else if (originalText.includes('%')) {
                        const num = parseInt(originalText.replace('%', ''), 10);
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: num,
                            duration: 1.5,
                            ease: 'power2.out',
                            onUpdate: () => {
                                el.innerText = Math.floor(obj.val) + '%';
                            }
                        });
                    } else if (originalText.includes('-')) {
                        const parts = originalText.split('-');
                        const num1 = parseInt(parts[0], 10);
                        const num2 = parseInt(parts[1], 10);
                        let obj = { val1: 0, val2: 0 };
                        gsap.to(obj, {
                            val1: num1,
                            val2: num2,
                            duration: 1.5,
                            ease: 'power2.out',
                            onUpdate: () => {
                                el.innerText = Math.floor(obj.val1) + '-' + Math.floor(obj.val2);
                            }
                        });
                    } else {
                        const num = parseInt(originalText, 10);
                        if (!isNaN(num)) {
                            let obj = { val: 0 };
                            gsap.to(obj, {
                                val: num,
                                duration: 1.5,
                                ease: 'power2.out',
                                onUpdate: () => {
                                    el.innerText = Math.floor(obj.val);
                                }
                            });
                        }
                    }
                });
            }
        }

        // Products Section (Home Page)
        if (document.querySelector('.products')) {
            gsap.from('.product-head > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.products',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.product-card-link', {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.product-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Environment Section (Home Page)
        if (document.querySelector('.environment')) {
            gsap.from('.environment h2', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.environment',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.to('.environment-bg', {
                yPercent: 12,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.environment',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Industries Section (Home Page)
        if (document.querySelector('.industries')) {
            gsap.from('.industries-head > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.industries',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.industry', {
                opacity: 0,
                y: 40,
                scale: 0.9,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.industries',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            // Initialize Industries Carousel Slider
            initIndustrySlider();
        }

        function initIndustrySlider() {
            const track = document.getElementById('indSliderTrack');
            const container = document.getElementById('indSliderTrackContainer');
            const prevBtn = document.getElementById('indSliderPrev');
            const nextBtn = document.getElementById('indSliderNext');
            const dotsContainer = document.getElementById('indSliderDots');

            if (!track || !container) return;

            const cards = Array.from(track.querySelectorAll('.industry'));
            const totalCards = cards.length;
            if (totalCards === 0) return;

            let currentIndex = 0;
            let cardsPerView = getCardsPerView();
            let maxIndex = Math.max(0, totalCards - cardsPerView);
            let autoplayTimer = null;

            function getCardsPerView() {
                if (window.innerWidth <= 600) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 4;
            }

            function renderDots() {
                if (!dotsContainer) return;
                dotsContainer.innerHTML = '';
                const numDots = maxIndex + 1;
                if (numDots <= 1) return;

                for (let i = 0; i < numDots; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'industry-dot' + (i === currentIndex ? ' active' : '');
                    dot.setAttribute('aria-label', `Go to industry slide ${i + 1}`);
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        goToSlide(i);
                        resetAutoplay();
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            function updateSlider(animate = true) {
                cardsPerView = getCardsPerView();
                maxIndex = Math.max(0, totalCards - cardsPerView);
                if (currentIndex > maxIndex) currentIndex = maxIndex;

                const firstCard = cards[0];
                if (firstCard && container) {
                    const cardWidth = firstCard.offsetWidth;
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap) || (window.innerWidth <= 600 ? 16 : 24);
                    const offset = currentIndex * (cardWidth + gap);
                    track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
                    track.style.transform = `translateX(-${offset}px)`;
                }

                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.industry-dot');
                    dots.forEach((dot, idx) => {
                        dot.classList.toggle('active', idx === currentIndex);
                    });
                }
            }

            function nextSlide() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }

            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = maxIndex;
                }
                updateSlider();
            }

            function goToSlide(idx) {
                currentIndex = Math.max(0, Math.min(idx, maxIndex));
                updateSlider();
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextSlide();
                    resetAutoplay();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    prevSlide();
                    resetAutoplay();
                });
            }

            // Touch Drag / Swipe
            let startX = 0;
            let isTouching = false;
            container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isTouching = true;
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                if (!isTouching) return;
                isTouching = false;
                const diffX = startX - e.changedTouches[0].clientX;
                if (diffX > 35) {
                    nextSlide();
                    resetAutoplay();
                } else if (diffX < -35) {
                    prevSlide();
                    resetAutoplay();
                }
            });

            // Autoplay (4s intervals)
            function startAutoplay() {
                stopAutoplay();
                autoplayTimer = setInterval(() => {
                    nextSlide();
                }, 4000);
            }

            function stopAutoplay() {
                if (autoplayTimer) {
                    clearInterval(autoplayTimer);
                    autoplayTimer = null;
                }
            }

            function resetAutoplay() {
                startAutoplay();
            }

            container.addEventListener('mouseenter', stopAutoplay);
            container.addEventListener('mouseleave', startAutoplay);

            window.addEventListener('resize', () => {
                cardsPerView = getCardsPerView();
                maxIndex = Math.max(0, totalCards - cardsPerView);
                renderDots();
                updateSlider(false);
            });

            renderDots();
            updateSlider(false);
            setTimeout(() => updateSlider(false), 200);
            startAutoplay();
        }

        // CTA Section (Home Page)
        if (document.querySelector('.cta')) {
            gsap.from('.cta-container', {
                opacity: 0,
                scale: 0.96,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.cta',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }


        // ── ABOUT PAGE (about.php) ANIMATIONS ───────────────────────────────
        if (document.querySelector('.about-hero')) {
            const abtTl = gsap.timeline();

            abtTl.from('.about-hero-content .eyebrow', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out'
            });

            abtTl.from('.about-hero-content h1', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4');

            abtTl.from('.about-hero-image img', {
                opacity: 0,
                x: 80,
                scale: 0.95,
                duration: 1.0,
                ease: 'power3.out'
            }, '-=0.6');

            // Floating movement for the hero graphic group
            gsap.to('.about-hero-image img', {
                y: -15,
                duration: 3.5,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1
            });
        }

        // About Story Section (About Page)
        if (document.querySelector('.about-story')) {
            gsap.from('.about-story-content', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-story',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.about-story-title > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-story',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Gear rotation tied to page scrolling
            gsap.to('.about-story-icon img', {
                rotation: 360,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about-story',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Why Choose Us Section (About Page)
        if (document.querySelector('.why-choose-us')) {
            gsap.from('.why-choose-us-left > .eyebrow, .why-choose-us-left h2, .why-choose-us-desc', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.why-choose-us',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.why-item', {
                opacity: 0,
                scale: 0.85,
                y: 30,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.why-choose-us-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            // Parallax movement for background elements
            gsap.to('.why-choose-us-right', {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.why-choose-us',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // HUD animation is driven by CSS keyframes — no JS rotation needed
        }

        // Journey Section (About Page)
        if (document.querySelector('.journey')) {
            // Spin gears based on scroll
            gsap.to('.journey-icon img', {
                rotation: 360,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.journey',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to('.journey-icon-bottom img', {
                rotation: -360,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.journey',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.from('.journey-title > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.journey',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Journey Timeline Items Slide in
            document.querySelectorAll('.timeline-item').forEach((item, idx) => {
                gsap.from(item, {
                    opacity: 0,
                    x: idx % 2 === 0 ? -40 : 40,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });

                // Timeline center dot pop in
                if (item.querySelector('.timeline-dot')) {
                    gsap.from(item.querySelector('.timeline-dot'), {
                        scale: 0,
                        duration: 0.5,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });
        }

        // Vision & Mission Section (About Page)
        if (document.querySelector('.vision-mission')) {
            gsap.from('.vision-mission-img', {
                opacity: 0,
                scale: 0.95,
                x: -50,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.vision-mission',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.vision-mission-card', {
                opacity: 0,
                x: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.vision-mission-cards',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Leadership Section (About Page)
        if (document.querySelector('.leadership')) {
            gsap.from('.leadership .section-title', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.leadership',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.leader-card', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.leadership-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Facility Section (About & Market Pages)
        if (document.querySelector('.facility')) {
            if (document.querySelector('.facility-left')) {
                gsap.from('.facility-left > *', {
                    opacity: 0,
                    x: -40,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.facility',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
            }

            if (document.querySelector('.facility-gallery')) {
                gsap.from('.facility-item', {
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.facility-gallery',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            }

            if (document.querySelector('.facility-caption')) {
                gsap.from('.facility-caption', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.facility-caption',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                });
            }
        }


        // ── PRODUCT DETAILS PAGE (product.php) ANIMATIONS ───────────────────
        if (document.querySelector('.product-hero')) {
            const prodHeroTl = gsap.timeline();

            prodHeroTl.from('.product-hero-bg, .product-hero-video', {
                scale: 1.1,
                duration: 1.5,
                ease: 'power2.out'
            });

            prodHeroTl.from('.product-hero-tag', {
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=1.0');

            prodHeroTl.from('.product-hero-content h1', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power2.out'
            }, '-=0.8');

            prodHeroTl.from('.product-hero-actions', {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.7,
                ease: 'back.out(1.5)'
            }, '-=0.6');

            // Scroll Parallax on product hero bg
            gsap.to('.product-hero-bg, .product-hero-video', {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.product-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Product Details Description
        if (document.querySelector('.product-details')) {
            gsap.from('.main-product-img', {
                opacity: 0,
                x: -50,
                scale: 0.95,
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.product-details',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Smooth float effect on main product image
            gsap.to('.main-product-img', {
                y: -10,
                duration: 3,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1
            });

            gsap.from('.product-details-copy > *', {
                opacity: 0,
                x: 40,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.product-details-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Product Spec Cards (Key Features & Applications)
        if (document.querySelector('.product-specs-section')) {
            gsap.from('.specs-cards-grid .specs-card:nth-child(1)', {
                opacity: 0,
                x: -50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.specs-cards-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.specs-cards-grid .specs-card:nth-child(2)', {
                opacity: 0,
                x: 50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.specs-cards-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Product Showcase Grid (Videos)
        if (document.querySelector('.product-showcase-section')) {
            gsap.from('.showcase-header > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.product-showcase-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.showcase-card', {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.showcase-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // ── MARKET PAGE (market.php) ANIMATIONS ─────────────────────────────
        if (document.querySelector('.market-hero')) {
            const mktHeroTl = gsap.timeline();

            mktHeroTl.from('.market-hero-content .eyebrow', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out'
            });

            mktHeroTl.from('.market-hero-content h1', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4');

            mktHeroTl.from('.market-hero-image img', {
                opacity: 0,
                x: 80,
                scale: 0.95,
                duration: 1.0,
                ease: 'power3.out'
            }, '-=0.6');

            // Scroll Parallax on market hero bg
            gsap.to('.market-hero', {
                backgroundPosition: '50% 30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.market-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Market Intro Section
        if (document.querySelector('.market-intro')) {
            gsap.from('.market-intro-content', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-intro',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.market-intro-title > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-intro',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Gear icon rotation
            gsap.to('.market-intro-icon img', {
                rotation: 360,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.market-intro',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Market UGV Platform Section (Market Page)
        if (document.querySelector('.market-ugv-section')) {
            gsap.from('.market-ugv-image img', {
                opacity: 0,
                x: -60,
                scale: 0.95,
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-ugv-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Smooth float effect on UGV image
            gsap.to('.market-ugv-image img', {
                y: -10,
                duration: 3,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1
            });

            gsap.from('.market-ugv-copy > *, .ugv-spec-card', {
                opacity: 0,
                x: 50,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-ugv-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // Market Cards Grid
        if (document.querySelector('.market-grid-section')) {
            gsap.from('.market-grid-head > *', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-grid-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            gsap.from('.market-card', {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.market-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
    }

    // ── PRODUCT GALLERY THUMBNAIL PREVIEW SWITCHER ──────────────────────────
    const mainImgLink = document.getElementById('mainImageLink');
    const mainImg = mainImgLink ? mainImgLink.querySelector('.main-product-img') : null;
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');

    if (mainImg && galleryThumbs.length > 0) {
        galleryThumbs.forEach((thumb) => {
            thumb.addEventListener('mouseenter', () => {
                const newSrc = thumb.getAttribute('src');
                if (newSrc && mainImg.getAttribute('src') !== newSrc) {
                    mainImg.src = newSrc;
                    if (mainImgLink) mainImgLink.href = newSrc;
                }
            });
            thumb.addEventListener('click', () => {
                const newSrc = thumb.getAttribute('src');
                if (newSrc) {
                    mainImg.src = newSrc;
                    if (mainImgLink) mainImgLink.href = newSrc;
                }
            });
        });
    }

    // ── VIDEO LIGHTBOX MODAL FUNCTIONALITY ──────────────────────────────────
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');

    if (modal && modalVideo) {
        const modalClose = modal.querySelector('.video-modal-close');
        const modalOverlay = modal.querySelector('.video-modal-overlay');

        const openModal = (videoSrc) => {
            modalVideo.src = videoSrc;
            modalVideo.load();
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            modalVideo.play().catch(err => {
                console.log("Autoplay was prevented or interrupted:", err);
            });
        };

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = ""; // Clear src to stop buffering
        };

        // Attach trigger event listeners with event delegation for nested SVG/spans
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.play-trigger');
            if (trigger) {
                e.preventDefault();
                const videoSrc = trigger.getAttribute('data-video');
                if (videoSrc) {
                    openModal(videoSrc);
                }
            }
        });

        // Close handlers
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ── MOBILE MENU TOGGLE ──────────────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

    // Hoist closeMenu so submenu code and other events can also call it
    let closeMenu = () => { };
    let openMenu = () => { };

    if (mobileMenu) {
        openMenu = () => {
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            if (navToggle) {
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
        };

        closeMenu = () => {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        };

        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (mobileMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Close when clicking a link inside mobile menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close on window resize if screen size goes above mobile/tablet breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ── MOBILE SUBMENU TOGGLE (Supports multiple dropdowns) ─────────────────
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        const container = toggle.closest('.mobile-dropdown');
        const submenu = container ? container.querySelector('.mobile-submenu') : null;
        if (!submenu) return;

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const isOpen = container.classList.toggle('open');
            submenu.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        submenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (typeof closeMenu === 'function') closeMenu();
            });
        });
    });

    // ── DESKTOP DROPDOWNS (Supports multiple dropdowns) ──────────────────────
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    if (navDropdowns.length > 0) {
        // Inject single dynamic arrow style rule
        if (!document.getElementById('nav-dropdown-arrow-style')) {
            const arrowStyle = document.createElement('style');
            arrowStyle.id = 'nav-dropdown-arrow-style';
            arrowStyle.textContent = `.dropdown-menu::before { left: var(--arrow-left, 50%); transform: translateX(-50%) rotate(45deg); }`;
            document.head.appendChild(arrowStyle);
        }

        const dropdownInstances = [];

        navDropdowns.forEach(navDropdown => {
            const toggle = navDropdown.querySelector('.nav-dropdown-toggle');
            const menu = navDropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            const positionDropdown = () => {
                const rect = toggle.getBoundingClientRect();
                const menuWidth = menu.offsetWidth || 220;
                let left = rect.left + rect.width / 2 - menuWidth / 2;
                left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));

                menu.style.top = (rect.bottom + 10) + 'px';
                menu.style.left = left + 'px';

                const arrowCenter = rect.left + rect.width / 2 - left;
                menu.style.setProperty('--arrow-left', arrowCenter + 'px');
            };

            const openDropdown = () => {
                // Close other dropdowns first
                dropdownInstances.forEach(other => {
                    if (other.navDropdown !== navDropdown) other.close();
                });
                positionDropdown();
                toggle.setAttribute('aria-expanded', 'true');
                navDropdown.classList.add('open');
            };

            const closeDropdown = () => {
                toggle.setAttribute('aria-expanded', 'false');
                navDropdown.classList.remove('open');
                navDropdown.classList.remove('keyboard-open');
            };

            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (navDropdown.classList.contains('open')) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });

            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    closeDropdown();
                });
            });

            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (navDropdown.classList.contains('open')) {
                        closeDropdown();
                    } else {
                        openDropdown();
                        const firstItem = menu.querySelector('a');
                        if (firstItem) firstItem.focus();
                    }
                }
                if (e.key === 'Escape') {
                    closeDropdown();
                    toggle.focus();
                }
            });

            menu.addEventListener('keydown', (e) => {
                const items = [...menu.querySelectorAll('a')];
                const idx = items.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
                if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
                if (e.key === 'Escape') { closeDropdown(); toggle.focus(); }
            });

            dropdownInstances.push({ navDropdown, toggle, menu, open: openDropdown, close: closeDropdown, reposition: positionDropdown });
        });

        // Reposition on scroll/resize
        const repositionAll = () => {
            dropdownInstances.forEach(inst => {
                if (inst.navDropdown.classList.contains('open') || inst.navDropdown.classList.contains('keyboard-open')) {
                    inst.reposition();
                }
            });
        };
        window.addEventListener('resize', repositionAll, { passive: true });
        window.addEventListener('scroll', repositionAll, { passive: true });

        // Global Outside click dismissal
        document.addEventListener('click', (e) => {
            dropdownInstances.forEach(inst => {
                if (!inst.navDropdown.contains(e.target) && !inst.menu.contains(e.target)) {
                    inst.close();
                }
            });
        });
    }

    // ══════════════════════════════════════════════════════════════════════════
    // CAREER PAGE – Job Filter Tabs
    // ══════════════════════════════════════════════════════════════════════════
    const filterBtns = document.querySelectorAll('.career-filter-btn');
    const jobCards = document.querySelectorAll('.career-job-card');
    const noResults = document.getElementById('career-no-results');

    if (filterBtns.length && jobCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filter = btn.dataset.filter;
                let visible = 0;

                jobCards.forEach(card => {
                    const match = filter === 'all' || card.dataset.category === filter;
                    if (match) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fade-in-up 0.35s ease forwards';
                        visible++;
                    } else {
                        card.classList.add('hidden');
                    }
                });

                if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
            });
        });
    }

    // ══════════════════════════════════════════════════════════════════════════
    // CAREER PAGE – Drag & Drop Resume Upload
    // ══════════════════════════════════════════════════════════════════════════
    const uploadZone = document.getElementById('career-upload-zone');
    const uploadInput = document.getElementById('car-resume');
    const uploadContent = document.getElementById('career-upload-content');
    const uploadPreview = document.getElementById('career-upload-preview');
    const uploadFilename = document.getElementById('career-upload-filename');
    const uploadRemove = document.getElementById('career-upload-remove');

    function showFilePreview(file) {
        if (!file) return;
        const validTypes = ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a PDF or Word document (.pdf, .doc, .docx)');
            uploadInput.value = '';
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be under 5 MB.');
            uploadInput.value = '';
            return;
        }
        uploadFilename.textContent = file.name;
        uploadContent.style.display = 'none';
        uploadPreview.style.display = 'flex';
        uploadZone.classList.add('drag-over');
    }

    if (uploadZone && uploadInput) {
        uploadInput.addEventListener('change', () => {
            if (uploadInput.files[0]) showFilePreview(uploadInput.files[0]);
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('drag-over');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) {
                // Transfer to input
                const dt = new DataTransfer();
                dt.items.add(file);
                uploadInput.files = dt.files;
                showFilePreview(file);
            }
        });

        if (uploadRemove) {
            uploadRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                uploadInput.value = '';
                uploadContent.style.display = 'block';
                uploadPreview.style.display = 'none';
                uploadZone.classList.remove('drag-over');
            });
        }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // CAREER PAGE – Application Form Submit
    // ══════════════════════════════════════════════════════════════════════════
    const careerForm = document.getElementById('career-apply-form');
    const careerSuccess = document.getElementById('career-success');
    const careerSubmitBtn = document.getElementById('career-submit-btn');

    if (careerForm && careerSuccess) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const required = careerForm.querySelectorAll('[required]');
            let valid = true;
            required.forEach(field => {
                field.style.borderColor = '';
                if (!field.value.trim()) {
                    field.style.borderColor = '#e53e3e';
                    valid = false;
                }
            });

            if (!valid) {
                const firstInvalid = careerForm.querySelector('[required][style*="e53e3e"]');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Simulate submission (replace with actual backend call)
            if (careerSubmitBtn) {
                careerSubmitBtn.textContent = 'Submitting…';
                careerSubmitBtn.disabled = true;
            }

            setTimeout(() => {
                careerForm.style.display = 'none';
                careerSuccess.classList.add('visible');
                careerSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 900);
        });
    }


    // ══════════════════════════════════════════════════════════════════════════
    // INDEX PAGE – Industry details interactive popup modal
    // ══════════════════════════════════════════════════════════════════════════
    const industryData = {
        defence: {
            title: "Defence & Security",
            desc: "Critical operations in hazardous and combat zones. ARNOBOT designs autonomous unmanned ground platforms to handle scouting, route monitoring, and remote tactical supply delivery without risking human lives.",
            robots: [
                {
                    name: "ATM",
                    desc: "Any Terrain Machine. High-clearance heavy chassis designed to scale rocky industrial slopes.",
                    image: "assets/images/ATM.png",
                    specs: ["All-Terrain", "Chassis-Suspension", "4x4 Drive", "Dual GPS"]
                },
                {
                    name: "SAIBYA",
                    desc: "Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200 kg.",
                    image: "assets/images/SAIBYA.png",
                    specs: ["UGV", "200kg Load", "4x4 Drive", "LiDAR SLAM"]
                },
                {
                    name: "NEXUS",
                    desc: "Tactical UGV platform optimized for perimeter patrol, tactical surveillance, and security integrations.",
                    image: "assets/images/NEXUS.png",
                    specs: ["Tactical UGV", "LiDAR", "Thermal Cam", "Mesh Network"]
                }
            ],
            apps: [
                "Autonomous border perimeter patrolling",
                "Remote hazard, standoff threat & bomb detection",
                "Tactical cargo & ammunition delivery (up to 200 kg)",
                "Remote combat weapon & surveillance sensor integrations"
            ]
        },
        maritime: {
            title: "Maritime & Marine",
            desc: "Extreme saltwater environments require high-grade rugged robotic crawlers. ARNOBOT platforms inspect vessel hull walls, clean biofouling, and monitor harbor gates efficiently.",
            robots: [
                {
                    name: "ALTIUS",
                    desc: "Magnetic climbing robotic system designed for vertical steel wall inspection and cleaning.",
                    image: "assets/images/ALTIUS.png",
                    specs: ["Climbing Robot", "Magnetic", "IP67 Waterproof", "NDT Scan"]
                }
            ],
            apps: [
                "Vessel hull automated biofouling cleaning",
                "Non-Destructive weld testing (NDT) & crack mapping",
                "Autonomous marine harbor security patrols",
                "Offshore rig and underwater oil-gas piping inspection"
            ]
        },
        power: {
            title: "Power & Utilities",
            desc: "High-voltage switchyards, transformers, and nuclear facilities expose humans to intense safety risks. ARNOBOT robots replace personnel in routine inspections and critical structural mapping.",
            robots: [
                {
                    name: "ATM",
                    desc: "Any Terrain Machine. High-clearance heavy chassis designed to scale rocky industrial slopes.",
                    image: "assets/images/ATM.png",
                    specs: ["All-Terrain", "Chassis-Suspension", "4x4 Drive", "Dual GPS"]
                },
                {
                    name: "SAIBYA",
                    desc: "Rugged multi-mission ground platform carrying specialized sensor modules.",
                    image: "assets/images/SAIBYA.png",
                    specs: ["UGV", "Modular Platform", "Gas Sniffer", "Thermal Engine"]
                }
            ],
            apps: [
                "Thermal substation scanning and hot-spot detection",
                "Hazardous pipeline gas leakage scanning",
                "Substation yard structural inspection & monitoring",
                "Radiation-shielded area drone inspection"
            ]
        },
        industrial: {
            title: "Industrial Operations",
            desc: "Steel mills, smelting plants, paper mills, and chemical warehouses are hot, hazardous, and noisy. ARNOBOT platforms automate heavy material transport and structural inspection.",
            robots: [
                {
                    name: "SAIBYA",
                    desc: "Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200 kg.",
                    image: "assets/images/SAIBYA.png",
                    specs: ["UGV", "Heavy Load", "IP65 Weatherproof", "Auto-Charger"]
                }

            ],
            apps: [
                "Industrial heavy raw material automated transit",
                "High-temperature furnace area inspections",
                "Autonomous machineries acoustic noise checkups",
                "Chemical storage safety and leak scanning"
            ]
        },
        infrastructure: {
            title: "Critical Infrastructure",
            desc: "Railways, deep tunnels, dams, and remote cellular towers require continuous structural monitoring. ARNOBOT platforms scale long corridors and vertical walls without downtime.",
            robots: [
                {
                    name: "SAIBYA",
                    desc: "Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200 kg.",
                    image: "assets/images/SAIBYA.png",
                    specs: ["UGV", "Heavy Load", "IP65 Weatherproof", "Auto-Charger"]
                },
                {
                    name: "ATM",
                    desc: "Any Terrain Machine. Heavy suspension chassis equipped with 3D LiDAR for spatial mapping.",
                    image: "assets/images/ATM.png",
                    specs: ["All-Terrain", "LiDAR Mapping", "GPS-Denied Navigation", "Obstacle Avoidance"]
                }
            ],
            apps: [
                "Railway track obstruction scanning & thermal checks",
                "Deep tunnel wall crack and moisture detection",
                "Dam wall water leak and concrete integrity checks",
                "Cellular and remote power line utility monitoring"
            ]
        },
        asset: {
            title: "Asset Protection",
            desc: "Continuous facility protection demands reliable 24/7 coverage. ARNOBOT platforms autonomously navigate preset paths, detect intruders, and report anomalies instantaneously.",
            robots: [
                {
                    name: "NEXUS",
                    desc: "Tactical surveillance UGV equipped with thermal imaging cameras, sirens, and obstacle avoidance.",
                    image: "assets/images/NEXUS.png",
                    specs: ["Tactical Patrol", "Thermal Analytics", "LiDAR Avoidance", "IP65 Waterproof"]
                }
            ],
            apps: [
                "Autonomous perimeter patrol routes",
                "Thermal intrusion signature analytics",
                "Storage tank leak alerts",
                "24/7 video monitoring over secure radio"
            ]
        },
        solar: {
            title: "Solar Projects",
            desc: "Dust buildup reduces solar farm output significantly. ARNOBOT provides specialized, lightweight tracking robots that clean solar panel assemblies without using water.",
            robots: [
                {
                    name: "SAIBYA",
                    desc: "Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200 kg.",
                    image: "assets/images/SAIBYA.png",
                    specs: ["UGV", "Heavy Load", "IP65 Weatherproof", "Auto-Charger"]
                },
                {
                    name: "ALTIUS",
                    desc: "Vertical climbing robot customized with panel track guidance and high-efficiency waterless brush arrays.",
                    image: "assets/images/ALTIUS.png",
                    specs: ["Lightweight UGV", "Waterless Cleaning", "Solar Special", "Fast Brush"]
                }
            ],
            apps: [
                "Solar panel automated dry cleaning brush system",
                "Panel thermal micro-crack hotspot mapping",
                "Structural assembly integrity mapping",
                "Ground vegetation monitoring"
            ]
        }
    };

    const indModal = document.getElementById('industry-modal');
    if (indModal) {
        const indModalClose = indModal.querySelector('.industry-modal-close');
        const indModalOverlay = indModal.querySelector('.industry-modal-overlay');
        const modalTitle = document.getElementById('ind-modal-title');
        const modalDesc = document.getElementById('ind-modal-desc');
        const modalRobotsContainer = document.getElementById('ind-modal-robots-container');
        const industryCards = document.querySelectorAll('.industry');

        const openIndustryModal = (industryKey) => {
            const data = industryData[industryKey];
            if (!data) return;

            // Populate content
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;

            // Populate robots used
            modalRobotsContainer.innerHTML = '';
            data.robots.forEach(robot => {
                const specsHtml = robot.specs.map(spec => `<span>${spec}</span>`).join('');
                const cardHtml = `
                    <div class="modal-robot-card">
                        <div class="modal-robot-img-wrap">
                            <img src="${robot.image}" alt="${robot.name} robot" />
                        </div>
                        <div class="modal-robot-info">
                            <h5 class="russo">${robot.name}</h5>
                            <p>${robot.desc}</p>
                            <div class="modal-robot-specs">
                                ${specsHtml}
                            </div>
                        </div>
                    </div>
                `;
                modalRobotsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });

            // Show modal
            indModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll under modal
        };

        const closeIndustryModal = () => {
            indModal.classList.remove('active');
            document.body.style.overflow = ''; // Enable scroll
        };

        window.closeIndustryModal = closeIndustryModal;

        // Attach event listeners
        industryCards.forEach(card => {
            card.addEventListener('click', () => {
                const industryKey = card.dataset.industry;
                if (industryKey) {
                    openIndustryModal(industryKey);
                }
            });
        });

        if (indModalClose) indModalClose.addEventListener('click', closeIndustryModal);
        if (indModalOverlay) indModalOverlay.addEventListener('click', closeIndustryModal);
    }
    // ══════════════════════════════════════════════════════════════════════════
    // DEMO SCHEDULING MODAL
    // ══════════════════════════════════════════════════════════════════════════
    const demoModal = document.getElementById('demo-modal');
    if (demoModal) {
        const demoForm = document.getElementById('demo-schedule-form');
        const demoSuccess = document.getElementById('demo-success');
        const demoSubmitBtn = document.getElementById('demo-submit-btn');
        const demoModalClose = document.getElementById('demo-modal-close');
        const demoModalOverlay = demoModal.querySelector('.industry-modal-overlay');
        const demoSuccessClose = document.getElementById('demo-success-close');

        const openDemoModal = () => {
            if (demoForm) {
                demoForm.reset();
                demoForm.style.display = 'flex';
                // Clean invalid styling
                demoForm.querySelectorAll('[required]').forEach(f => f.style.borderColor = '');
            }
            if (demoSuccess) {
                demoSuccess.style.display = 'none';
            }
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeDemoModal = () => {
            demoModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Scan all Schedule a Demo buttons/links on the page (matching links to contact.php containing schedule or demo)
        const demoButtons = document.querySelectorAll('a[href*="contact.php"]');
        demoButtons.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('demo') || text.includes('schedule')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Close industry details modal if open
                    if (typeof window.closeIndustryModal === 'function') {
                        window.closeIndustryModal();
                    }

                    openDemoModal();
                });
            }
        });

        // Close handlers
        if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
        if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeDemoModal);
        if (demoSuccessClose) demoSuccessClose.addEventListener('click', closeDemoModal);

        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDemoModal();
            }
        });

        // Form submission and validation
        if (demoForm && demoSuccess) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const required = demoForm.querySelectorAll('[required]');
                let valid = true;

                required.forEach(field => {
                    field.style.borderColor = '';
                    if (!field.value.trim()) {
                        field.style.borderColor = '#e53e3e';
                        valid = false;
                    }
                });

                if (!valid) {
                    const firstInvalid = demoForm.querySelector('[required][style*="e53e3e"]');
                    if (firstInvalid) firstInvalid.focus();
                    return;
                }

                if (demoSubmitBtn) {
                    demoSubmitBtn.textContent = 'Scheduling…';
                    demoSubmitBtn.disabled = true;
                }

                setTimeout(() => {
                    demoForm.style.display = 'none';
                    demoSuccess.style.display = 'flex';
                    if (demoSubmitBtn) {
                        demoSubmitBtn.innerHTML = 'Schedule Demo <span class="btn-arrow">&rarr;</span>';
                        demoSubmitBtn.disabled = false;
                    }
                }, 1200);
            });
        }
    }
});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof Fancybox !== "undefined") {

        Fancybox.bind("[data-fancybox='gallery']", {
            animated: true,
            dragToClose: false,
            wheel: "zoom",

            Toolbar: {
                display: [
                    "zoom",
                    "fullscreen",
                    "slideshow",
                    "thumbs",
                    "close"
                ]
            },

            Thumbs: {
                autoStart: true
            }
        });

    }

});

