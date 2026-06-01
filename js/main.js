;(function () {
  'use strict'

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

  const SKILLS = [
    { id: 0, name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'], col: 2 },
    { id: 1, name: 'Backend', items: ['PHP', 'Node.js', 'APIs REST'], col: 3 },
    { id: 2, name: 'Arquitectura', items: ['Diseño de Sistemas', 'Patrones', 'Escalabilidad'], col: 1 },
    { id: 3, name: 'IA', items: ['Agentes IA', 'Context Engineering', 'Prompting'], col: 2 },
    { id: 4, name: 'Automatización', items: ['Docs Automatizada', 'Workflows', 'DevOps'], col: 3 },
    { id: 5, name: 'UX/UI', items: ['Figma', 'Prototipado', 'Sistemas Diseño'], col: 2 },
    { id: 6, name: 'Gestión', items: ['Git/GitHub', 'VS Code', 'Opencode'], col: 3 }
  ]

  const CONTACT_CELLS = [
    { label: 'Email', value: 'eliezerzm0312@gmail.com', href: 'mailto:eliezerzm0312@gmail.com', icon: 'mail', cols: 2 },
    { label: 'GitHub', value: '@EliezerZM', href: 'https://github.com/EliezerZM', icon: 'github', cols: 1 },
    { label: 'LinkedIn', value: '/in/eliezerzm', href: 'https://linkedin.com/in/eliezerzm', icon: 'linkedin', cols: 1 },
    { label: 'Instagram', value: '@eliezerzm_03', href: 'https://instagram.com/eliezerzm_03', icon: 'instagram', cols: 1 },
    { label: 'Facebook', value: '/eliezerzm', href: 'https://facebook.com/eliezerzm', icon: 'facebook', cols: 1 },
    { label: 'Ubicación', value: 'México', href: null, icon: 'location', cols: 1 },
    { label: 'Idiomas', value: 'Español / Inglés', href: null, icon: 'globe', cols: 1 }
  ]

  const TOTAL_SECTIONS = 6

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
  const infoClose = q('#infoClose')
  const contactForm = q('#contactForm')

  let currentIndex = 0
  let isTransitioning = false
  let isProjectOpen = false
  let skillExpandId = null
  let contactExpandId = null

  /* =================================================================
     SECTION NAVIGATION
     ================================================================= */

  function goToSection (index) {
    if (isTransitioning || index === currentIndex || index < 0 || index >= TOTAL_SECTIONS) return

    isTransitioning = true
    closeProjectInfo()

    const current = sections[currentIndex]
    const next = sections[index]

    const currentVideo = q('.section-video', current)
    const nextVideo = q('.section-video', next)
    if (currentVideo) { currentVideo.pause(); currentVideo.muted = true }
    if (nextVideo) { nextVideo.play().catch(function () {}); nextVideo.muted = true }

    current.classList.remove('active')
    current.classList.add('leaving')
    next.classList.add('active')

    setTimeout(function () {
      current.classList.remove('leaving')
      isTransitioning = false
    }, 350)

    navLinks.forEach(function (link, i) {
      link.classList.toggle('active', i === index)
    })

    var id = sections[index].id
    if (window.location.hash !== '#' + id) {
      history.pushState(null, null, '#' + id)
    }

    currentIndex = index
  }

  function nextSection () { goToSection(currentIndex + 1) }
  function prevSection () { goToSection(currentIndex - 1) }

  sectionsContainer.addEventListener('wheel', function (e) {
    e.preventDefault()
    if (isTransitioning || isProjectOpen) return
    if (e.deltaY > 0) nextSection()
    else prevSection()
  }, { passive: false })

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

  navLinks.forEach(function (link, i) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      goToSection(i)
    })
  })

  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      var target = parseInt(this.dataset.section, 10)
      goToSection(target)
    })
  })

  window.addEventListener('popstate', function () {
    var hash = window.location.hash || '#inicio'
    var targetIndex = 0
    sections.forEach(function (s, i) {
      if ('#' + s.id === hash) targetIndex = i
    })
    goToSection(targetIndex)
  })

  if (window.location.hash) {
    var initialHash = window.location.hash
    sections.forEach(function (s, i) {
      if ('#' + s.id === initialHash) {
        setTimeout(function () { goToSection(i) }, 100)
      }
    })
  }

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
     PROJECTS — Diagonal Cut Cards + Diagonal Separators
     ================================================================= */

  function renderProjects () {
    PROJECTS.forEach(function (project, i) {
      var card = document.createElement('div')
      card.className = 'project-card'
      card.dataset.index = i

      card.innerHTML =
        '<div class="project-card-bg" style="background: ' + project.gradient + '"></div>' +
        '<div class="card-label-v">' + project.name + '</div>' +
        '<div class="card-content">' +
          '<h3 class="card-content-title">' + project.name + '</h3>' +
          '<div class="card-content-tech">' +
            project.tech.map(function (t) { return '<span>' + t + '</span>' }).join('') +
          '</div>' +
          '<p class="card-content-desc">' + project.description + '</p>' +
          '<div class="card-content-sections">' +
            '<div class="cs"><h4>Rol</h4><p>' + project.role + '</p></div>' +
            '<div class="cs"><h4>Problema</h4><p>' + project.problem + '</p></div>' +
            '<div class="cs"><h4>Aprendizajes</h4><p>' + project.learnings + '</p></div>' +
          '</div>' +
          '<div class="card-content-actions">' +
            '<a href="' + project.url + '" class="btn btn-primary">Ver proyecto</a>' +
            '<a href="' + project.repo + '" class="btn btn-outline">Repositorio</a>' +
          '</div>' +
        '</div>'

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

    projectsGallery.classList.add('is-panel-open')

    cards.forEach(function (c, i) {
      c.classList.remove('active-card')
      if (i === index) c.classList.add('active-card')
    })

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

    projectInfoPanel.classList.add('open')

    var sectionVideo = document.querySelector('#proyectos .section-video')
    if (sectionVideo) sectionVideo.pause()
  }

  function closeProjectInfo () {
    if (!isProjectOpen) return
    isProjectOpen = false
    projectInfoPanel.classList.remove('open')

    projectsGallery.classList.remove('is-panel-open')

    var cards = projectsGallery.querySelectorAll('.project-card')
    cards.forEach(function (c) {
      c.classList.remove('active-card')
    })

    var sectionVideo = document.querySelector('#proyectos .section-video')
    if (sectionVideo) sectionVideo.play().catch(function () {})
  }

  infoClose.addEventListener('click', closeProjectInfo)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isProjectOpen) closeProjectInfo()
  })

  /* =================================================================
     SKILLS — Hexagonal Honeycomb Grid
     ================================================================= */

  function renderSkills () {
    var grid = q('#skillsHexGrid')
    if (!grid) return

    var rowLayout = [
      [null, null, 0, 1, null],
      [2, null, 3, null, 4],
      [null, null, 5, 6, null]
    ]

    rowLayout.forEach(function (row) {
      row.forEach(function (skillId) {
        if (skillId === null) {
          var spacer = document.createElement('div')
          spacer.style.visibility = 'hidden'
          spacer.style.pointerEvents = 'none'
          grid.appendChild(spacer)
          return
        }
        var skill = SKILLS[skillId]
        if (!skill) return
        var cell = document.createElement('div')
        cell.className = 'hex-cell'
        cell.dataset.id = skill.id
        cell.innerHTML =
          '<div class="hex-cell-title">' + skill.name + '</div>' +
          '<div class="hex-cell-items">' +
            skill.items.map(function (item) { return '<span>' + item + '</span>' }).join('') +
          '</div>'

        cell.addEventListener('click', function () {
          if (skillExpandId === skill.id) {
            skillExpandId = null
            cell.classList.remove('is-expanded')
          } else {
            if (skillExpandId !== null) {
              var prev = grid.querySelector('.hex-cell.is-expanded')
              if (prev) prev.classList.remove('is-expanded')
            }
            skillExpandId = skill.id
            cell.classList.add('is-expanded')
          }
        })

        grid.appendChild(cell)
      })
    })
  }

  /* =================================================================
     EXPERIENCE — Circuit Board (already in HTML)
     ================================================================= */

  function initCircuit () {
    var nodes = qa('.circuit-node')
    nodes.forEach(function (node) {
      node.addEventListener('click', function () {
        var wasExpanded = node.classList.contains('is-expanded')
        nodes.forEach(function (n) { n.classList.remove('is-expanded') })
        if (!wasExpanded) node.classList.add('is-expanded')
      })
    })
  }

  /* =================================================================
     CONTACT — Matrix Keyboard
     ================================================================= */

  function getIconSVG (type) {
    var icons = {
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
    }
    return icons[type] || ''
  }

  function renderContact () {
    var matrix = q('#contactMatrix')
    if (!matrix) return

    CONTACT_CELLS.forEach(function (cell, i) {
      var el = document.createElement('div')
      el.className = 'contact-cell' + (cell.cols > 1 ? ' span-' + cell.cols : '')
      el.dataset.id = i

      el.innerHTML =
        getIconSVG(cell.icon) +
        '<span class="contact-cell-label">' + cell.label + '</span>' +
        '<span class="contact-cell-value">' + cell.value + '</span>'

      el.addEventListener('click', function () {
        if (contactExpandId === i) {
          contactExpandId = null
          el.classList.remove('is-expanded')
          if (cell.href) window.open(cell.href, '_blank')
        } else {
          if (contactExpandId !== null) {
            var prev = matrix.querySelector('.contact-cell.is-expanded')
            if (prev) prev.classList.remove('is-expanded')
          }
          contactExpandId = i
          el.classList.add('is-expanded')
          if (cell.href) window.open(cell.href, '_blank')
        }
      })

      matrix.appendChild(el)
    })
  }

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
     MOBILE MENU
     ================================================================= */

  var logoToggle = document.querySelector('.nav-logo')
  logoToggle.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault()
      document.querySelector('.nav-links').classList.toggle('open')
    }
  })

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelector('.nav-links').classList.remove('open')
    })
  })

  /* =================================================================
     INIT
     ================================================================= */

  renderProjects()
  renderSkills()
  renderContact()
  initCircuit()

  /* =================================================================
     PRESERVE ABOUT DIAGONAL HOVER (flex expand)
     ================================================================= */
  var aboutSides = qa('.about-side')
  aboutSides.forEach(function (side) {
    side.addEventListener('mouseenter', function () {
      aboutSides.forEach(function (s) {
        if (s !== side) s.style.flex = '0.8'
      })
    })
    side.addEventListener('mouseleave', function () {
      aboutSides.forEach(function (s) {
        s.style.flex = '1'
      })
    })
  })

})()
