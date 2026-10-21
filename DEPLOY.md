# Despliegue de Casaca Club (app React) en el VPS

Dos contenedores: `web` (build multi-etapa, Node compila con Vite y nginx sirve el `dist`) y
`api` (Node/Express mínimo que crea las preferencias de pago de Mercado Pago del carrito).
Dominio: **casacaclub.shop** (Hostinger).

## Archivos de este despliegue

| Archivo | Para qué sirve |
|---|---|
| `Dockerfile` | Build multi-etapa: Node 22 compila, nginx sirve el `dist` |
| `nginx.conf` | Config de nginx: SPA fallback, caché de assets, proxy de `/api/` al servicio `api` |
| `docker-compose.yml` | Levanta `web` (publicado SOLO en `127.0.0.1:${HOST_PORT}`) y `api` (sin publicar afuera) |
| `docker-compose.proxy.yml` | Caddy opcional con HTTPS automático, si todavía no tenés un proxy en el VPS |
| `Caddyfile` | Config de Caddy para `casacaclub.shop` → contenedor `web` |
| `server/` | Backend que crea las preferencias de pago de Mercado Pago (ver abajo) |
| `.env.example` | Plantilla de variables (dominio, puerto y credenciales de Mercado Pago). Se copia a `.env` en el VPS |

## 0. Antes de nada: revisá qué hay ocupado en el VPS

Si ya tenés otras apps corriendo en este VPS, conectate por SSH y mirá qué está escuchando antes
de tocar puertos:

```sh
sudo ss -tlnp | grep -E ':80 |:443 '
docker ps
```

- Si **ya hay algo en el puerto 80 y/o 443** (otro nginx, Caddy, Traefik, o el contenedor de otra
  app publicando esos puertos): **no uses** `docker-compose.proxy.yml`. Ese "algo" es tu reverse
  proxy — andá directo al punto 3 ("Ya tengo un proxy").
- Si **no hay nada en 80/443**: podés usar el Caddy incluido acá (punto 4, "No tengo proxy
  todavía").

## 1. Subir el código

```sh
sudo mkdir -p /opt/casaca-club-app
sudo chown $USER:$USER /opt/casaca-club-app
git clone https://github.com/1996Danny/casaca-club.git /opt/casaca-club-app
cd /opt/casaca-club-app
git checkout sprint_2   # o main una vez mergeado el PR
cp .env.example .env
```

Editá `.env` y completá `MP_ACCESS_TOKEN` con el Access Token de **prueba** (sección
"Credenciales de prueba" de https://www.mercadopago.com.ar/developers/panel) y `SITE_URL` con
`https://casacaclub.shop`. Mientras el checkout siga en modo sandbox (recomendado para esta
entrega académica), usá siempre el de prueba — nunca el de producción.

## 2. Levantar SOLO el sitio (sin proxy)

Esto deja el sitio escuchando en `127.0.0.1:8082` (o el `HOST_PORT` que hayas puesto),
inalcanzable desde afuera — no compromete ni es alcanzado por tus otras apps.

```sh
docker compose up -d --build
docker compose ps
curl http://127.0.0.1:8082/health         # debe responder "ok"
curl http://127.0.0.1:8082/api/health     # debe responder {"ok":true}
```

## 3. Ya tengo un proxy corriendo (nginx / Caddy / Traefik de otra app)

Agregá `casacaclub.shop` como un virtual host más de ESE proxy, apuntando a `127.0.0.1:8082` (el
puerto que publicó el paso 2). No publiques 80/443 desde acá.

Ejemplo si tu proxy existente es nginx (server block nuevo, en su propia config, sin tocar las
otras apps):

```nginx
server {
    listen 80;
    server_name casacaclub.shop www.casacaclub.shop;
    location / {
        proxy_pass http://127.0.0.1:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Después corré tu herramienta de HTTPS habitual sobre ese server block (p. ej.
`certbot --nginx -d casacaclub.shop -d www.casacaclub.shop`).

Si tu proxy existente es Caddy o Traefik, el equivalente es agregar `casacaclub.shop` como otro
sitio/router de esa misma instancia, apuntando a `127.0.0.1:8082` — sin crear una segunda
instancia de proxy.

## 4. No tengo proxy todavía: usar el Caddy incluido

Sólo si el punto 0 confirmó que 80 y 443 están libres:

```sh
docker compose -f docker-compose.yml -f docker-compose.proxy.yml up -d --build
```

Caddy obtiene el certificado HTTPS automáticamente para `casacaclub.shop` la primera vez que
recibe tráfico en ese dominio (necesita el registro DNS del paso 5 ya apuntando al VPS).

## 5. DNS en Hostinger

En el panel DNS de `casacaclub.shop`, creá registros **A** apuntando a la IP del VPS:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | IP_DEL_VPS |
| A | www | IP_DEL_VPS |

## Comandos útiles

```sh
docker compose logs -f web          # logs del sitio
docker compose logs -f api          # logs de la API de Mercado Pago
docker compose up -d --build        # redeploy tras un git pull
docker compose down                 # detener (no afecta tus otras apps)
```

## Verificación final

- `http://127.0.0.1:8082/health` (desde el propio VPS) → `ok`
- `https://casacaclub.shop/` (desde afuera, una vez configurado el proxy y el DNS) → el sitio, con
  candado HTTPS
- Agregar algo al carrito y tocar "Pagar con Mercado Pago" → debe redirigir a un checkout real de
  Mercado Pago (modo prueba: no cobra dinero real, pero sólo se puede completar logueado con una
  cuenta de prueba Comprador, no con tu cuenta real — ver el panel de desarrolladores)
- Confirmar que tus otras apps siguen respondiendo normalmente después del despliegue
