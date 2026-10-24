# Backend minimo (Node + Express) que crea preferencias de pago de
# Mercado Pago para el carrito de la app React. Se construye con
# contexto en la raíz del repo para poder leer public/productos.json
# (fuente única de precios, la misma que carga el front con fetch) y
# derivar catalog.json.
FROM node:20-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev

COPY server/index.js server/export-catalog.mjs ./
COPY public/productos.json ./productos.json
RUN node export-catalog.mjs

ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "index.js"]
