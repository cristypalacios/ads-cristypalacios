# Paquete 2: correcciones de la auditoría

Este archivo es solo para ti. No lo subas a GitHub.

## 1. Sube (reemplazan a los actuales)

| Archivo | Qué cambia |
|---|---|
| `index.html` | Dirección del schema en San Pedro Garza García y `areaServed` con Monterrey y San Pedro; precarga y `fetchpriority="high"` en la imagen principal; etiqueta `<main>` y enlace "Saltar al contenido" (invisible hasta que se navega con teclado); `width` y `height` en logos, íconos de estadísticas y foto de perfil |
| `privacidad.html` | Nuevo párrafo sobre el envío de datos a Meta desde el servidor (API de Conversiones); se quitó el texto "de forma agregada"; fecha de actualización en octubre de 2026; íconos nuevos |
| `robots.txt` | Sin la línea `Sitemap:` |
| `README.md` | Descripción del proyecto, estructura, eventos del Pixel y variables de Netlify |

## 2. Borra de GitHub

Abre cada archivo en GitHub, haz clic en los tres puntos de arriba a la derecha y elige "Delete file".

- `sitemap.xml`: listaba una página con `noindex`.
- `README.txt`: tenía instrucciones de un ZIP anterior. El README.md nuevo lo reemplaza.
- `LEEME-primero.md`: Netlify lo estaba publicando en tu dominio.

## 3. Revisa después de subir

1. Abre ads.cristypalacios.com en tu celular y en la computadora. El diseño debe verse igual que antes.
2. Abre ads.cristypalacios.com/privacidad.html y lee el párrafo nuevo.
3. En Events Manager > Probar eventos, confirma que cada evento llega dos veces (Navegador y Servidor) y aparece como desduplicado.

## 4. Lo que no incluí

- **FAQ, reseñas y portafolio en HTML fijo.** Lo dejamos pendiente por tu decisión.
- **Evento `Lead` en enlaces `wa.me`.** No lo cambié porque puede alterar la optimización de tus campañas actuales.
- **Foto destacada de Cloudinary** (`Estudio_de_Fotos_Para_Perfil_Profesional.jpg`) e íconos de estadísticas de Cloudinary: no pude medir sus dimensiones ni su peso. Cuando tengas el tamaño real, agrega `width` y `height` a la foto destacada. En las URLs de Cloudinary puedes insertar `f_auto,q_auto/` justo después de `/upload/` para reducir el peso.
- **Domicilio en el aviso de privacidad.** Dice "domicilio operativo en Monterrey" sin dirección. Lo dejé igual porque no tengo el dato. Consúltalo con quien te asesore en lo legal.
