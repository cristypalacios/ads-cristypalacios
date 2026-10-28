# ads-cristypalacios

Landing de anuncios para **ads.cristypalacios.com** (Cristy Palacios Studio, fotografía corporativa en Monterrey). Sitio estático alojado en Netlify. Cada cambio que se sube a la rama `main` se publica solo.

La página lleva `noindex`: existe para recibir tráfico de Meta Ads y no para aparecer en Google.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | La landing completa (HTML, CSS y JS en un solo archivo) |
| `privacidad.html` | Aviso de privacidad |
| `404.html` | Página de error |
| `gracias-sesion/index.html` | Página de gracias a la que Cal.com envía después de agendar; invita a confirmar por WhatsApp |
| `gracias-gold/`, `gracias-silver/`, `gracias-express/`, `gracias-grupal/` | Una página de gracias por paquete de Cal.com. Piden confirmar por WhatsApp y hacer el anticipo |
| `images/` | Fotos del hero, portafolio, reseñas, logos y `og-image.jpg` |
| `paquetes/`, `Pinterest/` | Carpetas existentes del proyecto |
| `netlify.toml` | Encabezados de seguridad, caché y carpeta de funciones |
| `netlify/functions/capi.mjs` | Envía eventos a la API de Conversiones de Meta (ruta pública `/api/capi`) |
| `robots.txt` | Reglas para rastreadores |
| favicons (`favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`) | Íconos del sitio |

## Seguimiento (Meta Pixel + API de Conversiones)

Pixel ID: `258813025875290`. Cada evento sale del navegador y del servidor con el mismo `event_id`, y Meta lo cuenta una sola vez.

| Evento | Cuándo se dispara |
|---|---|
| `PageView` | Al cargar la página |
| `ViewContent` | Al ver el 40% de la sección de precios |
| `InteresadoEnWhatsApp` (personalizado) | Clic en un enlace `wa.me` o `api.whatsapp.com` |
| `Lead` | Clic en un enlace `chat.whatsapp.com` |
| `Schedule` | Al llegar a la página de gracias tras agendar en Cal.com (una vez por reserva). En las páginas por sesión incluye el nombre de la sesión |
| `ConfirmaPorWhatsApp` (personalizado) | Clic en "Confirmar por WhatsApp" en la página de gracias |

Variables de entorno en Netlify (nunca se guardan en GitHub):

- `META_CAPI_TOKEN`: obligatoria. Token de la API de Conversiones.
- `META_PIXEL_ID`: opcional. Por defecto usa el Pixel de arriba.
- `META_TEST_EVENT_CODE`: opcional. Solo mientras pruebas en Events Manager > Probar eventos.
- `META_GRAPH_VERSION`: opcional. Por defecto `v23.0`.

## Cómo actualizar

1. Edita el archivo en GitHub y haz commit en `main`.
2. Netlify publica en 1 o 2 minutos.
3. Para cambiar fotos del portafolio o reseñas, sustituye el archivo en `images/` con el mismo nombre (`portafolio-1.jpg` a `portafolio-9.jpg`, `review-*.jpg`).
