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
      color: '#1a5fd9',
      image: 'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc',
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
      color: '#7c3aed',
      image: 'https://images.unsplash.com/photo-1574232861722-d1e837e4b0f0',
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
      color: '#0d9488',
      image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6',
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
      color: '#dc2626',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
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
      color: '#ca8a04',
      image: 'https://images.unsplash.com/photo-1760670399462-f5e479452c27',
      initials: 'API',
      url: '#',
      repo: '#'
    }
  ]

  const SKILLS = [
    { id: 0, name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'] },
    { id: 1, name: 'Backend', items: ['PHP', 'Node.js', 'APIs REST'] },
    { id: 2, name: 'Arquitectura', items: ['Diseño de Sistemas', 'Patrones', 'Escalabilidad'] },
    { id: 3, name: 'IA', items: ['Agentes IA', 'Context Engineering', 'Prompting'] },
    { id: 4, name: 'Automatización', items: ['Docs Automatizada', 'Workflows', 'DevOps'] },
    { id: 5, name: 'UX/UI', items: ['Figma', 'Prototipado', 'Sistemas Diseño'] },
    { id: 6, name: 'Gestión', items: ['Git/GitHub', 'VS Code', 'Opencode'] }
  ]

  const CONTACT_CELLS = [
    { label: 'Email', value: 'eliezerzm0312@gmail.com', href: 'mailto:eliezerzm0312@gmail.com', icon: 'mail' },
    { label: 'GitHub', value: '@EliezerZM', href: 'https://github.com/EliezerZM', icon: 'github' },
    { label: 'LinkedIn', value: '/in/eliezerzm', href: 'https://linkedin.com/in/eliezerzm', icon: 'linkedin' },
    { label: 'Instagram', value: '@eliezerzm_03', href: 'https://instagram.com/eliezerzm_03', icon: 'instagram' },
    { label: 'Facebook', value: '/eliezerzm', href: 'https://facebook.com/eliezerzm', icon: 'facebook' },
    { label: 'Ubicación', value: 'México', href: null, icon: 'location' },
    { label: 'Idiomas', value: 'Español / Inglés', href: null, icon: 'globe' }
  ]

  /* Árbol de habilidades: nodos desbloqueados (actuales) + bloqueados (por desbloquear) */
  const SKILL_TREE = [
    {
      id: 'core', name: 'Desarrollo', x: 50, y: 76, unlocked: true, core: true,
      items: ['Fundamentos', 'Lógica', 'Algoritmos'],
      iconType: 'stroke',
      icon: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'
    },
    {
      id: 'frontend', name: 'Frontend', x: 20, y: 54, unlocked: true,
      items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      iconType: 'fill',
      icon: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>'
    },
    {
      id: 'backend', name: 'Backend', x: 50, y: 54, unlocked: true,
      items: ['PHP', 'Node.js', 'APIs REST'],
      iconType: 'stroke',
      icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'
    },
    {
      id: 'arquitectura', name: 'Arquitectura', x: 80, y: 54, unlocked: true,
      items: ['Diseño de Sistemas', 'Patrones', 'Escalabilidad'],
      iconType: 'stroke',
      icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
    },
    {
      id: 'uxui', name: 'UX/UI', x: 8, y: 32, unlocked: true,
      items: ['Figma', 'Prototipado', 'Sistemas Diseño'],
      iconType: 'fill',
      icon: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>'
    },
    {
      id: 'ia', name: 'IA', x: 38, y: 32, unlocked: true,
      items: ['Agentes IA', 'Context Engineering', 'Prompting'],
      iconType: 'stroke',
      icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>'
    },
    {
      id: 'automatizacion', name: 'Automatización', x: 62, y: 32, unlocked: true,
      items: ['Docs Automatizada', 'Workflows', 'DevOps'],
      iconType: 'stroke',
      icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    },
    {
      id: 'gestion', name: 'Gestión', x: 90, y: 32, unlocked: true,
      items: ['Git/GitHub', 'VS Code', 'Opencode'],
      iconType: 'fill',
      icon: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'
    },
    {
      id: 'web-avanzado', name: 'Web Avanzado', x: 8, y: 11, unlocked: false,
      items: ['PWA', 'SPA Frameworks', 'WebGL / Three.js'],
      iconType: 'stroke',
      icon: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>'
    },
    {
      id: 'movil', name: 'Móvil', x: 28, y: 11, unlocked: false,
      items: ['React Native', 'Flutter', 'Kotlin / Swift'],
      iconType: 'stroke',
      icon: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>'
    },
    {
      id: 'desktop', name: 'Desktop', x: 48, y: 11, unlocked: false,
      items: ['Electron', '.NET', 'Tauri'],
      iconType: 'stroke',
      icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    },
    {
      id: 'cloud', name: 'Cloud / DevOps', x: 68, y: 11, unlocked: false,
      items: ['AWS / Azure', 'Docker', 'Kubernetes'],
      iconType: 'stroke',
      icon: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
    },
    {
      id: 'videojuegos', name: 'Videojuegos', x: 88, y: 11, unlocked: false,
      items: ['Unity', 'Godot', 'Unreal'],
      iconType: 'stroke',
      icon: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/>'
    }
  ]
  const SKILL_EDGES = [
    ['core', 'frontend'], ['core', 'backend'], ['core', 'arquitectura'],
    ['frontend', 'uxui'], ['backend', 'ia'], ['arquitectura', 'automatizacion'], ['arquitectura', 'gestion'],
    ['uxui', 'web-avanzado'], ['frontend', 'movil'], ['backend', 'desktop'], ['automatizacion', 'cloud'], ['gestion', 'videojuegos']
  ]

  const TOTAL_SECTIONS = 6
  const SECTION_NAMES = ['Inicio', 'Proyectos', 'Habilidades', 'Experiencia', 'Sobre mí', 'Contacto']

  function q (s, c) { return (c || document).querySelector(s) }
  function qa (s, c) { return [...(c || document).querySelectorAll(s)] }

  const sections = qa('.section')
  const tabs = qa('.hud-tab')
  const sectionsContainer = q('#sectionsContainer')
  const themeToggle = q('#themeToggle')
  const html = document.documentElement
  const projectsGallery = q('#projectsGallery')
  const projectInfoPanel = q('#projectInfoPanel')
  const infoBody = q('#infoBody')

  let currentIndex = 0
  let isTransitioning = false
  let isProjectOpen = false
  let contactFormOpen = false

  function openContactForm () { var s = q('#contactStage'); if (s) { s.classList.add('form-open'); contactFormOpen = true } }
  function closeContactForm () { var s = q('#contactStage'); if (s) { s.classList.remove('form-open'); contactFormOpen = false } }

  /* =================================================================
     RAIL (índice vertical)
     ================================================================= */

  function renderRail () {
    var rail = q('#hudRail')
    if (!rail) return
    SECTION_NAMES.forEach(function (name, i) {
      var item = document.createElement('div')
      item.className = 'hud-rail-item' + (i === 0 ? ' active' : '')
      item.textContent = String(i).padStart(2, '0')
      item.title = name
      item.addEventListener('click', function () { goToSection(i) })
      rail.appendChild(item)
    })
  }

  /* =================================================================
     SECTION NAVIGATION
     ================================================================= */

  function goToSection (index) {
    if (isTransitioning || index === currentIndex || index < 0 || index >= TOTAL_SECTIONS) return

    isTransitioning = true
    closeProjectInfo()
    closeContactForm()

    var current = sections[currentIndex]
    var next = sections[index]

    current.classList.remove('active')
    current.classList.add('leaving')
    next.classList.add('active')

    setTimeout(function () {
      current.classList.remove('leaving')
      isTransitioning = false
    }, 350)

    tabs.forEach(function (t, i) { t.classList.toggle('active', i === index) })
    qa('.hud-rail-item').forEach(function (r, i) { r.classList.toggle('active', i === index) })
    updateTelemetry(index)
    retriggerAssemble(next)

    var id = sections[index].id
    if (window.location.hash !== '#' + id) history.pushState(null, null, '#' + id)

    currentIndex = index
  }

  function nextSection () { goToSection(currentIndex + 1) }
  function prevSection () { goToSection(currentIndex - 1) }

  function retriggerAssemble (section) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    var content = q('.section-content', section)
    if (!content) return
    content.querySelectorAll(':scope > :not(.section-ghost)').forEach(function (el) {
      el.style.animation = 'none'
      void el.offsetWidth
      el.style.animation = ''
    })
  }

  sectionsContainer.addEventListener('wheel', function (e) {
    e.preventDefault()
    if (isTransitioning || isProjectOpen) return
    if (currentIndex === 5) {
      if (e.deltaY > 0) { if (!contactFormOpen) openContactForm(); return }
      if (contactFormOpen) { closeContactForm(); return }
      prevSection(); return
    }
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
      if (currentIndex === 5) { if (!contactFormOpen) openContactForm(); return }
      nextSection()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      if (currentIndex === 5 && contactFormOpen) { closeContactForm(); return }
      prevSection()
    }
  })

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function (e) { e.preventDefault(); goToSection(i) })
  })

  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault()
      goToSection(parseInt(this.dataset.section, 10))
    })
  })

  window.addEventListener('popstate', function () {
    var hash = window.location.hash || '#inicio'
    var t = 0
    sections.forEach(function (s, i) { if ('#' + s.id === hash) t = i })
    goToSection(t)
  })

  if (window.location.hash) {
    sections.forEach(function (s, i) {
      if ('#' + s.id === window.location.hash) setTimeout(function () { goToSection(i) }, 100)
    })
  }

  /* =================================================================
     TELEMETRY
     ================================================================= */

  function updateTelemetry (index) {
    var prog = q('#statProgress')
    var sec = q('#statSection')
    if (prog) prog.style.width = (((index + 1) / TOTAL_SECTIONS) * 100).toFixed(0) + '%'
    if (sec) sec.textContent = String(index).padStart(2, '0') + ' / 0' + TOTAL_SECTIONS
  }

  function initTelemetryFlicker () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    var coords = q('#statCoords')
    if (!coords) return
    setInterval(function () {
      var lat = (19.4 + (Math.random() - 0.5) * 0.04).toFixed(2)
      var lon = (-99.1 + (Math.random() - 0.5) * 0.04).toFixed(2)
      coords.textContent = 'LAT ' + lat + '° · LON ' + lon + '°'
    }, 1800)
  }

  /* =================================================================
     THEME
     ================================================================= */

  function getPreferredTheme () {
    var s = localStorage.getItem('eliezertheme')
    return s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  }
  function setTheme (t) { html.setAttribute('data-theme', t); localStorage.setItem('eliezertheme', t) }
  setTheme(getPreferredTheme())
  themeToggle.addEventListener('click', function () {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
  })

  /* =================================================================
     PROJECTS
     ================================================================= */

  function renderProjects () {
    PROJECTS.forEach(function (p, i) {
      var card = document.createElement('div')
      card.className = 'project-card'
      card.dataset.index = i
      card.innerHTML =
        '<div class="project-card-bg"><img src="' + p.image + '?w=800&q=70&fit=crop&auto=format" alt="' + p.name + '" loading="lazy"></div>' +
        '<div class="card-tel">P-0' + i + ' · 2026 · ' + p.tech.slice(0, 2).join('/') + '</div>' +
        '<div class="card-label-v">' + p.name + '</div>' +
        '<div class="card-content">' +
          '<h3 class="card-content-title">' + p.name + '</h3>' +
          '<div class="card-content-tech">' + p.tech.map(function (t) { return '<span>' + t + '</span>' }).join('') + '</div>' +
          '<p class="card-content-desc">' + p.description + '</p>' +
        '</div>'
      card.addEventListener('click', function () { openProjectInfo(i) })
      projectsGallery.appendChild(card)
    })
  }

  function initProjectHover () {
    var cards = qa('.project-card', projectsGallery)
    cards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        if (isProjectOpen) return
        card.style.flex = '2.5'
        card.style.zIndex = '5'
        cards.forEach(function (c) {
          if (c !== card) { c.style.flex = '0.65'; c.style.zIndex = '1' }
        })
      })
      card.addEventListener('mouseleave', function () {
        cards.forEach(function (c) { c.style.flex = ''; c.style.zIndex = '' })
      })
    })
  }

  function openProjectInfo (index) {
    if (isProjectOpen) return
    isProjectOpen = true
    var p = PROJECTS[index]
    projectsGallery.classList.add('is-panel-open')
    infoBody.innerHTML =
      '<h2>' + p.name + '</h2>' +
      '<div class="info-tech">' + p.tech.map(function (t) { return '<span>' + t + '</span>' }).join('') + '</div>' +
      '<p class="info-desc">' + p.description + '</p>' +
      '<div class="info-section"><h4>Rol</h4><p>' + p.role + '</p></div>' +
      '<div class="info-section"><h4>Problema</h4><p>' + p.problem + '</p></div>' +
      '<div class="info-section"><h4>Aprendizajes</h4><p>' + p.learnings + '</p></div>' +
      '<div class="info-actions"><a href="' + p.url + '" class="ibtn primary">Ver proyecto</a><a href="' + p.repo + '" class="ibtn">Repositorio</a></div>'
    projectInfoPanel.classList.add('open')
  }

  function closeProjectInfo () {
    if (!isProjectOpen) return
    isProjectOpen = false
    projectInfoPanel.classList.remove('open')
    projectsGallery.classList.remove('is-panel-open')
  }

  /* =================================================================
     SKILLS
     ================================================================= */

  function renderSkillTree () {
    var tree = q('#skillTree')
    var svg = q('#skillTreeLines')
    var detail = q('#skillDetail')
    var legend = q('#skillLegend')
    if (!tree || !svg) return

    var NS = 'http://www.w3.org/2000/svg'

    /* SVG: defs (filtro glow) + tronco + ramas */
    svg.innerHTML = ''

    var defs = document.createElementNS(NS, 'defs')
    defs.innerHTML =
      '<filter id="branch-glow" x="-30%" y="-30%" width="160%" height="160%">' +
        '<feGaussianBlur stdDeviation="2" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>'
    svg.appendChild(defs)

    /* Tronco */
    var trunk = document.createElementNS(NS, 'path')
    trunk.setAttribute('d', 'M 50,100 C 50,90 50,83 50,76')
    trunk.setAttribute('class', 'branch-trunk')
    trunk.setAttribute('filter', 'url(#branch-glow)')
    trunk.setAttribute('vector-effect', 'non-scaling-stroke')
    svg.appendChild(trunk)

    /* Ramas como Bezier cúbicos */
    var byId = {}
    SKILL_TREE.forEach(function (n) { byId[n.id] = n })

    SKILL_EDGES.forEach(function (e) {
      var a = byId[e[0]], b = byId[e[1]]
      if (!a || !b) return
      var midY = (a.y + b.y) / 2
      var d = 'M ' + a.x + ',' + a.y +
              ' C ' + a.x + ',' + midY +
              ' ' + b.x + ',' + midY +
              ' ' + b.x + ',' + b.y
      var path = document.createElementNS(NS, 'path')
      path.setAttribute('d', d)
      var isActive = a.unlocked && b.unlocked
      path.setAttribute('class', isActive ? 'branch-active' : 'branch-locked')
      if (isActive) path.setAttribute('filter', 'url(#branch-glow)')
      path.setAttribute('vector-effect', 'non-scaling-stroke')
      svg.appendChild(path)
    })

    /* Nodos y etiquetas */
    qa('.skill-node, .skill-node-label', tree).forEach(function (el) { el.remove() })

    var selected = null

    function showDetail (n) {
      detail.innerHTML =
        '<div class="sd-head">' +
          '<span class="sd-name">' + n.name + '</span>' +
          '<span class="sd-status ' + (n.unlocked ? 'on' : 'off') + '">' +
          (n.unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA · POR DESBLOQUEAR') +
          '</span>' +
        '</div>' +
        '<div class="sd-items' + (n.unlocked ? '' : ' off') + '">' +
        n.items.map(function (it) { return '<span>' + it + '</span>' }).join('') +
        '</div>'
    }

    SKILL_TREE.forEach(function (n) {
      var node = document.createElement('div')
      node.className = 'skill-node ' + (n.core ? 'core ' : '') + (n.unlocked ? 'unlocked' : 'locked')
      node.style.left = n.x + '%'
      node.style.top = n.y + '%'

      var svgAttrs = n.iconType === 'stroke'
        ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
        : 'fill="currentColor"'
      node.innerHTML = '<svg viewBox="0 0 24 24" ' + svgAttrs + '>' + n.icon + '</svg>'

      node.addEventListener('click', function () {
        if (selected) selected.classList.remove('selected')
        node.classList.add('selected')
        selected = node
        showDetail(n)
      })
      tree.appendChild(node)

      /* Etiqueta debajo del hexágono */
      var label = document.createElement('div')
      label.className = 'skill-node-label'
      label.textContent = n.name
      label.style.left = n.x + '%'
      var halfH = n.core ? 43 : (n.unlocked ? 31 : 26)
      label.style.top = 'calc(' + n.y + '% + ' + halfH + 'px + 5px)'
      tree.appendChild(label)
    })

    /* Leyenda */
    if (legend) {
      legend.innerHTML =
        '<span><i class="lg-dot on"></i> Desbloqueada</span>' +
        '<span><i class="lg-dot off"></i> Bloqueada</span>'
    }
  }

  /* =================================================================
     CONTACT
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
    var hero = q('#contactHero')
    var strip = q('#contactStrip')
    if (!hero) return
    CONTACT_CELLS.forEach(function (cell) {
      if (cell.href) {
        var tile = document.createElement('div')
        tile.className = 'contact-tile'
        tile.innerHTML = getIconSVG(cell.icon) +
          '<span class="contact-tile-label">' + cell.label + '</span>' +
          '<span class="contact-tile-value">' + cell.value + '</span>'
        tile.addEventListener('click', function () { window.open(cell.href, '_blank') })
        hero.appendChild(tile)
      } else if (strip) {
        var item = document.createElement('div')
        item.className = 'contact-strip-item'
        item.innerHTML = getIconSVG(cell.icon) + '<span>' + cell.label + ': <b>' + cell.value + '</b></span>'
        strip.appendChild(item)
      }
    })
  }

  /* =================================================================
     HERO TERMINAL
     ================================================================= */

  function initHeroTerminal () {
    var container = q('#heroTerminal')
    if (!container) return
    container.innerHTML =
      '<div class="hero-terminal-bar">' +
        '<span class="ht-dot r"></span>' +
        '<span class="ht-dot y"></span>' +
        '<span class="ht-dot g"></span>' +
        '<span class="ht-title">eliezerdev · ~/portfolio</span>' +
      '</div>' +
      '<div class="hero-terminal-body" id="htBody"></div>'
    var body = q('#htBody')
    var sequence = [
      { cmd: 'git clone github.com/EliezerZM/portfolio' },
      { out: 'Cloning... done. 47 objects.' },
      { cmd: 'npm install' },
      { out: '✓ 312 packages installed' },
      { cmd: 'npm run dev' },
      { out: '→ Local:   localhost:3000' },
      { cmd: "fetch('/api/projects').then(r=>r.json())" },
      { out: "[{id:0, name:'Coraz\xf3n Azul VH',...}]" }
    ]
    var lineIdx = 0
    var charIdx = 0
    function addLine (type, text) {
      var el = document.createElement('div')
      el.className = 'ht-line'
      if (type === 'cmd') {
        el.innerHTML = '<span class="ht-prompt">$</span><span class="ht-text"></span><span class="ht-cursor"></span>'
      } else {
        el.innerHTML = '<span class="ht-output">' + text + '</span>'
      }
      body.appendChild(el)
      while (body.children.length > 10) body.removeChild(body.firstChild)
      return el
    }
    function run () {
      if (lineIdx >= sequence.length) {
        addLine('cmd', '')
        setTimeout(function () { body.innerHTML = ''; lineIdx = 0; charIdx = 0; run() }, 3000)
        return
      }
      var item = sequence[lineIdx]
      if (item.out !== undefined) {
        addLine('out', item.out)
        lineIdx++
        setTimeout(run, 160)
      } else {
        var el = addLine('cmd', '')
        var textEl = el.querySelector('.ht-text')
        var cmd = item.cmd;
        (function typeChar () {
          if (charIdx < cmd.length) {
            textEl.textContent += cmd[charIdx++]
            setTimeout(typeChar, 52)
          } else {
            el.querySelector('.ht-cursor').style.display = 'none'
            lineIdx++; charIdx = 0
            setTimeout(run, 420)
          }
        })()
      }
    }
    run()
  }

  /* =================================================================
     CONTACT FORM
     ================================================================= */

  /* Para formulario real: crea un form gratis en formspree.io y reemplaza YOUR_FORMSPREE_ID */
  var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID'

  q('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault()
    var name = q('#formName').value.trim()
    var email = q('#formEmail').value.trim()
    var msg = q('#formMessage').value.trim()
    if (!name || !email || !msg) { alert('Completa todos los campos.'); return }
    if (FORM_ENDPOINT.indexOf('YOUR_FORMSPREE_ID') !== -1) {
      window.location.href = 'mailto:eliezerzm0312@gmail.com?subject=' +
        encodeURIComponent('Contacto desde portfolio - ' + name) + '&body=' +
        encodeURIComponent('Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + msg)
      return
    }
    var btn = q('.term-send')
    var origHTML = btn.innerHTML
    btn.textContent = 'ENVIANDO...'
    btn.disabled = true
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nombre: name, correo: email, mensaje: msg })
    }).then(function (res) {
      if (res.ok) {
        q('#contactForm').innerHTML = '<p class="form-success">▸ TRANSMISI\xd3N ENVIADA \xb7 GRACIAS</p>'
      } else {
        btn.innerHTML = origHTML; btn.disabled = false
      }
    }).catch(function () {
      btn.innerHTML = origHTML; btn.disabled = false
    })
  })

  q('#infoClose').addEventListener('click', closeProjectInfo)

  /* =================================================================
     BOOT INTRO
     ================================================================= */

  var boot = q('#boot')
  if (boot) {
    var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 200 : 1000
    setTimeout(function () { boot.classList.add('done') }, delay)
  }

  /* =================================================================
     INIT
     ================================================================= */

  renderRail()
  renderProjects()
  initProjectHover()
  renderSkillTree()
  renderContact()
  initHeroTerminal()
  updateTelemetry(0)
  initTelemetryFlicker()
})()
