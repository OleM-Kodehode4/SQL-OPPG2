import sql from "mssql";
import "dotenv/config";

// Konfigurer tilkoblingen til MSSQL-databasen
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Bruk kryptering for tilkoblingen, påkrevd for Azure
    trustServerCertificate: true, // For å tillate selvsignerte sertifikater
  },
};

// Koble til MSSQL-databasen
sql
  .connect(config)
  .then(() => {
    console.log("Koblet til MSSQL-databasen");

    // Sett inn data i t_Film-tabellen
    const film = {
      Tittel: "Inception",
      Utgivelsesår: 2010,
      Sjanger: "Sci-Fi",
      Regissør: "Christopher Nolan",
      Varighet: 148,
      IMDbScore: 8.8,
      FullTittel: "Inception (2010)",
    };

    const queryFilm = `
            INSERT INTO t_Film (Tittel, Utgivelsesår, Sjanger, Regissør, Varighet, IMDbScore, FullTittel)
            VALUES (@Tittel, @Utgivelsesår, @Sjanger, @Regissør, @Varighet, @IMDbScore, @FullTittel)
        `;

    return sql.query`INSERT INTO t_Film (Tittel, Utgivelsesår, Sjanger, Regissør, Varighet, IMDbScore, FullTittel)
                         VALUES (${film.Tittel}, ${film.Utgivelsesår}, ${film.Sjanger}, ${film.Regissør}, 
                                 ${film.Varighet}, ${film.IMDbScore}, ${film.FullTittel})`;
  })
  .then(() => {
    // Sett inn data i t_Skuespiller-tabellen
    const skuespiller = {
      Navn: "Leonardo DiCaprio",
      Fødselsår: 1974,
      Nasjonalitet: "USA",
    };

    const querySkuespiller = `
            INSERT INTO t_Skuespiller (Navn, Fødselsår, Nasjonalitet)
            VALUES (@Navn, @Fødselsår, @Nasjonalitet)
        `;

    return sql.query`INSERT INTO t_Skuespiller (Navn, Fødselsår, Nasjonalitet)
                         VALUES (${skuespiller.Navn}, ${skuespiller.Fødselsår}, ${skuespiller.Nasjonalitet})`;
  })
  .then(() => {
    // Sett inn data i t_Bruker-tabellen
    const bruker = {
      Brukernavn: "john_doe",
      Epost: "john.doe@example.com",
      Registreringsdato: "2025-03-09",
    };

    const queryBruker = `
            INSERT INTO t_Bruker (Brukernavn, Epost, Registreringsdato)
            VALUES (@Brukernavn, @Epost, @Registreringsdato)
        `;

    return sql.query`INSERT INTO t_Bruker (Brukernavn, Epost, Registreringsdato)
                         VALUES (${bruker.Brukernavn}, ${bruker.Epost}, ${bruker.Registreringsdato})`;
  })
  .then(() => {
    // Sett inn data i t_Anmeldelse-tabellen
    const anmeldelse = {
      BrukerID: 1, // ID for bruker som skriver anmeldelsen
      FilmID: 1, // ID for filmen som anmeldelsen gjelder
      Rating: 9.0,
      Kommentar: "Fantastisk film!",
      Anmeldelsesdato: "2025-03-09",
    };

    const queryAnmeldelse = `
            INSERT INTO t_Anmeldelse (BrukerID, FilmID, Rating, Kommentar, Anmeldelsesdato)
            VALUES (@BrukerID, @FilmID, @Rating, @Kommentar, @Anmeldelsesdato)
        `;

    return sql.query`INSERT INTO t_Anmeldelse (BrukerID, FilmID, Rating, Kommentar, Anmeldelsesdato)
                         VALUES (${anmeldelse.BrukerID}, ${anmeldelse.FilmID}, ${anmeldelse.Rating}, 
                                 ${anmeldelse.Kommentar}, ${anmeldelse.Anmeldelsesdato})`;
  })
  .then(() => {
    console.log("Data satt inn i databasen!");
    sql.close();
  })
  .catch((err) => {
    console.error("Feil ved tilkobling eller innsetting:", err);
    sql.close();
  });
