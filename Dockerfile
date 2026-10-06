# Etapa 1: compilar la app con Vite
FROM node:22-alpine AS build
WORKDIR /app

# Instalar dependencias primero para aprovechar la caché de capas
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servir el build estático con nginx
FROM nginx:1.27-alpine AS runtime

# La imagen de nginx reemplaza ${NGINX_HOST} en esta plantilla al arrancar
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Dominio o dominios que atiende nginx. Se puede sobrescribir desde .env
ENV NGINX_HOST=localhost

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1
