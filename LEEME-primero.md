# Mejoras para ads-cristypalacios

Este paquete respeta la estructura de tu repositorio. Sube cada archivo en la misma ruta que tiene aquí.

## Qué contiene

| Archivo | Qué hace | ¿Nuevo o reemplaza? |
|---|---|---|
| `index.html` | Tu página con los cambios de abajo | Reemplaza el actual |
| `netlify.toml` | Encabezados de seguridad y caché de imágenes | Nuevo |
| `404.html` | Página de error con tu logo y botón al inicio | Nuevo |
| `netlify/functions/capi.mjs` | Envía tus eventos a Meta desde el servidor (API de Conversiones) | Nuevo |
| `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `apple-touch-icon.png` | Íconos generados desde tu `images/favicon.png` | Nuevos |

## Cambios dentro de `index.html`

1. Íconos nuevos y `theme-color` (color de la barra del navegador en celular, igual a tu fondo).
2. Open Graph con ancho y alto de imagen (1200x630, medidos de tu `og-image.jpg`), nombre del sitio y texto alternativo.
3. Etiquetas de Twitter/X: título, descripción e imagen.
4. Schema `ProfessionalService` con `@id`, teléfono (tomado de tu enlace de WhatsApp) y dirección con ciudad, estado y país. No agregué calle porque no aparece en tu archivo.
5. Los cuatro eventos del Pixel (`PageView`, `Lead`, `InteresadoEnWhatsApp`, `ViewContent`) ahora usan la función `metaTrack`. Esa función manda el evento al Pixel y a `/api/capi` con el mismo `event_id`, y Meta cuenta una sola vez. Los nombres de tus eventos no cambiaron, así que tus campañas siguen igual.
6. Quité del final del archivo el script `/.netlify/scripts/hud`. Es la barra de herramientas de Netlify y estaba después de `</html>`.

## Pasos para activar la API de Conversiones

1. Sube todo a GitHub y espera el deploy de Netlify.
2. En Meta Events Manager: tu Pixel > Configuración > API de Conversiones > "Generar token de acceso". Copia el token.
3. En Netlify: Site configuration > Environment variables > agrega `META_CAPI_TOKEN` con ese token. Nunca lo pegues en GitHub.
4. Para probar, en Events Manager abre "Probar eventos", copia el código de prueba y agrégalo en Netlify como `META_TEST_EVENT_CODE`. Haz un nuevo deploy, entra a tu página y haz clic en un botón de WhatsApp. Debes ver cada evento dos veces: una de "Navegador" y otra de "Servidor", marcadas como desduplicadas.
5. Al terminar la prueba, borra `META_TEST_EVENT_CODE` y haz otro deploy.

`capi.mjs` usa por defecto la versión `v23.0` de la API de Meta. Revisa la versión vigente en developers.facebook.com y, si cambió, agrega la variable `META_GRAPH_VERSION` en Netlify.

## Pendientes que no toqué

- `sitemap.xml` incluye tu página y `index.html` tiene `noindex`. Las dos señales se contradicen. Si la página es solo para anuncios, puedes borrar `sitemap.xml` y la línea `Sitemap:` de `robots.txt`.
- La API de Conversiones envía IP y navegador del visitante a Meta. Conviene mencionarlo en `privacidad.html`.
- `README.md` y `README.txt` están duplicados en tu repositorio. Conviene dejar uno.
- El evento `Lead` solo se dispara con enlaces `chat.whatsapp.com`, y los enlaces `wa.me` disparan `InteresadoEnWhatsApp`, que es un evento personalizado. Meta optimiza mejor con eventos estándar. Si tus anuncios optimizan para ese clic, revisa si conviene usar `Contact` o `Lead`.
