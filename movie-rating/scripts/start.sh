#!/bin/bash

echo "🎬 Iniciando API GraphQL con Neo4j - Prueba Técnica"
echo "=================================================="

# Verificar si Docker está ejecutándose
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está ejecutándose. Por favor, inicia Docker y vuelve a intentar."
    exit 1
fi

# Verificar si Neo4j ya está ejecutándose
if docker ps | grep -q "neo4j-test"; then
    echo "✅ Neo4j ya está ejecutándose"
else
    echo "🐳 Iniciando Neo4j con Docker..."
    docker run --name neo4j-test -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/test1234 -d neo4j:5

    if [ $? -eq 0 ]; then
        echo "✅ Neo4j iniciado correctamente"
        echo "⏳ Esperando 10 segundos para que Neo4j esté listo..."
        sleep 10
    else
        echo "❌ Error al iniciar Neo4j"
        exit 1
    fi
fi

# Verificar conexión a Neo4j
echo "🔌 Verificando conexión a Neo4j..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:7474 > /dev/null; then
        echo "✅ Neo4j está listo"
        break
    fi

    echo "⏳ Intento $attempt/$max_attempts - Esperando que Neo4j esté listo..."
    sleep 2
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ Neo4j no respondió después de $max_attempts intentos"
    exit 1
fi

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "✅ Dependencias instaladas"

# Ejecutar script de seed (ANTES de arrancar el servidor)
echo "🌱 Ejecutando script de seed..."
npm run seed

if [ $? -eq 0 ]; then
    echo "✅ Datos iniciales cargados correctamente"
else
    echo "❌ Error al cargar datos iniciales"
    exit 1
fi

echo ""
echo "🎉 ¡Todo listo!"
echo "=================================================="
echo "📊 Neo4j Browser: http://localhost:7474"
echo "   Usuario: neo4j"
echo "   Contraseña: test1234"
echo ""
echo "🚀 Para iniciar el servidor GraphQL:"
echo "   npm run start:backend"
echo ""
echo "🔍 Para probar las consultas GraphQL:"
echo "   - movies: lista todas las películas"
echo "   - movie(id: \"1\"): detalles de El Padrino"
echo "   - users: lista todos los usuarios"
echo "   - user(id: \"1\"): detalles de Juan Pérez"
echo "   - ratingsByUser(userId: \"1\"): valoraciones de Juan Pérez"
echo "   - ratingsForMovie(movieId: \"1\"): valoraciones de El Padrino"
echo "   - averageRatingForMovie(movieId: \"1\"): nota media de El Padrino"
echo ""
echo "✨ ¿Quieres iniciar el servidor ahora? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🚀 Iniciando servidor GraphQL..."
    npm run start:backend
else
    echo "👋 ¡Hasta luego! Puedes iniciar el servidor cuando quieras con 'npm run start:backend'"
fi
