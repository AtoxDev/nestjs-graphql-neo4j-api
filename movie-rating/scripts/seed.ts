import { Neo4jService } from '../apps/backend/src/infrastructure/database/neo4j.config';

const neo4jService = new Neo4jService();

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando carga de datos de ejemplo...');

    // Limpiar base de datos
    await neo4jService.run('MATCH (n) DETACH DELETE n');
    console.log('✅ Base de datos limpiada');

    // Crear usuarios
    const users = [
      { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
      { id: '2', name: 'María García', email: 'maria@example.com' },
      { id: '3', name: 'Carlos López', email: 'carlos@example.com' },
      { id: '4', name: 'Ana Martínez', email: 'ana@example.com' },
      { id: '5', name: 'Luis Rodríguez', email: 'luis@example.com' },
    ];

    for (const user of users) {
      await neo4jService.run(
        'CREATE (u:User {id: $id, name: $name, email: $email})',
        user
      );
    }
    console.log('✅ Usuarios creados');

    // Crear películas
    const movies = [
      { id: '1', title: 'El Padrino', genre: 'Drama', releaseYear: 1972 },
      { id: '2', title: 'Pulp Fiction', genre: 'Crimen', releaseYear: 1994 },
      { id: '3', title: 'Forrest Gump', genre: 'Drama', releaseYear: 1994 },
      { id: '4', title: 'Matrix', genre: 'Ciencia Ficción', releaseYear: 1999 },
      { id: '5', title: 'Titanic', genre: 'Romance', releaseYear: 1997 },
      { id: '6', title: 'El Rey León', genre: 'Animación', releaseYear: 1994 },
      { id: '7', title: 'Jurassic Park', genre: 'Aventura', releaseYear: 1993 },
      { id: '8', title: 'La La Land', genre: 'Musical', releaseYear: 2016 },
    ];

    for (const movie of movies) {
      await neo4jService.run(
        'CREATE (m:Movie {id: $id, title: $title, genre: $genre, releaseYear: $releaseYear})',
        movie
      );
    }
    console.log('✅ Películas creadas');

    // Crear ratings
    const ratings = [
      { id: '1', userId: '1', movieId: '1', score: 5, review: 'Una obra maestra del cine' },
      { id: '2', userId: '1', movieId: '2', score: 4, review: 'Muy buena película' },
      { id: '3', userId: '2', movieId: '1', score: 5, review: 'Excelente' },
      { id: '4', userId: '2', movieId: '3', score: 4, review: 'Muy emotiva' },
      { id: '5', userId: '3', movieId: '4', score: 5, review: 'Revolucionaria' },
      { id: '6', userId: '3', movieId: '5', score: 3, review: 'Buena pero muy larga' },
      { id: '7', userId: '4', movieId: '6', score: 5, review: 'Clásico de la animación' },
      { id: '8', userId: '4', movieId: '7', score: 4, review: 'Espectacular' },
      { id: '9', userId: '5', movieId: '8', score: 4, review: 'Hermosa película' },
      { id: '10', userId: '5', movieId: '2', score: 5, review: 'Una de mis favoritas' },
      { id: '11', userId: '1', movieId: '3', score: 4, review: 'Muy buena historia' },
      { id: '12', userId: '2', movieId: '4', score: 5, review: 'Increíble' },
    ];

    for (const rating of ratings) {
      await neo4jService.run(
        `MATCH (u:User {id: $userId})
         MATCH (m:Movie {id: $movieId})
         CREATE (r:Rating {id: $id, score: $score, review: $review})
         CREATE (u)-[:RATED]->(r)
         CREATE (r)-[:RATES]->(m)`,
        rating
      );
    }
    console.log('✅ Ratings creados');

    console.log('🎉 ¡Base de datos poblada exitosamente!');
    console.log('\n📊 Resumen de datos creados:');
    console.log(`- ${users.length} usuarios`);
    console.log(`- ${movies.length} películas`);
    console.log(`- ${ratings.length} ratings`);

  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    await neo4jService.close();
  }
}

seedDatabase();
