# Movie Rating API - GraphQL + Neo4j

API GraphQL para gestionar usuarios, películas y valoraciones usando Neo4j como base de datos.

## 🚀 Tecnologías

- **Backend:** NestJS + GraphQL + Apollo Server
- **Frontend:** React + Vite
- **Base de datos:** Neo4j
- **Orquestación:** Docker + Docker Compose

## 📋 Requisitos

- Docker Desktop
- Node.js 18+
- npm

## 🐳 Ejecutar con Docker (Recomendado)

### 1. Construir las imágenes

```bash
npm run docker:build
```

### 2. Levantar todos los servicios

```bash
npm run docker:up
```

### 3. Cargar datos iniciales

```bash
npm run docker:seed
```

### 4. Acceder a las aplicaciones

- **Frontend:** http://localhost
- **Backend API:** http://localhost:3000/api
- **GraphQL Playground:** http://localhost:3000/api/graphql
- **Neo4j Browser:** http://localhost:7474

### 5. Comandos útiles

```bash
# Ver logs en tiempo real
npm run docker:logs

# Detener todos los servicios
npm run docker:down

# Reiniciar servicios
npm run docker:restart
```

## 🛠️ Desarrollo Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar Neo4j con Docker

```bash
docker run --name neo4j-test -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/test1234 -d neo4j:5
```

### 3. Cargar datos iniciales

```bash
npm run seed
```

### 4. Ejecutar aplicaciones

**Backend:**

```bash
npm run start:backend
```

**Frontend:**

```bash
npm run start:frontend
```

## 📊 Estructura del Proyecto

```
movie-rating/
├── apps/
│   ├── backend/          # API GraphQL (NestJS)
│   ├── frontend/         # Aplicación React
│   └── tests/            # Tests e2e y unitarios
├── scripts/
│   └── seed.ts          # Script para cargar datos iniciales
├── docker-compose.yml   # Orquestación de servicios
└── README.md
```

## 🔧 Configuración

### Variables de entorno

```env
# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=test1234

# Backend
PORT=3000
NODE_ENV=development
```

## 📝 API GraphQL

### Queries disponibles:

- `movies` - Lista todas las películas
- `movie(id: ID!)` - Detalles de una película
- `users` - Lista todos los usuarios
- `user(id: ID!)` - Detalles de un usuario
- `ratingsByUser(userId: ID!)` - Valoraciones de un usuario
- `ratingsForMovie(movieId: ID!)` - Valoraciones de una película
- `averageRatingForMovie(movieId: ID!)` - Promedio de valoraciones

### Mutations disponibles:

- `addMovie(input: MovieInput!)` - Añadir película
- `registerUser(input: UserInput!)` - Registrar usuario
- `rateMovie(userId: ID!, movieId: ID!, score: Int!, review: String)` - Valorar película

## 🧪 Testing

```bash
# Tests del backend
npm run test:backend

# Tests del frontend
npm run test:frontend
```

## 📦 Build

```bash
# Build del backend
npm run build:backend

# Build del frontend
npm run build:frontend
```

## 🔍 Troubleshooting

### Problemas comunes:

1. **Puerto 3000 ocupado:**

   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Neo4j no responde:**

   ```bash
   docker restart neo4j-test
   ```

3. **Permisos de Docker:**
   ```bash
   sudo chown -R $USER:$USER .
   ```

## 📄 Licencia

MIT
