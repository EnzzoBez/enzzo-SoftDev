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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Opcional: mostrar "Enviando..." no botão quando o formulário for enviado
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
    }
  });
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
        const isPercentage = counter.textContent.includes('%');
        const isPlus = counter.textContent.includes('+');
        const isTime = counter.textContent.includes('/');

        if (isTime) return;

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayValue = Math.ceil(current);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';

            counter.textContent = displayValue;
        }, 40);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function typeCode() {
    const codeElement = document.querySelector('.typing-animation');
    const lines = [
        "class EnzzoSoftDev {",
            " constructor() {",
            " this.visao = 'Excelência em software';",
            "this.especialidade = 'Web & APIs';",
            "  }",
        "}"

    ];

    let lineIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) return;

        const line = lines[lineIndex];
        const lineDiv = document.createElement('div');
        codeElement.appendChild(lineDiv);

        let charIndex = 0;

        function typeChar() {
            if (charIndex < line.length) {
                lineDiv.textContent += line[charIndex];
                charIndex++;
                setTimeout(typeChar, 40);
            } else {
                lineIndex++;
                setTimeout(typeLine, 300);
            }
        }

        typeChar();
    }

    codeElement.innerHTML = '';
    typeLine();
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio items hover effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const image = this.querySelector('.portfolio-image');
        image.style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('.portfolio-image');
        image.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent && heroVisual) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeCode();
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
            }
        });
    }
});

// Update active nav item on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});
class Spark {
    constructor(container) {
        this.container = container;
        this.spark = document.createElement('div');
        this.spark.classList.add('spark');
        this.init();
    }

    init() {
        this.spark.style.left = Math.random() * window.innerWidth + 'px';
        this.spark.style.bottom = '0px';
        this.spark.style.animationDuration = (2 + Math.random() * 3) + 's';
        this.container.appendChild(this.spark);

        setTimeout(() => this.spark.remove(), 5000);
    }
}

class SparkGenerator {
    constructor(containerId, interval = 100) {
        this.container = document.getElementById(containerId);
        this.interval = interval;
        this.start();
    }

    start() {
        setInterval(() => {
            new Spark(this.container);
        }, this.interval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SparkGenerator('sparkContainer', 100);
});
class LightningBolt {
    constructor(svg) {
        this.svg = svg;
        this.draw();
    }

    draw() {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const startX = Math.random() * window.innerWidth;
        let x = startX;
        let y = 0;
        let pathData = `M ${x} ${y}`;
        const segments = 10 + Math.floor(Math.random() * 5);

        for (let i = 0; i < segments; i++) {
            x += (Math.random() - 0.5) * 40;
            y += window.innerHeight / segments;
            pathData += ` L ${x} ${y}`;
        }

        path.setAttribute("d", pathData);
        path.setAttribute("stroke", "#ffffff");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("opacity", "0.8");

        this.svg.appendChild(path);

        // fade-out e remoção
        setTimeout(() => {
            path.style.transition = "opacity 0.5s ease-out";
            path.style.opacity = "0";
            setTimeout(() => path.remove(), 500);
        }, 300);
    }
}

class LightningStorm {
    constructor(svgId, minDelay = 2000, maxDelay = 6000) {
        this.svg = document.getElementById(svgId);
        this.minDelay = minDelay;
        this.maxDelay = maxDelay;
        this.scheduleNext();
    }

    scheduleNext() {
        const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
        setTimeout(() => {
            new LightningBolt(this.svg);
            this.scheduleNext();
        }, delay);
    }
}

// Inicialização junto com as faíscas
document.addEventListener('DOMContentLoaded', () => {
    new SparkGenerator('sparkContainer', 100);
    new LightningStorm('lightningCanvas');
});
function decryptTextEffect(elementId, finalText, speed = 50) {
    const chars = '!@#$%^&*()_+{}[]<>?|;:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const element = document.getElementById(elementId);
    let iteration = 0;

    const interval = setInterval(() => {
        let displayText = '';
        for (let i = 0; i < finalText.length; i++) {
            if (i < iteration) {
                displayText += finalText[i];
            } else {
                displayText += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        element.textContent = displayText;

        if (iteration >= finalText.length) {
            clearInterval(interval);
            element.textContent = finalText;
        }

        iteration++;
    }, speed);
}

// Executa o efeito ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logoTitle');
    const originalText = logo.textContent;
    decryptTextEffect('logoTitle', originalText, 60);
});
function typeCodeEffect(elementId, speed = 40) {
    const el = document.getElementById(elementId);
    const text = el.getAttribute('data-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            const char = text[index] === '\n' ? '<br>' : text[index] === ' ' ? '&nbsp;' : text[index];
            el.innerHTML += char;
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Rodar ao carregar
document.addEventListener('DOMContentLoaded', () => {
    typeCodeEffect('typingTarget', 40);

    // (manter seus outros efeitos se tiver)
    new SparkGenerator('sparkContainer', 100);
    new LightningStorm('lightningCanvas');
    decryptTextEffect('logoTitle', "Enzzo'SoftDev", 60);
});
