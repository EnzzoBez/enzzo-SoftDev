// Smooth scrolling para links de navegação internos
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

// Animação ao rolar (IntersectionObserver)
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

// Fundo do header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Formulário: botão "Enviando..." ao submeter
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

// Mobile menu toggle (se existir)
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Contador animado para estatísticas
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

// Ativa animação dos contadores quando a seção estiver visível
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// Efeito de digitação para código (tipo terminal)
function typeCode() {
    const codeElement = document.querySelector('.typing-animation');
    if (!codeElement) return;

    const lines = [
        "class EnzzoSoftDev {",
        " constructor() {",
        " this.visao = 'Excelência em software';",
        " this.especialidade =, 'Web & APIs';",
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

// Efeito hover nos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-20px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito hover nos itens do portfólio
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const image = this.querySelector('.portfolio-image');
        if (image) image.style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseleave', function () {
        const image = this.querySelector('.portfolio-image');
        if (image) image.style.transform = 'scale(1)';
    });
});

// Parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    if (heroVisual) heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Animação de revelação suave
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

// Classes para partículas (faíscas)
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
        if (!this.container) return;
        this.interval = interval;
        this.start();
    }

    start() {
        setInterval(() => {
            new Spark(this.container);
        }, this.interval);
    }
}

// Classes para raios
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
        if (!this.svg) return;
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

// Efeito de descriptografia (decrypt effect)
function decryptTextEffect(elementId, finalText, speed = 50) {
    const chars = '!@#$%^&*()_+{}[]<>?|;:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const element = document.getElementById(elementId);
    if (!element) return;

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

// Efeito digitação para código Java
function typeJavaCodeEffect(targetId, code, speed = 20) {
    const el = document.getElementById(targetId);
    if (!el) return;
    let i = 0;

    function type() {
        if (i < code.length) {
            el.textContent += code.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Atualiza item ativo do menu com base no scroll
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

// Adiciona classe 'loaded' após carregamento completo para animação
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Inicialização após o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
    // Partículas e raios
    new SparkGenerator('sparkContainer', 100);
    new LightningStorm('lightningCanvas');

    // Efeito decrypt no logo
    const logo = document.getElementById('logoTitle');
    if (logo) {
        decryptTextEffect('logoTitle', logo.textContent, 60);
    }

    // Efeito digitação de código Java
    const javaCodeSample = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Bem-vindo à Enzzo'SoftDev!");

        for (int i = 0; i < 3; i++) {
            System.out.println("Linha de código: " + i);
        }
    }
}`;
    typeJavaCodeEffect("javaCode", javaCodeSample, 25);

    // Form submit handler
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

    // Observer para descriptografia no rodapé
    const footer = document.getElementById('footerText');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                decryptTextEffect('footerText', footer.textContent, 50);
                footerObserver.disconnect();
            }
        });
        footerObserver.observe(footer);
    }

    // Animação de digitação no container `.typing-animation`
    typeCode();
});
