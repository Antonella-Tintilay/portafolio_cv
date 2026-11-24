# Portafolio personal

Sitio web de una página que reúne la formación, las habilidades y los proyectos académicos de **Antonella Raquel Tintilay**, estudiante de la Tecnicatura Superior en Análisis de Sistemas y Desarrollo de Software en Salta, Argentina.

Desarrollado con HTML5, CSS3 y JavaScript, sin frameworks ni dependencias de ejecución.

## Características

- Diseño oscuro con un color de acento, tipografía legible y jerarquía visual clara.
- Adaptación a computadoras, tablets y celulares mediante CSS Grid, Flexbox y media queries.
- Navegación fija con resaltado de la sección visible y menú para dispositivos móviles.
- Animaciones de aparición al hacer scroll, desactivadas si el sistema solicita movimiento reducido.
- Sección de proyectos con descripción, rol, estado, participación y tecnologías.
- Enlace de contacto por correo, LinkedIn, GitHub y descarga del currículum en PDF.
- Accesibilidad: enlace para saltar al contenido, estados ARIA, foco visible y contraste verificado.

## Tecnologías

| Área | Tecnologías |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 (variables, Grid, Flexbox, media queries) |
| Interacción | JavaScript puro (Vanilla JS) |
| Tipografías | Inter y JetBrains Mono (Google Fonts) |
| Herramientas | Git, GitHub, Visual Studio Code |

## Estructura del proyecto

```
portafolio_cv/
├── index.html              Estructura y contenido del sitio
├── styles.css              Estilos y diseño responsive
├── script.js               Interacciones y comportamiento del menú
├── README.md               Documentación del proyecto
└── assets/
    ├── favicon.svg         Ícono de la pestaña del navegador
    ├── LEEME.txt           Nota sobre la ubicación del currículum
    └── Tintilay_Antonella_CV.pdf   Currículum (recurso pendiente)
```

El sitio se compone de tres archivos principales: `index.html` contiene el contenido y la estructura, `styles.css` concentra la presentación visual y `script.js` agrega la interacción. No se utilizan procesos de compilación ni servidores de aplicación.

## Ejecución local

El proyecto no requiere instalación de dependencias.

**Apertura directa:** abrir `index.html` en un navegador.

**Servidor local:** desde la raíz del proyecto, ejecutar:

```bash
python -m http.server 8000
```

y acceder a <http://localhost:8000>. Este método reproduce el comportamiento del sitio publicado, incluido el enlace de descarga y la API del portapapeles.

También es compatible con la extensión Live Server de Visual Studio Code.

Las tipografías se cargan desde Google Fonts, por lo que se requiere conexión a internet para visualizarlas tal como están definidas.

## Secciones

| Sección | Contenido |
|---|---|
| Inicio | Nombre, rol, presentación y accesos a proyectos, contacto y currículum |
| Sobre mí | Formación, ubicación, enfoque y cantidad de proyectos |
| Proyectos | IES Connect, BUYDIMA e Innova Home, con tecnologías y participación |
| Habilidades | Lenguajes, frontend, backend, bases de datos y herramientas |
| Contacto | Correo electrónico, LinkedIn, GitHub y descarga del CV |

## Funcionamiento del código

### HTML

