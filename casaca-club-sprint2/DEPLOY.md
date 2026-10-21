# Despliegue de Casaca Club (Sprint 3-4) en el VPS

Sitio estático (HTML/CSS/JS puro, sin build) empaquetado en un contenedor nginx propio,
separado del resto de tus apps del VPS. Dominio: **casacaclub.shop** (Hostinger).

## Archivos de este despliegue

| Archivo | Para qué sirve |
|---|---|
| `Dockerfile` | nginx sirviendo esta carpeta directo, sin etapa de build |
| `nginx.conf` | Config de nginx: caché, compresión, cabeceras, `/health` |
| `docker-compose.yml` | Levanta el contenedor del sitio (`web`, publicado SOLO en `127.0.0.1:8081`) y el de la API de Mercado Pago (`api`, sin publicar afuera) |
| `docker-compose.proxy.yml` | Caddy opcional con HTTPS automático, si todavía no tenés un proxy en el VPS |
| `Caddyfile` | Config de Caddy para `casacaclub.shop` → contenedor `web` |
| `server/` | Backend mínimo (Node + Express) que crea las preferencias de pago de Mercado Pago del carrito; nginx lo expone vía `/api/` (ver `nginx.conf`) |
| `.env.example` | Plantilla de variables (dominio, puerto y credenciales de Mercado Pago). Se copia a `.env` en el VPS |

**Mercado Pago:** `MP_ACCESS_TOKEN` en `.env` debe ser el Access Token de **prueba** (`TEST-...`) del panel
https://www.mercadopago.com.ar/developers/panel mientras el checkout siga en modo sandbox. El botón
"Pagar con Mercado Pago (modo prueba)" del sitio no cobra dinero real con ese token. El día que corresponda
pasar a producción, sólo hay que reemplazarlo por el Access Token real y quitar la aclaración "(modo prueba)"
del botón en `index.html`.

**Por qué está separado de `docker-compose.yml` de la raíz del repo:** ese archivo compila y sirve el
prototipo en React (no es la entrega de esta materia). Este despliegue es independiente: build propio,
`container_name` propio (`casaca-club-sprint2`), imagen propia, y no toca nada de esa otra app.

## 0. Antes de nada: revisá qué hay ocupado en el VPS

Tenés dos apps corriendo (una con dominio propio de Hostinger, otra en Docker con dominio de Cloudflare).
Antes de tocar puertos, conectate por SSH y mirá qué está escuchando:

```sh
sudo ss -tlnp | grep -E ':80 |:443 '
docker ps
```

- Si **ya hay algo en el puerto 80 y/o 443** (otro nginx, Caddy, Traefik, o el contenedor de la otra app
  publicando esos puertos): **no uses** `docker-compose.proxy.yml`. Ese "algo" es tu reverse proxy — andá
  directo al punto 3 ("Ya tengo un proxy").
- Si **no hay nada en 80/443**: podés usar el Caddy incluido acá (punto 4, "No tengo proxy todavía").

## 1. Subir el código

Este despliegue vive en la carpeta `casaca-club-sprint2/` del repo. En el VPS:

```sh
sudo mkdir -p /opt/casaca-club-sprint2
sudo chown $USER:$USER /opt/casaca-club-sprint2
git clone <URL_DEL_REPOSITORIO> /opt/casaca-club-app
cd /opt/casaca-club-app
git checkout main   # o la rama que vayas a desplegar
cd casaca-club-sprint2
cp .env.example .env
```

## 2. Levantar SOLO el sitio (sin proxy)

Esto deja el sitio escuchando en `127.0.0.1:8081`, inalcanzable desde afuera — no compromete ni es
alcanzado por tus otras apps.

```sh
docker compose up -d --build
docker compose ps
curl http://127.0.0.1:8081/health   # debe responder "ok"
```

## 3. Ya tengo un proxy corriendo (nginx / Caddy / Traefik de otra app)

Agregá `casacaclub.shop` como un virtual host más de ESE proxy, apuntando a `127.0.0.1:8081` (el puerto
que publicó el paso 2). No publiques 80/443 desde acá.

Ejemplo si tu proxy existente es nginx (server block nuevo, en su propia config, sin tocar las otras apps):

```nginx
server {
    listen 80;
    server_name casacaclub.shop www.casacaclub.shop;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Después corré tu herramienta de HTTPS habitual sobre ese server block (p. ej. `certbot --nginx -d casacaclub.shop`).

Si tu proxy existente es Caddy o Traefik, el equivalente es agregar `casacaclub.shop` como otro sitio/router
de esa misma instancia, apuntando a `127.0.0.1:8081` — sin crear una segunda instancia de proxy.

## 4. No tengo proxy todavía: usar el Caddy incluido

Sólo si el punto 0 confirmó que 80 y 443 están libres:

```sh
docker compose -f docker-compose.yml -f docker-compose.proxy.yml up -d --build
```

Caddy obtiene el certificado HTTPS automáticamente para `casacaclub.shop` la primera vez que recibe
tráfico en ese dominio (necesita el registro DNS del paso 5 ya apuntando al VPS).

## 5. DNS en Hostinger

En el panel DNS de `casacaclub.shop`, creá registros **A** apuntando a la IP del VPS:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | IP_DEL_VPS |
| A | www | IP_DEL_VPS |

## Comandos útiles

```sh
docker compose logs -f web          # logs del sitio
docker compose up -d --build        # redeploy tras git pull
docker compose down                 # detener (no afecta tus otras apps)
```

## Verificación final

- `http://127.0.0.1:8081/health` (desde el propio VPS) → `ok`
- `https://casacaclub.shop/` (desde afuera, una vez configurado el proxy y el DNS) → el sitio, con candado HTTPS
- Confirmar que tus otras dos apps siguen respondiendo normalmente después del despliegue
