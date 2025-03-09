import fetch from 'node-fetch';
import 'dotenv/config';

const API_KEY = process.env.OMDB_API_KEY; // Henter API-nøkkel fra .env

const movieTitles = [
    'Inception', 'The Dark Knight', 'Interstellar', 'Forrest Gump', 'Pulp Fiction',
    'The Shawshank Redemption', 'Fight Club', 'The Matrix', 'Goodfellas', 'The Godfather'
];

async function fetchActors(title) {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'False') return [];

        return data.Actors.split(', ').map(actor => actor.replace(/'/g, "''"));
    } catch (error) {
        console.error(`Feil ved henting av skuespillere for ${title}:`, error);
        return [];
    }
}

async function generateSQL() {
    let sqlStatements = new Set();

    for (const title of movieTitles) {
        const actors = await fetchActors(title);
        actors.forEach(actor => {
            sqlStatements.add(`INSERT INTO t_Skuespiller (Navn) VALUES ('${actor}');`);
        });
    }

    console.log('\n📜 SQL INSERT Statements for t_Skuespiller:\n');
    console.log([...sqlStatements].join('\n'));
}

generateSQL();
