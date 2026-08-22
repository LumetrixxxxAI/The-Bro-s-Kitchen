# The BRO's Kitchen — Landing Page

Landing page de una sola página para **The BRO's Kitchen**, restaurante de asian fusion & burgers en el food court The Red Box (Estepona, Málaga).

HTML, CSS y JS puros — sin build, sin dependencias de instalación. Se puede subir tal cual a cualquier hosting estático.

## Estructura

```
index.html              página principal
css/style.css           estilos (paleta, tipografía, layout, responsive)
js/main.js               preloader, cursor, header, menú móvil, animaciones GSAP, contadores, carrusel, cookies
img/                     imágenes (placeholders marcados — ver "Fotos pendientes")
legal/aviso-legal.html   aviso legal
legal/privacidad.html    política de privacidad
legal/cookies.html       política de cookies
```

## Tecnología

- HTML5 semántico + Schema.org (`Restaurant`) para SEO local.
- CSS puro con custom properties (sin frameworks).
- [GSAP](https://gsap.com/) + ScrollTrigger vía CDN para animaciones (reveals, parallax, contadores).
- Google Fonts: Archivo Black (titulares), Inter (texto), Space Grotesk (detalles/mono).
- Sin frameworks JS, sin paso de build.

## Fotos pendientes

Todas las imágenes son **placeholders bien marcados** (fondo oscuro + icono de cámara + texto "FOTO PENDIENTE") dentro de `img/`. Para sustituir una foto real, guarda el archivo **con el mismo nombre** que el placeholder (o cambia el `src` en `index.html`):

| Archivo | Qué foto va ahí |
|---|---|
| `img/hero-local-neon-noche.svg` | Fachada o interior de noche con neón (hero a pantalla completa) |
| `img/especialidad-big-burger-bro.svg` | Big Burger BRO |
| `img/especialidad-bowl-asian.svg` | Bowl asian fusion |
| `img/especialidad-bao.svg` | Bao |
| `img/especialidad-wok.svg` | Wok de noodles |
| `img/carta-starters.svg` | Starters & alitas |
| `img/carta-burgers.svg` | Burgers |
| `img/carta-wraps.svg` | Wraps & kebab rolls |
| `img/carta-bowls.svg` | Bowls & wok |
| `img/carta-curries.svg` | Curries & rice |
| `img/carta-bao.svg` | Bao (categoría carta) |
| `img/carta-postres.svg` | Postres |
| `img/nosotros-local.svg` | Interior/terraza del local |
| `img/galeria-1.svg` … `img/galeria-6.svg` | Fotos variadas de platos y local |
| `img/og-image.jpg` | Imagen para compartir en redes (1200×630, formato JPG/PNG real) |

Recomendado: exportar las fotos reales en `.jpg` o `.webp`, optimizadas (~150–300 KB), y actualizar el `src` correspondiente en `index.html`.

## Enlaces a revisar antes de publicar

- **Uber Eats** y **TheFork**: los botones apuntan a las páginas genéricas (`ubereats.com/es`, `thefork.es`) — sustituir por el enlace directo a la página del restaurante en cada plataforma.
- **Teléfono**: se usa `610 03 12 91` como principal en todos los enlaces `tel:` y `wa.me`. Confirmar si `951 698 465` debe añadirse o sustituirlo.
- **Horario**: se muestra "Todos los días · 13:00–23:00" marcado como "a confirmar" — actualizar con el horario real (días y hora de apertura).
- **Aviso legal**: la plantilla en `legal/aviso-legal.html` necesita el nombre fiscal/NIF exacto del negocio.

## Publicar con GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `the-bros-kitchen`).
2. Conecta este repositorio local y sube los cambios:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/the-bros-kitchen.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages**.
4. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda — GitHub Pages publicará el sitio en `https://TU-USUARIO.github.io/the-bros-kitchen/` en uno o dos minutos.
6. (Opcional) Si tienes un dominio propio, configúralo en la misma sección "Pages" con un registro CNAME.

## Diseño

Lumetrix AI.
