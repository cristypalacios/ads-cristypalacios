// Netlify Function: envía eventos del sitio a la API de Conversiones de Meta (servidor a servidor).
// Ruta pública: /api/capi
//
// Variables de entorno en Netlify (Site configuration > Environment variables). NUNCA las pongas en GitHub:
//   META_CAPI_TOKEN        (obligatoria) token de acceso de la API de Conversiones
//   META_PIXEL_ID          (opcional)    por defecto usa 258813025875290
//   META_TEST_EVENT_CODE   (opcional)    código de "Probar eventos" de Events Manager; bórrala al terminar de probar
//   META_GRAPH_VERSION     (opcional)    por defecto v23.0; verifica la versión vigente en la documentación de Meta

const PIXEL_ID_DEFAULT = "258813025875290";
const GRAPH_VERSION_DEFAULT = "v23.0";
const ALLOWED_EVENTS = new Set(["PageView", "ViewContent", "Lead", "InteresadoEnWhatsApp", "Schedule", "ConfirmaPorWhatsApp"]);
const ALLOWED_HOSTS = new Set(["ads.cristypalacios.com", "localhost"]);

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req, context) => {
  if (req.method !== "POST") return json(405, { error: "Método no permitido" });

  // Solo acepta llamadas que vengan de tu propio sitio
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  let originHost = "";
  try { originHost = new URL(origin).hostname; } catch (_) {}
  if (!ALLOWED_HOSTS.has(originHost) && !originHost.endsWith(".netlify.app")) {
    return json(403, { error: "Origen no permitido" });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) return json(500, { error: "Falta META_CAPI_TOKEN" });

  let p;
  try {
    const raw = await req.text();
    if (raw.length > 5000) return json(413, { error: "Solicitud demasiado grande" });
    p = JSON.parse(raw);
  } catch (_) {
    return json(400, { error: "JSON inválido" });
  }

  if (!ALLOWED_EVENTS.has(p.event_name) || !p.event_id) {
    return json(400, { error: "Evento no permitido" });
  }

  const pixelId = process.env.META_PIXEL_ID || PIXEL_ID_DEFAULT;
  const version = process.env.META_GRAPH_VERSION || GRAPH_VERSION_DEFAULT;

  const customData = {};
  if (p.custom_data && typeof p.custom_data === "object") {
    if (typeof p.custom_data.value === "number") customData.value = p.custom_data.value;
    if (typeof p.custom_data.currency === "string") customData.currency = p.custom_data.currency.slice(0, 3);
    if (typeof p.custom_data.content_name === "string") customData.content_name = p.custom_data.content_name.slice(0, 100);
  }

  const event = {
    event_name: p.event_name,
    event_time: Number.isFinite(p.event_time) ? p.event_time : Math.floor(Date.now() / 1000),
    event_id: String(p.event_id).slice(0, 100), // el mismo ID que usó el Pixel: Meta elimina el duplicado
    action_source: "website",
    event_source_url: typeof p.event_source_url === "string" ? p.event_source_url.slice(0, 500) : undefined,
    user_data: {
      client_ip_address: context.ip || undefined,
      client_user_agent: req.headers.get("user-agent") || undefined,
      fbp: typeof p.fbp === "string" ? p.fbp.slice(0, 200) : undefined,
      fbc: typeof p.fbc === "string" ? p.fbc.slice(0, 200) : undefined,
    },
    custom_data: Object.keys(customData).length ? customData : undefined,
  };

  const body = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Meta CAPI error", res.status, JSON.stringify(out));
      return json(502, { error: "Meta rechazó el evento" });
    }
    return json(200, { ok: true, events_received: out.events_received });
  } catch (err) {
    console.error("Meta CAPI fetch failed", err);
    return json(502, { error: "No se pudo contactar a Meta" });
  }
};

export const config = { path: "/api/capi" };
