import {
  index,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("cofradias", "routes/cofradias.tsx"),
  route(
    "cofradias/:slug",
    "routes/cofradias.$slug.tsx",
  ),

  route("procesiones", "routes/procesiones.tsx"),
  route(
    "procesiones/:slug",
    "routes/procesiones.$slug.tsx",
  ),

  route(
    "sedescanonicas",
    "routes/sedescanonicas.tsx",
  ),
  route(
    "sedescanonicas/:slug",
    "routes/sedescanonicas.$slug.tsx",
  ),

  route("faq", "routes/faq.tsx"),
  route("contacto", "routes/contacto.tsx"),
  route("aviso-legal", "routes/avisolegal.tsx"),
  route("privacidad", "routes/privacidad.tsx"),
] satisfies RouteConfig;