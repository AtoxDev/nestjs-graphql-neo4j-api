FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración del workspace raíz
COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el workspace
COPY ../../ .

# Crear enlace simbólico para que tsconfig.base.json esté en la ubicación esperada
RUN ln -sf /app/tsconfig.base.json /app/apps/tsconfig.base.json

# Exponer puerto
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "start:backend"]
