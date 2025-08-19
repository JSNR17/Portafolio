
// const escritorAutomatico = document.querySelector('.escritor-automatico');
// const text = escritorAutomatico.textContent;
// escritorAutomatico.textContent = '';

// let i = 0;
// function typeWriter() {
//     if (i < text.length) {
//         escritorAutomatico.textContent += text.charAt(i);
//         i++;
//         setTimeout(typeWriter, 100);
//     }
// }


const textoAnimadoSpan = document.querySelector('.texto-animado');
const textoCompleto = textoAnimadoSpan ? textoAnimadoSpan.textContent : '';
if (textoAnimadoSpan) {
  textoAnimadoSpan.textContent = '';
}
let index = 0;
// let isDeleting = false; // Removido: No se necesita para la animación de solo escritura

function typeWriter() {
    const velocidadEscritura = 70; // Velocidad de escritura (ms por carácter)
    // const velocidadBorrado = 50; // Removido
    // const retardoEntreTextos = 1500; // Removido

    if (!textoAnimadoSpan) return;
    let textoActual = textoAnimadoSpan.textContent;

    // if (!isDeleting) { // Removido
        // Escribiendo
        if (index < textoCompleto.length) {
            textoAnimadoSpan.textContent += textoCompleto.charAt(index);
            index++;
            setTimeout(typeWriter, velocidadEscritura);
        } else {
            // Texto completo, parpadear el cursor
            textoAnimadoSpan.classList.add('mostrando-cursor');
        }
    // } else { // Removido
        // Borrando - Removido toda la lógica de borrado
    // }
    
    // Manejo del cursor (añade/elimina una clase para el parpadeo)
    // textoAnimadoSpan.classList.toggle('mostrando-cursor', !isDeleting && index === textoCompleto.length || isDeleting && index === 0); // Removido

}

window.addEventListener('load', () => {
    if (textoAnimadoSpan) typeWriter();
    animateSkills();
});

// Observer para animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimables = document.querySelectorAll('.animacion-desplazamiento, .desenfoque-entrada, .revelacion-desplazamiento');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    elementosAnimables.forEach((el) => observador.observe(el));

    // Parallax sutil en decoraciones del hero
    const hero = document.querySelector('.seccion-hero');
    const burbujas = hero ? hero.querySelectorAll('.hero-decoraciones .burbuja') : [];
    if (hero && burbujas.length) {
        hero.addEventListener('pointermove', (e) => {
            const rect = hero.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            burbujas.forEach((b, i) => {
                const intensity = (i + 1) * 8; // capas con distinta profundidad
                b.style.transform = `translate(${relX * intensity}px, ${relY * intensity}px)`;
            });
        });
    }

    // Indicador activo deslizante en navbar
    const contenedorEnlaces = document.querySelector('.enlaces-navegacion');
    const indicador = contenedorEnlaces ? contenedorEnlaces.querySelector('.indicador-activo') : null;
    const enlaces = document.querySelectorAll('.enlace-navegacion');

    window.addEventListener('resize', () => {
        const activo = document.querySelector('.enlace-navegacion.activo');
        if (activo) actualizarIndicadorActivo(activo);
    });

    window.addEventListener('scroll', () => {
        const activo = document.querySelector('.enlace-navegacion.activo');
        if (activo) actualizarIndicadorActivo(activo);
    });

    window.actualizarIndicadorActivo = function(link) {
        if (!indicador || !link) return;
        const rectLink = link.getBoundingClientRect();
        const rectContainer = contenedorEnlaces.getBoundingClientRect();
        const width = Math.max(24, rectLink.width * 0.6);
        const left = rectLink.left - rectContainer.left + (rectLink.width - width) / 2;
        indicador.style.width = `${width}px`;
        indicador.style.transform = `translateX(${left}px)`;
    }
});


function animateSkills() {
    const barrasProgreso = document.querySelectorAll('.barra-progreso-habilidad');
    barrasProgreso.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

const alternarTema = document.getElementById('alternar-tema');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const enlacesNavegacion = document.querySelector('.enlaces-navegacion');
// const audioPlayer = document.getElementById('background-music');
// const volumeBtn = document.querySelector('.volume-btn');
// const volumeSlider = document.querySelector('.volume-slider');
// const audioProgressBar = document.querySelector('.progress');
// const timeDisplay = document.querySelector('.time-display');
const navProgressBar = document.querySelector('.nav-progress');
const alternadorMenuMovil = document.querySelector('.alternador-menu-movil');
const barraNavegacion = document.querySelector('.barra-navegacion');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-theme', savedTheme === 'dark');
} else {
    body.classList.remove('dark-theme');
}

