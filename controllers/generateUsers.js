import faker from 'faker';

const numUsers = 20;
let sqlStatements = [];

for (let i = 0; i < numUsers; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const registrationDate = faker.date.recent(30).toISOString().split('T')[0];

    const sql = `INSERT INTO t_Bruker (Brukernavn, Epost, Registreringsdato) VALUES ('${username}', '${email}', '${registrationDate}');`;
    sqlStatements.push(sql);
}

console.log('\n📜 SQL INSERT Statements for t_Bruker:\n');
console.log(sqlStatements.join('\n'));
