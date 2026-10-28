# Paquete 7: una página de gracias por cada paquete de Cal.com (sin HeadShot)

Este archivo es solo para ti. No lo subas a GitHub. Este paquete reemplaza a los paquetes 5 y 6. Si ya subiste `gracias-marca-personal/` o `gracias-headshot/`, bórralas de GitHub: ya no forman parte de tus paquetes.

## 1. Sube a GitHub

| Archivo | Qué es |
|---|---|
| `gracias-gold/index.html` | Sesión Gold Perfil Profesional |
| `gracias-silver/index.html` | Sesión Silver Perfil Profesional |
| `gracias-express/index.html` | Sesión Express |
| `gracias-grupal/index.html` | Sesión Grupal |
| `netlify/functions/capi.mjs` | Reemplaza al actual. Envía el nombre del paquete a Meta |
| `README.md` | Reemplaza al actual |

## 2. Conecta cada evento de Cal.com

En cada tipo de evento: pestaña de confirmación > **Redirect on booking** > pega la dirección y deja activado **Forward parameters**.

| Evento en Cal.com | Dirección de redirección |
|---|---|
| Sesión Gold Perfil Profesional | `https://ads.cristypalacios.com/gracias-gold/` |
| Sesión Silver Perfil Profesional | `https://ads.cristypalacios.com/gracias-silver/` |
| Sesión Express | `https://ads.cristypalacios.com/gracias-express/` |
| Sesión Grupal | `https://ads.cristypalacios.com/gracias-grupal/` |

## 3. El mensaje de WhatsApp

Es tu mensaje con la misma estructura, cambiando el emoji y el nombre de cada paquete:

> Cristy acabo de agendar 📅 mi sesión 💰 Gold 📸, entiendo que mi sesión solo esta pre agendada hasta que te haga el pago de mi anticipo.
>
> Pasame tus datos para hacerte el deposito 👍.

| Paquete | Emoji | Nombre en el mensaje |
|---|---|---|
| Gold | 💰 | Gold |
| Silver | 🥈 | Silver |
| Express | ⚡ | Express |
| Grupal | 👬 | Grupal |

Revisa el emoji de Silver: lo tomé de tu captura de Cal.com y no pude confirmarlo. Para cambiarlo, abre `gracias-silver/index.html`, busca la línea `var msg =` y reemplaza el código `\uD83E\uDD48` por el emoji que quieras escribir directamente.

El mensaje del paquete Gold es idéntico al tuyo, letra por letra. En el teléfono quité el `+` de tu enlace (`phone=528112770668`) porque en una dirección web el `+` puede leerse como espacio.

## 4. Qué muestra cada página

- Una etiqueta "Sesión pre agendada" y el saludo con el nombre del cliente.
- Una tarjeta con el nombre del paquete y lo que incluye, copiado de tu captura (duración, cambios de outfit, fotos).
- Una tarjeta con el día y la hora de la cita, en horario de Monterrey.
- El botón "Confirmar por WhatsApp" y tres pasos: enviar el mensaje, recibir tus datos para el anticipo y confirmar la sesión con el anticipo.

Si cambias lo que incluye un paquete, edita el texto dentro de `<section class="paquete">` en el archivo de ese paquete.

## 5. Medición

`Schedule` y `ConfirmaPorWhatsApp` llevan el nombre del paquete (`content_name`). En Events Manager puedes ver cuántas reservas y confirmaciones tuvo cada uno. Sigue valiendo que el Pixel solo relaciona la reserva con tu anuncio si el cliente visitó antes ads.cristypalacios.com en el mismo navegador.

## 6. Cómo probarlas

1. Haz una reserva de prueba de cada paquete en Cal.com.
2. Confirma que cada una lleva a su página, con el nombre, la fecha y los datos del paquete correctos.
3. Toca el botón y revisa que WhatsApp abra con el mensaje y el emoji de ese paquete.
