import 'dotenv/config';
import fetch from 'node-fetch';

const API_KEY = process.env.OMDB_API_KEY;

const movieTitles = [
    'Inception', 'The Dark Knight', 'Interstellar', 'Forrest Gump', 'Pulp Fiction',
    'The Shawshank Redemption', 'Fight Club', 'The Matrix', 'Goodfellas', 'The Godfather',
    'Gladiator', 'The Green Mile', 'The Silence of the Lambs', 'Saving Private Ryan',
    'Schindler' + 's List', 'Braveheart', 'Avatar', 'Titanic', 'Django Unchained',
    'The Departed', 'Whiplash', 'Parasite', 'Joker', '12 Angry Men',
    'The Prestige', 'The Lion King', 'The Grand Budapest Hotel', 'La La Land', 'Casino Royale'
];

async function fetchMovieData(title) {
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'False') {
            console.log(`❌ Film ikke funnet: ${title}`);
            return null;
        }

        return {
            title: data.Title.replace(/'/g, "''"),
            year: data.Year,
            genre: data.Genre,
            director: data.Director.replace(/'/g, "''"),
            duration: data.Runtime.replace(' min', ''),
            imdbScore: data.imdbRating !== 'N/A' ? data.imdbRating : 'NULL'
        };
    } catch (error) {
        console.error(`Feil ved henting av ${title}:`, error);
        return null;
    }
}

async function generateSQL() {
    let sqlStatements = [];
    
    for (const title of movieTitles) {
        const movie = await fetchMovieData(title);
        if (movie) {
            const sql = `INSERT INTO t_Film (Tittel, Utgivelsesår, Sjanger, Regissør, Varighet, IMDbScore)
                         VALUES ('${movie.title}', ${movie.year}, '${movie.genre}', '${movie.director}', ${movie.duration}, ${movie.imdbScore});`;
            sqlStatements.push(sql);
        }
    }

    console.log('\n📜 SQL INSERT Statements for t_Film:\n');
    console.log(sqlStatements.join('\n'));
}

generateSQL();
