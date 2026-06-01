/* ============================================================
   ELIEZERDEV Portfolio — Main JavaScript
   Rediseño: navegación por pantallas, video backgrounds,
   galería proyectos Wuthering Waves, partículas hero
   ============================================================ */

;(function () {
  'use strict'

  /* =================================================================
     DATA
     ================================================================= */
  const PROJECTS = [
    {
      id: 0,
      name: 'Corazón Azul VH',
      summary: 'Sitio web para organización de apoyo a niños con autismo',
      description: 'Plataforma web diseñada para visibilizar el trabajo de una organización dedicada al apoyo de niños con autismo. Incluye secciones informativas, galería de actividades y formularios de contacto.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      role: 'Desarrollador Frontend',
      problem: 'La organización carecía de presencia digital para difundir su labor y recibir apoyo comunitario.',
      learnings: 'Diseño centrado en accesibilidad, componentes reutilizables, optimización móvil.',
      gradient: 'linear-gradient(135deg, #1a5fd9, #0d3a8c)',
      initials: 'CA',
      url: '#',
      repo: '#'
    },
    {
      id: 1,
      name: 'Sitio Artista Musical',
      summary: 'Página profesional para músico independiente',
      description: 'Sitio web profesional con integración de redes sociales, galería de medios, discografía y sistema de contacto para contrataciones.',
      tech: ['HTML', 'CSS', 'JavaScript', 'APIs'],
      role: 'Desarrollador Fullstack',
      problem: 'El artista necesitaba centralizar su música, videos y redes en una sola plataforma profesional.',
      learnings: 'Integración de APIs de streaming, optimización de medios, identidad de marca digital.',
      gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
      initials: 'AM',
      url: '#',
      repo: '#'
    },
    {
      id: 2,
      name: 'Ecommerce',
      summary: 'Próximamente — Tienda en línea',
      description: 'Plataforma de comercio electrónico con catálogo de productos, carrito de compras, pasarela de pagos y panel de administración.',
      tech: ['Node.js', 'JavaScript', 'MySQL', 'APIs REST'],
      role: 'Arquitecto de Sistemas',
      problem: 'Proyecto en fase de planificación y desarrollo de arquitectura.',
      learnings: 'Arquitectura de sistemas transaccionales, pasarelas de pago, gestión de inventario.',
      gradient: 'linear-gradient(135deg, #0d9488, #065f46)',
      initials: 'EC',
      url: '#',
      repo: '#'
    },
    {
      id: 3,
      name: 'Dashboard Analytics',
      summary: 'Panel de visualización de datos en tiempo real',
      description: 'Dashboard interactivo para visualización de métricas clave con gráficos dinámicos, filtros y exportación de reportes.',
      tech: ['JavaScript', 'APIs', 'CSS', 'Node.js'],
      role: 'Desarrollador Fullstack',
      problem: 'Los datos del negocio estaban dispersos sin una vista unificada para la toma de decisiones.',
      learnings: 'Visualización de datos, rendimiento con grandes volúmenes, diseño de dashboards.',
      gradient: 'linear-gradient(135deg, #dc2626, #991b1b)',
      initials: 'DA',
      url: '#',
      repo: '#'
    },
    {
      id: 4,
      name: 'API RESTful',
      summary: 'Backend de servicios web escalable',
      description: 'API RESTful con autenticación JWT, documentación OpenAPI, tests automatizados y despliegue en contenedores.',
      tech: ['Node.js', 'MySQL', 'Docker', 'JWT'],
      role: 'Ingeniero Backend',
      problem: 'Los sistemas legacy no tenían una API unificada para integrar servicios.',
      learnings: 'Seguridad en APIs, CI/CD, documentación técnica, patrones REST.',
      gradient: 'linear-gradient(135deg, #ca8a04, #854d0e)',
      initials: 'API',
      url: '#',
      repo: '#'
    }
  ]

  const TOTAL_SECTIONS = 6

  /* =================================================================
     DOM REFS
     ================================================================= */
  function q (s, c) { return (c || document).querySelector(s) }
  function qa (s, c) { return [...(c || document).querySelectorAll(s)] }

  const sections = qa('.section')
  const navLinks = qa('.nav-link')
  const sectionsContainer = q('#sectionsContainer')
  const themeToggle = q('#themeToggle')
  const html = document.documentElement
  const projectsGallery = q('#projectsGallery')
  const projectInfoPanel = q('#projectInfoPanel')
  const infoBody = q('#infoBody')
  const infoThumbnails = q('#infoThumbnails')
  const infoClose = q('#infoClose')
  const contactForm = q('#contactForm')

  let currentIndex = 0
  let isTransitioning = false
  let isProjectOpen = false

  /* =================================================================
     SECTION NAVIGATION
     ================================================================= */

  function goToSection (index) {
    if (isTransitioning || index === currentIndex || index < 0 || index >= TOTAL_SECTIONS) return

    isTransitioning = true
    closeProjectInfo()

    const current = sections[currentIndex]
    const next = sections[index]

    // Pause current video, play next
    const currentVideo = q('.section-video', current)
    const nextVideo = q('.section-video', next)
    if (currentVideo) { currentVideo.pause(); currentVideo.muted = true }
    if (nextVideo) { nextVideo.play().catch(function () {}); nextVideo.muted = true }

    // Trigger leaving state
    current.classList.remove('active')
    current.classList.add('leaving')

    // Bring in next
    next.classList.add('active')

    // After transition, clean up
    setTimeout(function () {
      current.classList.remove('leaving')
      isTransitioning = false
    }, 350)

    // Update nav
    navLinks.forEach(function (link, i) {
      link.classList.toggle('active', i === index)
    })

    // Update URL hash
    var id = sections[index].id
    if (window.location.hash !== '#' + id) {
      history.pushState(null, null, '#' + id)
    }

    currentIndex = index
  }

  function nextSection () {
    goToSection(currentIndex + 1)
  }

  function prevSection () {
    goToSection(currentIndex - 1)
  }

  /* =================================================================
     WHEEL / KEYBOARD / CLICK NAV
     ================================================================= */

  // Wheel capture
  sectionsContainer.addEventListener('wheel', function (e) {
    e.preventDefault()
    if (isTransitioning || isProjectOpen) return
    if (e.deltaY > 0) nextSection()
    else prevSection()
  }, { passive: false })

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (isProjectOpen) {
      if (e.key === 'Escape') closeProjectInfo()
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      nextSection()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSection()
    }
  })

  // Nav link clicks
  navLinks.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      goToSection(i)
    })
  })

  // Hero action buttons
  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      var target = parseInt(this.dataset.section, 10)
      goToSection(target)
    })
  })

  // Hash change (back/forward)
  window.addEventListener('popstate', function () {
    var hash = window.location.hash || '#inicio'
    var targetIndex = 0
    sections.forEach(function (s, i) {
      if ('#' + s.id === hash) targetIndex = i
    })
    goToSection(targetIndex)
  })

  // Initial hash
  if (window.location.hash) {
    var initialHash = window.location.hash
    sections.forEach(function (s, i) {
      if ('#' + s.id === initialHash) {
        setTimeout(function () { goToSection(i) }, 100)
      }
    })
  }

  /* =================================================================
     VIDEO AUTO-PLAY ON LOAD
     ================================================================= */

  // Ensure hero video plays
  setTimeout(function () {
    var heroVideo = document.querySelector('#inicio .section-video')
    if (heroVideo) heroVideo.play().catch(function () {})
  }, 200)

  /* =================================================================
     THEME TOGGLE
     ================================================================= */

  function getPreferredTheme () {
    var stored = localStorage.getItem('eliezertheme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  function setTheme (theme) {
    html.setAttribute('data-theme', theme)
    localStorage.setItem('eliezertheme', theme)
  }

  setTheme(getPreferredTheme())

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'light' : 'dark')
  })

  /* =================================================================
     HERO — TECH COMPOSITION (particles + interactive grid)
     ================================================================= */

  function createParticles () {
    var container = q('#particleContainer')
    if (!container) return
    var count = 40
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div')
      p.className = 'tech-particle'
      p.style.left = Math.random() * 100 + '%'
      p.style.animationDuration = (8 + Math.random() * 12) + 's'
      p.style.animationDelay = (Math.random() * 10) + 's'
      p.style.width = p.style.height = (1 + Math.random() * 2) + 'px'
      container.appendChild(p)
    }
  }

  function initMouseReaction () {
    var heroRight = q('#heroTech')
    if (!heroRight) return
    var grid = q('#techGrid')

    heroRight.addEventListener('mousemove', function (e) {
      var rect = heroRight.getBoundingClientRect()
      var x = (e.clientX - rect.left) / rect.width - 0.5
      var y = (e.clientY - rect.top) / rect.height - 0.5

      if (grid) {
        grid.style.transform = 'translate(' + (x * 10) + 'px, ' + (y * 10) + 'px)'
        grid.style.backgroundPosition = (50 + x * 4) + '% ' + (50 + y * 4) + '%'
      }

      // Parallax for particles
      var particles = heroRight.querySelectorAll('.tech-particle')
      particles.forEach(function (p) {
        var speed = parseFloat(p.dataset.speed) || (0.3 + Math.random() * 0.5)
        p.dataset.speed = speed
        var px = parseFloat(p.dataset.baseX) || parseFloat(p.style.left)
        var py = parseFloat(p.dataset.baseY) || 0
        if (!p.dataset.baseX) {
          p.dataset.baseX = px
          p.dataset.baseY = py
        }
        p.style.transform = 'translate(' + (x * 15 * speed) + 'px, ' + (y * 15 * speed) + 'px)'
      })
    })
  }

  createParticles()
  initMouseReaction()

  /* =================================================================
     PROJECTS GALLERY
     ================================================================= */

  function renderProjects () {
    PROJECTS.forEach(function (project, i) {
      var card = document.createElement('div')
      card.className = 'project-card' + (i === 0 ? ' active-card' : '')
      card.dataset.index = i

      card.innerHTML =
        '<div class="project-card-bg" style="background: ' + project.gradient + '"></div>' +
        '<div class="project-card-label">' +
          '<h3>' + project.name + '</h3>' +
          '<span>' + project.summary + '</span>' +
        '</div>'

      // Hover effects
      card.addEventListener('mouseenter', function () {
        if (isProjectOpen) return
        var cards = projectsGallery.querySelectorAll('.project-card')
        cards.forEach(function (c) {
          if (c !== card) c.classList.add('dimmed')
        })
        card.classList.add('hovered')
      })

      card.addEventListener('mouseleave', function () {
        var cards = projectsGallery.querySelectorAll('.project-card')
        cards.forEach(function (c) {
          c.classList.remove('dimmed', 'hovered')
        })
      })

      // Click to open detail
      card.addEventListener('click', function () {
        openProjectInfo(i)
      })

      projectsGallery.appendChild(card)
    })
  }

  function openProjectInfo (index) {
    if (isProjectOpen) return
    isProjectOpen = true

    var project = PROJECTS[index]
    var cards = projectsGallery.querySelectorAll('.project-card')

    // Mark active card
    cards.forEach(function (c, i) {
      c.classList.remove('active-card', 'hovered', 'dimmed')
      if (i === index) c.classList.add('active-card')
      else c.classList.add('dimmed')
    })

    // Build info body
    infoBody.innerHTML =
      '<h2>' + project.name + '</h2>' +
      '<div class="info-tech">' +
        project.tech.map(function (t) { return '<span>' + t + '</span>' }).join('') +
      '</div>' +
      '<p class="info-desc">' + project.description + '</p>' +
      '<div class="info-section">' +
        '<h4>Rol</h4>' +
        '<p>' + project.role + '</p>' +
      '</div>' +
      '<div class="info-section">' +
        '<h4>Problema</h4>' +
        '<p>' + project.problem + '</p>' +
      '</div>' +
      '<div class="info-section">' +
        '<h4>Aprendizajes</h4>' +
        '<p>' + project.learnings + '</p>' +
      '</div>' +
      '<div class="info-actions">' +
        '<a href="' + project.url + '" class="btn btn-primary">Ver proyecto</a>' +
        '<a href="' + project.repo + '" class="btn btn-outline">Repositorio</a>' +
      '</div>'

    // Build thumbnails
    infoThumbnails.innerHTML = ''
    PROJECTS.forEach(function (p, i) {
      var thumb = document.createElement('div')
      thumb.className = 'info-thumb' + (i === index ? ' active-thumb' : '')
      thumb.innerHTML = '<h4>' + p.name + '</h4><span>' + p.summary + '</span>'
      thumb.addEventListener('click', function () {
        openProjectInfo(i)
      })
      infoThumbnails.appendChild(thumb)
    })

    projectInfoPanel.classList.add('open')

    // Pause section video for performance
    var sectionVideo = document.querySelector('#proyectos .section-video')
    if (sectionVideo) sectionVideo.pause()
  }

  function closeProjectInfo () {
    if (!isProjectOpen) return
    isProjectOpen = false
    projectInfoPanel.classList.remove('open')

    var cards = projectsGallery.querySelectorAll('.project-card')
    cards.forEach(function (c) {
      c.classList.remove('active-card', 'dimmed', 'hovered')
    })

    // Resume section video
    var sectionVideo = document.querySelector('#proyectos .section-video')
    if (sectionVideo) sectionVideo.play().catch(function () {})
  }

  infoClose.addEventListener('click', closeProjectInfo)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isProjectOpen) closeProjectInfo()
  })

  renderProjects()

  /* =================================================================
     CONTACT FORM
     ================================================================= */

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = q('#formName').value.trim()
    var email = q('#formEmail').value.trim()
    var message = q('#formMessage').value.trim()

    if (!name || !email || !message) {
      alert('Completa todos los campos.')
      return
    }

    var mailto = 'mailto:eliezerzm0312@gmail.com?subject=Contacto desde portfolio - ' +
      encodeURIComponent(name) + '&body=' + encodeURIComponent(
        'Nombre: ' + name + '\n' +
        'Correo: ' + email + '\n\n' +
        'Mensaje:\n' + message
      )

    window.location.href = mailto
    contactForm.reset()
  })

  /* =================================================================
     MOBILE MENU TOGGLE (simple fallback)
     ================================================================= */

  // Add a hamburger toggle functionality: clicking the nav-logo on mobile shows menu
  // Simple approach: logo toggles nav-links on small screens
  var logoToggle = document.querySelector('.nav-logo')
  logoToggle.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault()
      document.querySelector('.nav-links').classList.toggle('open')
    }
  })

  // Close mobile menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelector('.nav-links').classList.remove('open')
    })
  })

})()
