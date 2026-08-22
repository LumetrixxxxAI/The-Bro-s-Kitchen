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

## Fotos

La mayoría de las fotos son ya reales (del local y de los platos), optimizadas en `.webp` dentro de `img/`. Los originales sin procesar quedan guardados en `img/fotos-originales/` por si hacen falta en otro tamaño o formato.

Todavía quedan **2 placeholders** (fondo oscuro + icono de cámara + texto "FOTO PENDIENTE") porque no había foto real disponible para esos platos:

| Archivo | Qué foto falta |
|---|---|
| `img/carta-burgers.svg` | Una burger de la carta (ninguna de las fotos recibidas mostraba burgers) |
| `img/carta-wraps.svg` | Un kebab roll o wrap de la carta |

Para sustituirlas, guarda la foto real con el **mismo nombre de archivo** (cambiando `.svg` por `.webp`/`.jpg`) y actualiza el `src` correspondiente en `index.html`.

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
