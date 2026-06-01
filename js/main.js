/* ============================================================
   ELIEZERDEV Portfolio — Main JavaScript
   ============================================================ */

;(function () {
  'use strict'

  // ===== PROJECT DATA =====
  const PROJECTS = [
    {
      id: 0,
      name: 'Corazón Azul VH',
      summary: 'Sitio web para organización de apoyo a niños con autismo.',
      description: 'Plataforma web diseñada para visibilizar el trabajo de una organización dedicada al apoyo de niños con autismo. Incluye secciones informativas, galería de actividades y medios de contacto directo.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      problem: 'La organización carecía de presencia digital para difundir su labor y recibir apoyo de la comunidad.',
      learnings: 'Diseño centrado en accesibilidad, componentes reutilizables y optimización para dispositivos móviles.',
      github: '#',
      demo: '#',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      initials: 'CA'
    },
    {
      id: 1,
      name: 'Sitio Artista Musical',
      summary: 'Página profesional para artista independiente.',
      description: 'Sitio web profesional para músico independiente, con integración de redes sociales, galería de medios, discografía y sistema de contacto para contrataciones.',
      tech: ['HTML', 'CSS', 'JavaScript', 'APIs'],
      problem: 'El artista necesitaba una presencia web profesional que centralizara su música, videos y redes en un solo lugar.',
      learnings: 'Integración de APIs de streaming, optimización de medios audiovisuales y diseño con identidad de marca.',
      github: '#',
      demo: '#',
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      initials: 'AM'
    },
    {
      id: 2,
      name: 'Ecommerce',
      summary: 'Próximamente — Tienda en línea.',
      description: 'Plataforma de comercio electrónico en desarrollo. Implementación de catálogo de productos, carrito de compras y procesamiento de pagos.',
      tech: ['Node.js', 'JavaScript', 'MySQL', 'APIs'],
      problem: 'Proyecto en fase de planificación y desarrollo inicial.',
      learnings: 'Arquitectura de sistemas ecommerce, pasarelas de pago y gestión de inventario.',
      github: '#',
      demo: '#',
      gradient: 'linear-gradient(135deg, #10b981, #047857)',
      initials: 'EC'
    }
  ]

  // ===== DOM REFS =====
  const $ = (s, c) => (c || document).querySelector(s)
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)]

  const sections = $$('.section')
  const navLinks = $$('.nav-link')
  const projectsGallery = $('#projectsGallery')
  const projectDetail = $('#projectDetail')
  const detailContent = $('#detailContent')
  const detailClose = $('#detailClose')
  const themeToggle = $('#themeToggle')
  const navToggle = $('#navToggle')
  const navLinksContainer = $('#navLinks')
  const contactForm = $('#contactForm')
  const html = document.documentElement

  // ===== HASH-BASED NAVIGATION =====
  function navigateToSection (hash) {
    if (!hash) return
    const target = document.querySelector(hash)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth' })
  }

  function updateActiveLink (hash) {
    navLinks.forEach(function (link) {
      var linkHash = link.getAttribute('href')
      link.classList.toggle('active', linkHash === hash)
    })
  }

  // Nav link clicks
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      var hash = this.getAttribute('href')

      // Update URL without triggering hashchange
      history.pushState(null, null, hash)

      navigateToSection(hash)
      updateActiveLink(hash)

      // Close mobile menu
      navLinksContainer.classList.remove('open')
      navToggle.classList.remove('active')
    })
  })

  // Browser back/forward
  window.addEventListener('popstate', function () {
    var hash = window.location.hash || '#inicio'
    navigateToSection(hash)
    updateActiveLink(hash)
  })

  // Initial load
  if (window.location.hash) {
    setTimeout(function () {
      navigateToSection(window.location.hash)
      updateActiveLink(window.location.hash)
    }, 100)
  }

  // ===== INTERSECTION OBSERVER (active section) =====
  function handleIntersection (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id
        var hash = '#' + id

        // Update URL without scroll
        if (window.location.hash !== hash) {
          history.replaceState(null, null, hash)
        }

        updateActiveLink(hash)
      }
    })
  }

  var observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '-30% 0px -30% 0px',
    threshold: 0
  })

  sections.forEach(function (section) {
    observer.observe(section)
  })

  // ===== THEME TOGGLE =====
  function getPreferredTheme () {
    var stored = localStorage.getItem('eliezertheme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }

  function setTheme (theme) {
    html.setAttribute('data-theme', theme)
    localStorage.setItem('eliezertheme', theme)
  }

  // Init theme
  setTheme(getPreferredTheme())

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme')
    var next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
  })

  // ===== PROJECTS GALLERY =====
  function renderProjects () {
    PROJECTS.forEach(function (project) {
      var card = document.createElement('div')
      card.className = 'project-card'
      card.dataset.project = project.id

      card.innerHTML =
        '<div class="project-card-image" style="background: ' + project.gradient + '">' +
          '<span style="opacity: 0.3; font-size: 4rem; font-weight: 900; color: #fff;">' + project.initials + '</span>' +
        '</div>' +
        '<div class="project-card-info">' +
          '<h3>' + project.name + '</h3>' +
          '<p class="project-card-summary">' + project.summary + '</p>' +
        '</div>'

      card.addEventListener('click', function () {
        openProjectDetail(project)
      })

      projectsGallery.appendChild(card)
    })
  }

  function openProjectDetail (project) {
    detailContent.innerHTML =
      '<div class="detail-header">' +
        '<h3>' + project.name + '</h3>' +
        '<div class="detail-tech">' +
          project.tech.map(function (t) { return '<span>' + t + '</span>' }).join('') +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<p>' + project.description + '</p>' +
        '<h4>Problema resuelto</h4>' +
        '<p>' + project.problem + '</p>' +
        '<h4>Aprendizajes</h4>' +
        '<p>' + project.learnings + '</p>' +
      '</div>' +
      '<div class="detail-buttons">' +
        '<a href="' + project.github + '" class="btn btn-secondary" target="_blank" rel="noopener">GitHub</a>' +
        '<a href="' + project.demo + '" class="btn btn-primary" target="_blank" rel="noopener">Demo</a>' +
      '</div>'

    projectDetail.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  function closeProjectDetail () {
    projectDetail.classList.remove('active')
    document.body.style.overflow = ''
  }

  detailClose.addEventListener('click', closeProjectDetail)

  projectDetail.addEventListener('click', function (e) {
    if (e.target === this) closeProjectDetail()
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProjectDetail()
  })

  renderProjects()

  // ===== MOBILE NAV =====
  navToggle.addEventListener('click', function () {
    navLinksContainer.classList.toggle('open')
    navToggle.classList.toggle('active')
  })

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinksContainer.classList.contains('open') &&
      !e.target.closest('.navbar')
    ) {
      navLinksContainer.classList.remove('open')
      navToggle.classList.remove('active')
    }
  })

  // ===== CONTACT FORM =====
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = $('#formName').value.trim()
    var email = $('#formEmail').value.trim()
    var message = $('#formMessage').value.trim()

    if (!name || !email || !message) {
      alert('Por favor, completa todos los campos.')
      return
    }

    // Placeholder — integrar con servicio de email posteriormente
    var mailto = 'mailto:eliezerzm0312@gmail.com?subject=Contacto desde portfolio - ' +
      encodeURIComponent(name) + '&body=' + encodeURIComponent(
        'Nombre: ' + name + '\n' +
        'Correo: ' + email + '\n\n' +
        'Mensaje:\n' + message
      )

    window.location.href = mailto
    contactForm.reset()
  })

})()
