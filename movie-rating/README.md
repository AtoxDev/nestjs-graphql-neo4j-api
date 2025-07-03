# 🎬 Movie Rating API - GraphQL + Neo4j

API GraphQL para gestionar usuarios, películas y valoraciones usando Neo4j como base de datos. Desarrollada como prueba técnica con NestJS, GraphQL y Neo4j.

## 🚀 Tecnologías

- **Backend:** NestJS + GraphQL + Apollo Server
- **Base de datos:** Neo4j
- **Orquestación:** Docker + Docker Compose
- **Lenguaje:** TypeScript

## 📋 Prerrequisitos

- **Docker Desktop** instalado y ejecutándose
- **Node.js** 18+
- **npm** o **yarn**

## 🛠️ Instalación y Configuración

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

### 4. Construir y levantar servicios con Docker Compose

```bash
# Construir imagen del backend sin cache
docker compose build --no-cache backend

# Levantar todos los servicios
docker compose up -d
```

## 🌐 Acceso a la aplicación

Una vez que todos los servicios estén ejecutándose:

- **GraphQL Playground:** http://localhost:3000/graphql
- **Neo4j Browser:** http://localhost:7474
  - Usuario: `neo4j`
  - Contraseña: `test1234`

## 📊 Estructura del Proyecto

```
movie-rating/
├── apps/
│   ├── backend/          # API GraphQL (NestJS)
│   │   ├── src/
│   │   │   ├── core/     # Casos de uso y lógica de negocio
│   │   │   ├── infrastructure/ # Repositorios y entidades
│   │   │   ├── web/      # Resolvers GraphQL
│   │   │   └── modules/  # Módulos NestJS
│   │   └── Dockerfile
│   └── tests/            # Tests unitarios
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

- `users` - Lista todos los usuarios
- `user(id: String!)` - Detalles de un usuario
- `movies` - Lista todas las películas
- `movie(id: String!)` - Detalles de una película
- `ratingsByUser(userId: String!)` - Valoraciones de un usuario
- `ratingsForMovie(movieId: String!)` - Valoraciones de una película
- `averageRatingForMovie(movieId: String!)` - Promedio de valoraciones

### Mutations disponibles:

- `registerUser(input: CreateUserInput!)` - Registrar usuario
- `addMovie(input: CreateMovieInput!)` - Añadir película
- `rateMovie(userId: String!, movieId: String!, score: Float!, review: String)` - Valorar película

### Ejemplos de uso:

#### Crear un usuario:

```graphql
mutation {
  registerUser(input: { name: "Juan Pérez", email: "juan@example.com" }) {
    id
    name
    email
  }
}
```

#### Ver todas las películas:

```graphql
query {
  movies {
    id
    title
    releaseYear
    genres
  }
}
```

#### Valorar una película:

```graphql
mutation {
  rateMovie(userId: "1", movieId: "1", score: 5.0, review: "Excelente película") {
    id
    score
    review
    userId
    movieId
  }
}
```

#### Ver ratings de un usuario:

```graphql
query {
  ratingsByUser(userId: "1") {
    id
    score
    review
    userId
    movieId
  }
}
```

## 🧪 Testing

```bash
# Tests del backend
npm run test:backend
```

## 🐳 Comandos Docker útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Detener todos los servicios
docker compose down

# Reiniciar servicios
docker compose restart

# Ver estado de los servicios
docker compose ps
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

3. **Error de permisos de Docker:**

   ```bash
   sudo chown -R $USER:$USER .
   ```

4. **Limpiar Docker:**
   ```bash
   docker system prune -a
   docker volume prune
   ```

## 📦 Build

```bash
# Build del backend
npm run build:backend

# Build del frontend
npm run build:frontend
```

## 🏗️ Arquitectura

El proyecto sigue una arquitectura limpia con separación de responsabilidades:

- **Core:** Casos de uso y lógica de negocio
- **Infrastructure:** Repositorios, entidades y configuración de base de datos
- **Web:** Resolvers GraphQL y controladores
- **Modules:** Organización modular con NestJS

## 🎯 Funcionalidades implementadas

✅ **Gestión de usuarios** - CRUD completo  
✅ **Gestión de películas** - CRUD completo  
✅ **Sistema de valoraciones** - Crear y consultar ratings  
✅ **Relaciones en Neo4j** - Modelado correcto de relaciones  
✅ **API GraphQL** - Queries y mutations completas  
✅ **Tests unitarios** - Cobertura de funcionalidades  
✅ **Docker** - Containerización completa  
✅ **CI/CD** - GitHub Actions configurado  
✅ **Documentación** - README completo

---

**Jorge Aitor Tapia - API GraphQL con Neo4j**
