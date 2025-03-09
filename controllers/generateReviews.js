import faker from 'faker';

const numReviews = 50;
const movieIds = Array.from({ length: 30 }, (_, i) => i + 1);
const userIds = Array.from({ length: 20 }, (_, i) => i + 1);
let sqlStatements = [];

for (let i = 0; i < numReviews; i++) {
    const movieId = faker.random.arrayElement(movieIds);
    const userId = faker.random.arrayElement(userIds);
    const rating = faker.datatype.float({ min: 1, max: 10, precision: 0.1 });
    const comment = faker.lorem.sentence();

    const sql = `INSERT INTO t_Anmeldelse (FilmID, BrukerID, Rating, Kommentar) 
                 VALUES (${movieId}, ${userId}, ${rating}, '${comment}');`;
    sqlStatements.push(sql);
}

console.log('\n📜 SQL INSERT Statements for t_Anmeldelse:\n');
console.log(sqlStatements.join('\n'));