function updateThemeIcons() {
    const isDark = body.classList.contains('dark-theme');
    if (!alternarTema) return;
    const sunIcon = alternarTema.querySelector('.fa-sun');
    const moonIcon = alternarTema.querySelector('.fa-moon');
    
    if (isDark) {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }
}

updateThemeIcons();

if (alternarTema) {
  alternarTema.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const isDark = body.classList.contains('dark-theme');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
      alternarTema.classList.remove('theme-pulse');
      void alternarTema.offsetWidth;
      alternarTema.classList.add('theme-pulse');
  });
}

prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        updateThemeIcons();
    }
});

// if (audioPlayer && volumeSlider) { // Envuelve el código para que solo se ejecute si los elementos existen
//     audioPlayer.volume = volumeSlider.value;
// }






   
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section');
        const enlacesNavegacionLinks = document.querySelectorAll('.enlace-navegacion');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Fallback al primer enlace si estamos en el hero (sin link de #inicio)
        if (!currentSection && enlacesNavegacionLinks.length) {
            const firstHref = enlacesNavegacionLinks[0].getAttribute('href');
            currentSection = firstHref ? firstHref.replace('#', '') : '';
        }

        enlacesNavegacionLinks.forEach(link => {
            link.classList.remove('activo');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('activo');
                actualizarIndicadorActivo(link);
            }
        });
    }

  
window.addEventListener('scroll', () => {
    const barraNavegacion = document.querySelector('.barra-navegacion'); 
    if (window.scrollY > 50) { 
        barraNavegacion.classList.add('scroll-fijo');
    } else {
        barraNavegacion.classList.remove('scroll-fijo');
    }

    // Progreso de scroll fino en la barra
    const docAltura = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = Math.max(0, Math.min(1, window.scrollY / (docAltura || 1)));
    barraNavegacion.style.setProperty('--scroll-progress', progreso);
    barraNavegacion.classList.add('scroll-progreso');

    // Actualizar enlace activo e indicador
    updateActiveMenu();
}); 


document.querySelectorAll('.enlace-navegacion').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - barraNavegacion.offsetHeight, 
                behavior: 'smooth'
            });
        }
       
        if (enlacesNavegacion.classList.contains('menu-movil-abierto')) {
            enlacesNavegacion.classList.remove('menu-movil-abierto');
        }
        // Mover indicador activo al enlace clicado
        actualizarIndicadorActivo(this);
    });
});


if (alternadorMenuMovil && enlacesNavegacion) {
  alternadorMenuMovil.addEventListener('click', () => {
      enlacesNavegacion.classList.toggle('menu-movil-abierto');
  });
}

// Manejo de errores de medios (imágenes/vídeos)
document.addEventListener('error', function(e) {
  const el = e.target;
  if (el.tagName === 'IMG') {
    el.src = 'logo.svg';
    el.style.objectFit = 'contain';
  }
}, true);

// Verificar existencia de archivos críticos y avisar en consola
window.addEventListener('load', () => {
  const imgs = Array.from(document.images);
  const missing = imgs.filter(img => !img.complete || img.naturalWidth === 0);
  if (missing.length) {
    console.warn('Imágenes con problemas de carga:', missing.map(i => i.src));
  }
});

// === GALERÍA MODERNA COVERFLOW ===
document.addEventListener('DOMContentLoaded', function() {
    const galeriaItems = Array.from(document.querySelectorAll('.galeria-item'));
    const flechaIzq = document.querySelector('.galeria-flecha-izq');
    const flechaDer = document.querySelector('.galeria-flecha-der');
    const galeriaTitulo = document.querySelector('.galeria-titulo');
    let actual = 0;

    function renderGaleria() {
        galeriaItems.forEach((item, idx) => {
            item.classList.remove('centro', 'izq', 'der', 'fuera');
            if (idx === actual) {
                item.classList.add('centro');
            } else if (idx === actual - 1) {
                item.classList.add('izq');
            } else if (idx === actual + 1) {
                item.classList.add('der');
            } else {
                item.classList.add('fuera');
            }
        });
        // Título
        galeriaTitulo.textContent = galeriaItems[actual].dataset.titulo || '';
    }

    function moverGaleria(dir) {
        if (dir === 'izq') {
            actual = (actual - 1 + galeriaItems.length) % galeriaItems.length;
        } else if (dir === 'der') {
            actual = (actual + 1) % galeriaItems.length;
        }
        renderGaleria();
    }

    flechaIzq.addEventListener('click', () => moverGaleria('izq'));
    flechaDer.addEventListener('click', () => moverGaleria('der'));

    galeriaItems.forEach((item, idx) => {
        item.addEventListener('click', function() {
            if (idx !== actual) {
                actual = idx;
                renderGaleria();
            }
        });
    });

    // Inicializar
    renderGaleria();
}); 

