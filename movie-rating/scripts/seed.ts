import neo4j from 'neo4j-driver';

// Configuración de conexión a Neo4j (según la prueba técnica)
const NEO4J_URI = 'bolt://localhost:7687';
const NEO4J_USER = 'neo4j';
const NEO4J_PASSWORD = 'test1234';

async function seedDatabase() {
  const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  const session = driver.session();

  try {
    console.log('Iniciando carga de datos iniciales con Cypher...');
    console.log('Según requerimientos de la prueba técnica');

    // Limpiar base de datos
    console.log('Limpiando base de datos...');
    await session.run('MATCH (n) DETACH DELETE n');
    console.log('Base de datos limpiada');

    // Crear usuarios (según entidad User de la prueba)
    console.log('Creando usuarios...');
    const usersCypher = `
      CREATE (u1:User {id: '1', name: 'Juan Pérez', email: 'juan@example.com'})
      CREATE (u2:User {id: '2', name: 'María García', email: 'maria@example.com'})
      CREATE (u3:User {id: '3', name: 'Carlos López', email: 'carlos@example.com'})
      CREATE (u4:User {id: '4', name: 'Ana Martínez', email: 'ana@example.com'})
      CREATE (u5:User {id: '5', name: 'Luis Rodríguez', email: 'luis@example.com'})
    `;
    await session.run(usersCypher);
    console.log('5 usuarios creados');

    // Crear películas (según entidad Movie de la prueba)
    console.log('Creando películas...');
    const moviesCypher = `
      CREATE (m1:Movie {id: '1', title: 'El Padrino', releaseYear: 1972, genres: ['Drama', 'Crimen']})
      CREATE (m2:Movie {id: '2', title: 'Pulp Fiction', releaseYear: 1994, genres: ['Crimen', 'Drama']})
      CREATE (m3:Movie {id: '3', title: 'Forrest Gump', releaseYear: 1994, genres: ['Drama', 'Comedia']})
      CREATE (m4:Movie {id: '4', title: 'Matrix', releaseYear: 1999, genres: ['Ciencia Ficción', 'Acción']})
      CREATE (m5:Movie {id: '5', title: 'Titanic', releaseYear: 1997, genres: ['Romance', 'Drama']})
      CREATE (m6:Movie {id: '6', title: 'El Rey León', releaseYear: 1994, genres: ['Animación', 'Aventura']})
      CREATE (m7:Movie {id: '7', title: 'Jurassic Park', releaseYear: 1993, genres: ['Aventura', 'Ciencia Ficción']})
      CREATE (m8:Movie {id: '8', title: 'La La Land', releaseYear: 2016, genres: ['Musical', 'Romance']})
    `;
    await session.run(moviesCypher);
    console.log('8 películas creadas');

        // Crear ratings (según entidad Rating de la prueba)
    console.log('Creando valoraciones...');

    // Array de ratings para crear
    const ratings = [
      { userId: '1', movieId: '1', id: '1', score: 5, review: 'Una obra maestra del cine' },
      { userId: '1', movieId: '2', id: '2', score: 4, review: 'Muy buena película' },
      { userId: '2', movieId: '1', id: '3', score: 5, review: 'Excelente' },
      { userId: '2', movieId: '3', id: '4', score: 4, review: 'Muy emotiva' },
      { userId: '3', movieId: '4', id: '5', score: 5, review: 'Revolucionaria' },
      { userId: '3', movieId: '5', id: '6', score: 3, review: 'Buena pero muy larga' },
      { userId: '4', movieId: '6', id: '7', score: 5, review: 'Clásico de la animación' },
      { userId: '4', movieId: '7', id: '8', score: 4, review: 'Espectacular' },
      { userId: '5', movieId: '8', id: '9', score: 4, review: 'Hermosa película' },
      { userId: '5', movieId: '2', id: '10', score: 5, review: 'Una de mis favoritas' },
      { userId: '1', movieId: '3', id: '11', score: 4, review: 'Muy buena historia' },
      { userId: '2', movieId: '4', id: '12', score: 5, review: 'Increíble' }
    ];

    // Crear cada rating individualmente
    for (const rating of ratings) {
      await session.run(`
        MATCH (u:User {id: $userId})
        MATCH (m:Movie {id: $movieId})
        CREATE (r:Rating {id: $id, score: $score, review: $review})
        CREATE (u)-[:RATED]->(r)
        CREATE (r)-[:RATES]->(m)
      `, rating);
    }

    console.log('12 valoraciones creadas');

    // Verificar datos creados
    console.log('\nVerificando datos creados...');

    const userCount = await session.run('MATCH (u:User) RETURN count(u) as count');
    const movieCount = await session.run('MATCH (m:Movie) RETURN count(m) as count');
    const ratingCount = await session.run('MATCH (r:Rating) RETURN count(r) as count');

    console.log(`Usuarios: ${userCount.records[0].get('count')}`);
    console.log(`Películas: ${movieCount.records[0].get('count')}`);
    console.log(`Valoraciones: ${ratingCount.records[0].get('count')}`);

    console.log('\n¡Script de seed ejecutado exitosamente!');
    console.log('\nAhora puedes arrancar el servidor:');
    console.log('   npm run start:backend');

  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    throw error;
  } finally {
    await session.close();
    await driver.close();
  }
}

// Función para verificar conexión
async function checkConnection() {
  const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  const session = driver.session();

  try {
    console.log('🔌 Verificando conexión a Neo4j...');
    const result = await session.run('RETURN 1 as test');
    console.log('✅ Conexión exitosa a Neo4j');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a Neo4j:', error.message);
    console.log('\n💡 Asegúrate de que Neo4j esté ejecutándose con:');
    console.log('docker run --name neo4j-test -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/test1234 -d neo4j:5');
    return false;
  } finally {
    await session.close();
    await driver.close();
  }
}

// Ejecutar script
async function main() {
  console.log('🎬 Script de Seed - Prueba Técnica GraphQL + Neo4j');
  console.log('==================================================');

  const isConnected = await checkConnection();
  if (isConnected) {
    await seedDatabase();
  } else {
    process.exit(1);
  }
}

main().catch(console.error);
