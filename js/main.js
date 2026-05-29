const PROJECTS = [
    {
        id: 0,
        name: 'E-Commerce Platform',
        desc: 'Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos integrada, panel de administración para gestión de productos y pedidos, y sistema de autenticación de usuarios con roles y permisos.',
    },
    {
        id: 1,
        name: 'Dashboard Analytics',
        desc: 'Panel de análisis en tiempo real con gráficos interactivos, filtros dinámicos, exportación de reportes en PDF y CSV, y visualización de datos con múltiples tipos de charts y métricas personalizables para tomada de decisiones basada en datos.',
    },
    {
        id: 2,
        name: 'Social Media App',
        desc: 'Aplicación de red social con sistema de publicaciones, likes, comentarios, chat en tiempo real, perfil de usuario personalizable, y feed algorítmico con infinite scroll y notificaciones push.',
    },
    {
        id: 3,
        name: 'AI Chat Interface',
        desc: 'Interfaz de chat con inteligencia artificial que incluye sugerencias contextuales, historial de conversaciones, modo oscuro/claro, y soporte para múltiples modelos de lenguaje con streaming de respuestas.',
    },
    {
        id: 4,
        name: 'Portfolio Generator',
        desc: 'Herramienta que genera portafolios personalizados a partir de un formulario interactivo, con múltiples temas, exportación a HTML estático, y preview en tiempo real con descarga directa.',
    }
];

// State
let currentSectionIndex = 0;
let isTransitioning = false;
let isWheelLocked = false;
let activeProjectIndex = 0; // Currently active project in the slider
const sections = [];
const navLinks = [];
let wheelTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    initSections();
    initNavbar();
    initProjectsSlider();
    initContactForm();
    initWheelNavigation();
    
    // Set first section as active
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
    
    // Update active nav link
    updateActiveNavLink(0);
    
    // Initialize project slider
    updateProjectSlider();
});

/* ===========================
   SECTIONS & NAVBAR
   =========================== */
function initSections() {
    const sectionEls = document.querySelectorAll('.section');
    sections.push(...sectionEls);
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinkEls = document.querySelectorAll('.nav-link');
    navLinks.push(...navLinkEls);
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                goToSection(index);
            }
        });
    });
    
    // Hide navbar on scroll down, show on scroll up (optional)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        // Since we disabled scrolling, this might not trigger
        // But keep it for safety
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });
}

function goToSection(index) {
    if (isTransitioning || index < 0 || index >= sections.length || index === currentSectionIndex) return;
    
    isTransitioning = true;
    
    // Deactivate current section
    sections[currentSectionIndex].classList.remove('active');
    
    // Activate new section
    sections[index].classList.add('active');
    
    // Update nav
    updateActiveNavLink(index);
    
    currentSectionIndex = index;
    
    // Reset transition flag after delay
    setTimeout(() => {
        isTransitioning = false;
    }, 800); // Match CSS transition duration
}

function updateActiveNavLink(index) {
    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
    });
}

/* ===========================
   WHEEL NAVIGATION (slide-like)
   =========================== */
function initWheelNavigation() {
    let lastWheelTime = 0;
    const wheelDelay = 800; // Match transition duration
    
    window.addEventListener('wheel', (e) => {
        // Prevent default scroll behavior
        e.preventDefault();
        
        // Ignore if transitioning or too fast
        const now = Date.now();
        if (isTransitioning || now - lastWheelTime < wheelDelay) return;
        
        lastWheelTime = now;
        
        // Determine direction
        if (e.deltaY > 0) {
            // Scroll down / next section
            goToSection((currentSectionIndex + 1) % sections.length);
        } else {
            // Scroll up / previous section
            goToSection((currentSectionIndex - 1 + sections.length) % sections.length);
        }
    }, { passive: false }); // Important: prevent default
    
    // Also handle touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    window.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        // Only act if swipe is significant
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left -> next section
                goToSection((currentSectionIndex + 1) % sections.length);
            } else {
                // Swipe right -> previous section
                goToSection((currentSectionIndex - 1 + sections.length) % sections.length);
            }
        }
    }, { passive: true });
}

/* ===========================
   PROJECTS SLIDER (3 vertical images)
   =========================== */
function initProjectsSlider() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const projectTitle = document.getElementById('projectsTitle');
    const projectDesc = document.getElementById('projectsDesc');
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectTrack = document.getElementById('projectsTrack');
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        activeProjectIndex = (activeProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
        updateProjectSlider();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        activeProjectIndex = (activeProjectIndex + 1) % PROJECTS.length;
        updateProjectSlider();
    });
    
    // Click on slides to make them active
    projectSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            // Set the clicked slide as active
            activeProjectIndex = index;
            updateProjectSlider();
        });
        
        // Hover effects
        slide.addEventListener('mouseenter', () => {
            // Only add hover effect if not the active slide
            if (!slide.classList.contains('active')) {
                slide.classList.add('hovered');
            }
        });
        
        slide.addEventListener('mouseleave', () => {
            slide.classList.remove('hovered');
        });
    });
}

function updateProjectSlider() {
    const projectTitle = document.getElementById('projectsTitle');
    const projectDesc = document.getElementById('projectsDesc');
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectTrack = document.getElementById('projectsTrack');
    
    // Update title and description
    const activeProject = PROJECTS[activeProjectIndex];
    projectTitle.textContent = activeProject.name;
    projectDesc.textContent = activeProject.desc;
    
    // Update slides: prev, active, next
    projectSlides.forEach((slide, index) => {
        // Remove all classes first
        slide.classList.remove('prev', 'active', 'next', 'hovered');
        
        const diff = ((index - activeProjectIndex) % PROJECTS.length + PROJECTS.length) % PROJECTS.length;
        
        if (diff === 0) {
            // Active project
            slide.classList.add('active');
        } else if (diff === 1) {
            // Next project
            slide.classList.add('next');
        } else if (diff === PROJECTS.length - 1) {
            // Previous project (since we're going backwards)
            slide.classList.add('prev');
        }
        // For projects further away, they stay with no special class (will be hidden by overflow or positioning)
    });
    
    // Update track position to center the active slide
    // Each slide takes about 26vw when active, 18vw when prev/next, with -6rem gap
    // We want the active slide to be centered
    const slideWidths = [18, 26, 18]; // prev, active, next in vw
    const gapInVw = 6 / (window.innerWidth / 100); // Convert 6rem to vw
    
    // Calculate offset to center the active slide
    const slidesBefore = activeProjectIndex;
    const offsetBefore = slidesBefore * (slideWidths[0] + gapInVw); // prev width + gap
    const offsetAfter = (PROJECTS.length - slidesBefore - 1) * (slideWidths[2] + gapInVw); // next width + gap
    
    // Actually, simpler approach: just translate so active slide is centered
    // Each slide takes space, we want to center index activeProjectIndex
    const totalSlides = PROJECTS.length;
    const centerIndex = Math.floor(totalSlides / 2);
    const indexDiff = activeProjectIndex - centerIndex;
    
    // Approximate width per slide: ~22vw average, gap: -6rem
    const approxSlideVw = 22;
    const gapVw = -6 / (window.innerWidth / 100);
    const totalOffset = indexDiff * (approxSlideVw + gapVw);
    
    projectTrack.style.transform = `translateX(${totalOffset}vw)`;
}

/* ===========================
   CONTACT FORM
   =========================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.contact__submit');
        const originalText = btn.textContent;
        
        btn.textContent = 'Enviado!';
        btn.style.background = 'var(--accent)';
        btn.style.color = 'var(--bg-primary)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            form.reset();
        }, 2000);
    });
}