// === CARRUSEL DE PROYECTOS ===
document.addEventListener('DOMContentLoaded', function() {
    const carruselTrack = document.querySelector('.carrusel-track');
    const flechaIzquierda = document.querySelector('.flecha-izquierda');
    const flechaDerecha = document.querySelector('.flecha-derecha');
    const contenedorIndicadores = document.querySelector('.indicadores-carrusel');
    let tarjetas = Array.from(document.querySelectorAll('.carrusel-track .tarjeta-proyecto'));
    
    let slideActual = 0;
    const totalSlides = tarjetas.length;
    let autoPlayInterval;
    let isTransitioning = false;
    
    // Efecto de entrada para las tarjetas
    function animarEntradaTarjeta(index) {
        const tarjeta = tarjetas[index];
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            tarjeta.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function actualizarIndicadores() {
        contenedorIndicadores.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicador = document.createElement('button');
            indicador.className = 'indicador' + (i === slideActual ? ' activo' : '');
            indicador.setAttribute('data-slide', i);
            indicador.addEventListener('click', () => irASlide(i));
            
            // Efecto de entrada para indicadores
            indicador.style.opacity = '0';
            indicador.style.transform = 'scale(0.8)';
            contenedorIndicadores.appendChild(indicador);
            
            setTimeout(() => {
                indicador.style.transition = 'all 0.3s ease';
                indicador.style.opacity = '1';
                indicador.style.transform = 'scale(1)';
            }, i * 100);
        }
    }

    function actualizarCarrusel() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const porcentaje = slideActual * 100;
        carruselTrack.style.transform = `translateX(-${porcentaje}%)`;
        
        // Efecto de entrada para la tarjeta actual
        animarEntradaTarjeta(slideActual);
        
        // Actualizar indicadores con animación
        Array.from(contenedorIndicadores.children).forEach((ind, idx) => {
            ind.classList.toggle('activo', idx === slideActual);
        });
        
        // Efecto de pulso en la flecha activa
        const flechaActiva = slideActual === 0 ? flechaIzquierda : flechaDerecha;
        flechaActiva.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            flechaActiva.style.animation = '';
        }, 600);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);

        // Ajuste de altura del contenedor según tarjeta actual (evitar cortes en responsive)
        const tarjetaActual = tarjetas[slideActual];
        const contenedor = document.querySelector('.contenedor-carrusel');
        if (tarjetaActual && contenedor) {
            // Esperar fin de transición para medir correctamente
            setTimeout(() => {
                const nuevaAltura = tarjetaActual.offsetHeight;
                contenedor.style.height = `${Math.ceil(nuevaAltura)}px`;
            }, 310);
        }
    }

    function moverCarrusel(direccion) {
        if (isTransitioning) return;
        
        if (direccion === 'izquierda') {
            slideActual = (slideActual - 1 + totalSlides) % totalSlides;
        } else {
            slideActual = (slideActual + 1) % totalSlides;
        }
        actualizarCarrusel();
    }

    function irASlide(slide) {
        if (isTransitioning || slide === slideActual) return;
        slideActual = slide;
        actualizarCarrusel();
    }

    // Auto-play opcional (descomenta si quieres que cambie automáticamente)
    function iniciarAutoPlay() {
        autoPlayInterval = setInterval(() => {
            moverCarrusel('derecha');
        }, 5000); // Cambia cada 5 segundos
    }

    function detenerAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event listeners con efectos
    flechaIzquierda.addEventListener('click', () => {
        detenerAutoPlay();
        moverCarrusel('izquierda');
    });
    
    flechaDerecha.addEventListener('click', () => {
        detenerAutoPlay();
        moverCarrusel('derecha');
    });

    // Pausar auto-play al hacer hover
    carruselTrack.addEventListener('mouseenter', detenerAutoPlay);
    carruselTrack.addEventListener('mouseleave', iniciarAutoPlay);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            detenerAutoPlay();
            moverCarrusel('izquierda');
        } else if (e.key === 'ArrowRight') {
            detenerAutoPlay();
            moverCarrusel('derecha');
        }
    });

    // Swipe para móviles
    let startX = 0;
    let endX = 0;

    carruselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carruselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Mínimo swipe de 50px
            if (diff > 0) {
                moverCarrusel('derecha');
            } else {
                moverCarrusel('izquierda');
            }
        }
    });

    // Inicializar
    actualizarIndicadores();
    actualizarCarrusel();

    // Recalcular altura al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        const tarjetaActual = tarjetas[slideActual];
        const contenedor = document.querySelector('.contenedor-carrusel');
        if (tarjetaActual && contenedor) {
            contenedor.style.height = `${Math.ceil(tarjetaActual.offsetHeight)}px`;
        }
    });
    
    // Iniciar auto-play (opcional)
    // iniciarAutoPlay();
});