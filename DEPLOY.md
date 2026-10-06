# Despliegue con Docker en VPS (Hostinger)

La app se empaqueta en un contenedor: una etapa compila el proyecto con Node 22 y la segunda sirve el `dist` con nginx.

## Archivos de despliegue

| Archivo | Para qué sirve |
|---------|----------------|
| `Dockerfile` | Build multi-etapa (Node para compilar, nginx para servir) |
| `nginx.conf` | Configuración de nginx: fallback SPA, caché de assets, compresión, cabeceras |
| `docker-compose.yml` | Levanta el contenedor con reinicio automático y puerto publicado |
| `.env.example` | Plantilla de variables (dominio y puerto). Se copia a `.env` en el VPS |
| `.dockerignore` | Excluye `node_modules`, `.git`, documentación y `.env` de la imagen |

## 1. Preparar el VPS

Conectate por SSH y verificá que Docker esté instalado:

```sh
docker --version
docker compose version
```

Si no está instalado (en Ubuntu):

```sh
curl -fsSL https://get.docker.com | sh
```

Abrí el puerto 80 en el firewall (si usás `ufw`):

```sh
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp   # no cierres SSH
sudo ufw enable
```

## 2. Subir el código

```sh
sudo mkdir -p /opt/casaca-club-app
sudo chown $USER:$USER /opt/casaca-club-app
git clone <URL_DEL_REPOSITORIO> /opt/casaca-club-app
cd /opt/casaca-club-app
git checkout <RAMA>   # por ejemplo sprint_2 o main
```

## 3. Configurar y levantar

```sh
cp .env.example .env
docker compose up -d --build
```

Comandos útiles:

```sh
docker compose ps                 # estado del contenedor
docker compose logs -f web        # logs en vivo
docker compose up -d --build      # volver a desplegar tras un git pull
docker compose down               # detener
```

Verificación: desde el navegador entrá a `http://IP_DEL_VPS/`. El endpoint `http://IP_DEL_VPS/health` debe responder `ok`.

## 4. Agregar el dominio (cuando lo tengas)

1. En el panel DNS de tu dominio, creá un registro **A** que apunte a la IP del VPS (`@` y `www`).
2. Editá `.env` y cambiá el host:

   ```env
   NGINX_HOST=midominio.com www.midominio.com
   ```

3. Reconstruí y reiniciá:

   ```sh
   docker compose up -d --build
   ```

La IP del VPS sigue funcionando después del cambio.

## 5. HTTPS (pendiente)

Esta configuración sirve HTTP en el puerto 80. Para HTTPS con certificado automático (Let's Encrypt) falta agregar un proxy delante del contenedor, por ejemplo **Caddy** o **Traefik**, y abrir el puerto 443 en el firewall. Esto se configura una vez que el dominio esté apuntando al VPS.
