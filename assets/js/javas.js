const projects = {
  projeto1: {
    number: 'PROJETO 01 / DESENVOLVIMENTO WEB',
    title: 'Site de loja em PHP',
    tech: 'PHP • CSS • HTML5 • JavaScript • Bootstrap • MySQL',
    images: [
      { src: 'assets/img/tcc1.JPG', alt: 'Primeira tela do site de loja desenvolvido em PHP' },
      { src: 'assets/img/tcc2.JPG', alt: 'Segunda tela do site de loja desenvolvido em PHP' }
    ],
    description: 'Projeto de uma loja com sistema de login e registro. Um código gerado por um totem permite adicionar pontos à conta do usuário, que depois podem ser trocados por itens disponíveis na loja.',
    link: 'https://github.com/LibrasLuc/TCC'
  },
  projeto2: {
    number: 'PROJETO 02 / APLICAÇÃO',
    title: 'Equação de 2º grau',
    tech: 'C# • Lógica de programação',
    images: [{ src: 'assets/img/2grau.JPG', alt: 'Aplicação de cálculo de equação de segundo grau em C#' }],
    description: 'Aplicação desenvolvida em C# para automatizar o cálculo de equações de segundo grau de maneira prática e direta.',
    link: 'https://github.com/LibrasLuc/Equacao_Segundo_grau'
  },
  projeto3: {
    number: 'PROJETO 03 / APLICAÇÃO WEB',
    title: 'Cemig Web',
    tech: 'Python • JSON',
    images: [
      { src: 'assets/img/projeto 3.png', alt: 'Primeira tela do projeto 3 desenvolvido em Python' },
      { src: 'assets/img/projeto 3.1.png', alt: 'Segunda tela do projeto 3 desenvolvido em Python' }
    ],
    description: 'Aplicação web desenvolvida com Python e JSON. Insira aqui mais detalhes sobre o objetivo, as funcionalidades e os resultados do projeto Cemig Web.',
    link: 'https://github.com/LibrasLuc/cemig_web'
  },
  projeto4: {
    number: 'PROJETO 04 / GESTÃO EDUCACIONAL',
    title: 'Calendário de Professores',
    tech: 'Python • JavaScript • JSON • Batch',
    images: [
      { src: 'assets/img/prof1.png', alt: 'Tela principal da agenda de professores' },
      { src: 'assets/img/prof2.png', alt: 'Visualização dos horários e atividades dos professores' },
      { src: 'assets/img/prof3.png', alt: 'Calendário de professores preparado para visualização em PDF' }
    ],
    description: 'Plataforma web criada para centralizar e gerenciar a agenda semanal de professores e educadores. O sistema organiza atividades, horários, locais e público-alvo, mantém histórico de alterações, possui acesso autenticado e permite disponibilizar o calendário também em PDF.',
    link: 'https://github.com/LibrasLuc/calendario_professores'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const percentage = document.getElementById('loaderPercent');
  const startedAt = performance.now();

  const updateLoader = (now) => {
    const progress = Math.min(Math.round(((now - startedAt) / 2800) * 100), 100);
    percentage.textContent = `${progress}%`;
    if (progress < 100) requestAnimationFrame(updateLoader);
  };
  requestAnimationFrame(updateLoader);

  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
    setTimeout(() => loader.remove(), 600);
  }, 3000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const modal = document.getElementById('projectModal');
  const modalPanel = modal.querySelector('.modal-panel');
  const closeButton = modal.querySelector('.modal-close');
  const imageViewer = document.getElementById('imageViewer');
  const viewerImage = document.getElementById('viewerImage');
  const viewerCaption = document.getElementById('viewerCaption');
  const viewerCounter = document.getElementById('viewerCounter');
  let activeImages = [];
  let activeImageIndex = 0;
  let lastFocusedElement;

  function updateViewer() {
    const item = activeImages[activeImageIndex];
    if (!item) return;
    viewerImage.src = item.src;
    viewerImage.alt = item.alt;
    viewerCaption.textContent = item.alt;
    viewerCounter.textContent = `${activeImageIndex + 1} / ${activeImages.length}`;
  }

  function openImageViewer(index) {
    activeImageIndex = index;
    updateViewer();
    imageViewer.classList.add('is-open');
    imageViewer.setAttribute('aria-hidden', 'false');
  }

  function closeImageViewer() {
    imageViewer.classList.remove('is-open');
    imageViewer.setAttribute('aria-hidden', 'true');
  }

  function changeViewerImage(direction) {
    activeImageIndex = (activeImageIndex + direction + activeImages.length) % activeImages.length;
    updateViewer();
  }

  function renderGallery(gallery, images) {
    gallery.replaceChildren();
    if (!images.length) return;
    let selectedIndex = 0;
    const stage = document.createElement('div');
    stage.className = 'gallery-stage';
    const mainImage = document.createElement('img');
    mainImage.className = 'gallery-main';
    const expand = document.createElement('button');
    expand.type = 'button';
    expand.className = 'gallery-expand';
    expand.textContent = 'Ampliar ⛶';
    const toolbar = document.createElement('div');
    toolbar.className = 'gallery-toolbar';
    const counter = document.createElement('span');
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    const previous = document.createElement('button');
    previous.type = 'button'; previous.textContent = '‹'; previous.setAttribute('aria-label', 'Imagem anterior');
    const next = document.createElement('button');
    next.type = 'button'; next.textContent = '›'; next.setAttribute('aria-label', 'Próxima imagem');
    controls.append(previous, next);
    toolbar.append(counter, controls);
    const thumbnails = document.createElement('div');
    thumbnails.className = 'gallery-thumbnails';

    const selectImage = (index) => {
      selectedIndex = index;
      mainImage.src = images[index].src;
      mainImage.alt = images[index].alt;
      counter.textContent = `Imagem ${index + 1} de ${images.length}`;
      thumbnails.querySelectorAll('.gallery-thumb').forEach((thumb, thumbIndex) => thumb.classList.toggle('active', thumbIndex === index));
      previous.disabled = images.length < 2;
      next.disabled = images.length < 2;
    };

    images.forEach((item, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button'; thumb.className = 'gallery-thumb'; thumb.setAttribute('aria-label', `Ver imagem ${index + 1}`);
      const thumbImage = document.createElement('img');
      thumbImage.src = item.src; thumbImage.alt = ''; thumbImage.loading = 'lazy';
      const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2, '0');
      thumb.append(thumbImage, number);
      thumb.addEventListener('click', () => selectImage(index));
      thumbnails.append(thumb);
    });
    previous.addEventListener('click', () => selectImage((selectedIndex - 1 + images.length) % images.length));
    next.addEventListener('click', () => selectImage((selectedIndex + 1) % images.length));
    mainImage.addEventListener('click', () => openImageViewer(selectedIndex));
    expand.addEventListener('click', () => openImageViewer(selectedIndex));
    stage.append(mainImage, expand);
    gallery.append(stage, toolbar, thumbnails);
    selectImage(0);
  }

  function openProject(projectId) {
    const project = projects[projectId];
    if (!project) return;
    lastFocusedElement = document.activeElement;
    document.getElementById('modalNumber').textContent = project.number;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalTech').textContent = project.tech;
    document.getElementById('modalDescription').textContent = project.description;
    let gallery = document.getElementById('modalGallery');
    if (!gallery) {
      gallery = document.createElement('div');
      gallery.id = 'modalGallery';
      gallery.className = 'modal-gallery';
      document.getElementById('modalDescription').before(gallery);
    }
    activeImages = Array.isArray(project.images) ? project.images : [];
    renderGallery(gallery, activeImages);
    const link = document.getElementById('modalLink');
    link.hidden = !project.link;
    link.href = project.link || '#';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeButton.focus(), 100);
  }

  function closeProject() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('click', () => openProject(card.dataset.project));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeProject));
  imageViewer.querySelector('.viewer-close').addEventListener('click', closeImageViewer);
  imageViewer.querySelector('.viewer-prev').addEventListener('click', () => changeViewerImage(-1));
  imageViewer.querySelector('.viewer-next').addEventListener('click', () => changeViewerImage(1));
  imageViewer.addEventListener('click', (event) => { if (event.target === imageViewer) closeImageViewer(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageViewer.classList.contains('is-open')) closeImageViewer();
    else if (event.key === 'Escape' && modal.classList.contains('is-open')) closeProject();
    if (imageViewer.classList.contains('is-open') && event.key === 'ArrowLeft') changeViewerImage(-1);
    if (imageViewer.classList.contains('is-open') && event.key === 'ArrowRight') changeViewerImage(1);
    if (event.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusable = [...modalPanel.querySelectorAll('button, a:not([hidden])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
