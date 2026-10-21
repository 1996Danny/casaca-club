# Casaca Club (Sprint 3-4) - sitio estático HTML/CSS/JS puro, sin build.
# Una sola etapa: nginx sirve los archivos de esta carpeta tal cual están.
FROM nginx:1.27-alpine

# La imagen de nginx reemplaza ${NGINX_HOST} en esta plantilla al arrancar
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Sitio estático: se copian sólo los archivos del sitio en sí, nunca los
# de infraestructura (Dockerfile, compose, nginx.conf, .env, el backend
# de server/) para que no queden expuestos como páginas públicas más.
COPY index.html LICENSE productos.json /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/

# Dominio que atiende nginx. Se puede sobrescribir desde .env
ENV NGINX_HOST=casacaclub.shop

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1