El documento utiliza etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`) y un único `h1`. La navegación se resuelve con enlaces internos hacia los identificadores de cada sección. Cada proyecto se estructura como un `article` independiente.

Los íconos son SVG en línea con `aria-hidden="true"`, ya que cumplen una función decorativa. El sitio no utiliza imágenes de contenido.

### CSS

Los valores de color, tipografía y espaciado se definen como variables en `:root`. La composición se apoya en CSS Grid para las secciones y en Flexbox para la navegación, los botones y las listas de etiquetas. La función `clamp()` permite que los tamaños de texto se adapten de forma fluida.

Los puntos de quiebre se ubican en 900 px (menú móvil), 820 px (grillas de una columna), 600 px (ajustes de espaciado y botones) y 380 px (marca del encabezado). La consulta `prefers-reduced-motion` desactiva las animaciones cuando el sistema lo solicita.

### JavaScript

El archivo se carga con `defer` y organiza el comportamiento en funciones independientes:

| Función | Responsabilidad |
|---|---|
| `setCurrentYear()` | Actualiza el año del pie de página. |
| `initScrollReveal()` | Muestra los bloques al entrar en pantalla mediante `IntersectionObserver`. |
| `initMobileMenu()` | Controla la apertura y el cierre del menú móvil y sus atributos ARIA. |
| `initHeaderState()` | Modifica el borde del encabezado al desplazarse. |
| `initActiveNavLink()` | Resalta el enlace correspondiente a la sección visible. |
| `initCopyEmail()` | Copia el correo al portapapeles, con método alternativo y confirmación visual. |
| `initBackToTop()` | Muestra el acceso para volver al inicio de la página. |

No se utilizan librerías externas. El cálculo de la sección activa y la visibilidad del botón «volver arriba» se optimizan con `requestAnimationFrame`.

## Accesibilidad y calidad

La auditoría de Lighthouse sobre la versión local obtiene las siguientes puntuaciones:

| Categoría | Puntuación |
|---|---|
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 100 |

El documento incluye título descriptivo, meta descripción, jerarquía de encabezados, textos alternativos en los elementos que lo requieren, foco visible y contraste conforme a WCAG AA. La navegación por teclado permite cerrar el menú móvil con la tecla `Escape`.

## Estado del proyecto

| Componente | Estado |
|---|---|
| Estructura, diseño y funcionalidades | Implementado |
| Currículum en PDF | Pendiente de incorporación |
| Enlaces a repositorios y demos | Pendientes de publicación |
| Despliegue en GitHub Pages | Pendiente |

### Currículum

La descarga apunta a `assets/Tintilay_Antonella_CV.pdf`. El nombre del archivo distingue mayúsculas y minúsculas, por lo que la ruta debe coincidir de forma exacta. Mientras el recurso no esté presente, el enlace de descarga no estará disponible.

### Repositorios y demos

Las tarjetas de los tres proyectos muestran un marcador «Repositorio — enlace por agregar», dado que los repositorios aún no se encuentran publicados. El marcado previsto para cada enlace es:

```html
<a class="project-link" href="URL_DEL_REPOSITORIO" target="_blank" rel="noopener noreferrer">
  Ver repositorio
</a>
```

Los estilos de `.project-link` ya están definidos. En caso de existir una demostración pública, se incorpora con el mismo formato y el texto «Ver demo». No se incluyen enlaces a recursos inexistentes.

## Publicación en GitHub Pages

El sitio es estático y puede publicarse de forma gratuita con HTTPS.

1. Crear un repositorio público llamado `portafolio_cv`, sin archivos iniciales.
2. Inicializar el repositorio local y subir el contenido:

```bash
git init
git add .
git commit -m "Portafolio personal"
git branch -M main
git remote add origin https://github.com/Antonella-Tintilay/portafolio_cv.git
git push -u origin main
```

3. En GitHub, ingresar a **Settings → Pages**.
4. En *Build and deployment*, seleccionar **Deploy from a branch**.
5. Elegir la rama **main** y la carpeta **/ (root)**, y guardar los cambios.
6. La publicación tarda uno o dos minutos. La URL resultante es:

```
https://antonella-tintilay.github.io/portafolio_cv/
```

La URL abre sin necesidad de iniciar sesión y utiliza HTTPS de forma automática.

### Consideraciones

- Si el repositorio se denomina `Antonella-Tintilay.github.io`, la URL es `https://antonella-tintilay.github.io/` y no incluye subcarpeta.
- Para que la descarga del currículum funcione en el sitio publicado, el PDF debe estar presente en `assets/` antes del despliegue.
- Si GitHub solicita autenticación al subir cambios, se utiliza un token de acceso personal o una herramienta como GitHub Desktop o la integración de Git de Visual Studio Code.
- El proyecto se encuentra dentro de una carpeta de OneDrive. Si se producen bloqueos de archivos durante el uso de Git, se recomienda trasladarlo a una ruta local fuera de OneDrive.
- Una vez publicada la URL, es posible agregar la etiqueta `og:url` en el `<head>` de `index.html` para completar los metadatos de compartición.

## Enlaces

- Correo: <mailto:antotintilay6@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/anto-tintilay-2b371b357>
- GitHub: <https://github.com/Antonella-Tintilay>
- Portafolio (URL prevista): <https://antonella-tintilay.github.io/portafolio_cv/>

Los enlaces externos del sitio utilizan `target="_blank"` y `rel="noopener noreferrer"`.
