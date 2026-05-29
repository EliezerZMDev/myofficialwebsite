const PROJECTS = [
    {
        id: 0,
        name: 'E-Commerce Platform',
        tech: 'React, Node.js, MongoDB, Stripe',
        date: 'Mar 2026',
        desc: 'Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos integrada, panel de administración para gestión de productos y pedidos, y sistema de autenticación de usuarios con roles y permisos.',
    },
    {
        id: 1,
        name: 'Dashboard Analytics',
        tech: 'Vue.js, D3.js, Express, PostgreSQL',
        date: 'Ene 2026',
        desc: 'Panel de análisis en tiempo real con gráficos interactivos, filtros dinámicos, exportación de reportes en PDF y CSV, y visualización de datos con múltiples tipos de charts y métricas personalizables para tomada de decisiones basada en datos.',
    },
    {
        id: 2,
        name: 'Social Media App',
        tech: 'React Native, Firebase, Socket.io',
        date: 'Nov 2025',
        desc: 'Aplicación de red social con sistema de publicaciones, likes, comentarios, chat en tiempo real, perfil de usuario personalizable, y feed algorítmico con infinite scroll y notificaciones push.',
    },
    {
        id: 3,
        name: 'AI Chat Interface',
        tech: 'TypeScript, OpenAI API, Next.js',
        date: 'Dic 2025',
        desc: 'Interfaz de chat con inteligencia artificial que incluye sugerencias contextuales, historial de conversaciones, modo oscuro/claro, y soporte para múltiples modelos de lenguaje con streaming de respuestas.',
    },
    {
        id: 4,
        name: 'Portfolio Generator',
        tech: 'HTML5, CSS3, JavaScript, Canvas API',
        date: 'Oct 2025',
        desc: 'Herramienta que genera portafolios personalizados a partir de un formulario interactivo, con múltiples temas, exportación a HTML estático, y preview en tiempo real con descarga directa.',
    }
];

// State
let currentSectionIndex = 0;
let isTransitioning = false;
let isWheelLocked = false;
const sections = [];
const navLinks = [];
let wheelTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    initSections();
    initNavbar();
    initProjects();
    initContactForm();
    initWheelNavigation();
    
    // Set first section as active
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
    
    // Update active nav link
    updateActiveNavLink(0);
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
   PROJECTS INTERACTIONS
   =========================== */
function initProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    const detailPanel = document.getElementById('projectDetailPanel');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailTags = document.getElementById('detailTags');
    const detailTech = document.getElementById('detailTech');
    const detailDate = document.getElementById('detailDate');
    const closeBtn = document.getElementById('closeDetailPanel');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.project);
            const project = PROJECTS[id];
            
            // Update detail panel content
            detailTitle.textContent = project.name;
            detailDesc.textContent = project.desc;
            detailTech.textContent = project.tech;
            detailDate.textContent = project.date;
            
            // Generate tags from tech string (simple split)
            const tags = project.tech.split(', ').map(tag => `<span class="project-detail__tag">${tag}</span>`).join('');
            detailTags.innerHTML = tags;
            
            // Show panel
            detailPanel.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when panel open
            
            // Optional: Add active class to clicked card for visual feedback
            projectCards.forEach(c => c.classList.remove('active-project'));
            card.classList.add('active-project');
        });
    });
    
    // Close panel
    function closeDetailPanel() {
        detailPanel.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active-project'));
    }
    
    closeBtn.addEventListener('click', closeDetailPanel);
    
    // Close when clicking outside content
    detailPanel.addEventListener('click', (e) => {
        if (e.target === detailPanel) {
            closeDetailPanel();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailPanel.classList.contains('active')) {
            closeDetailPanel();
        }
    });
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