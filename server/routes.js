var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createConnection(config);

connection.connect(function(res, err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
  connection.end();
});

/*var connection = mysql.createPool(config);

var query = `
SELECT CITY
FROM AIRPORT
LIMIT 5
`

connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    console.log("HIASDOAOSDKOASKDKAOSDKOASKD");
    console.log(rows);
    res.json(rows);
  }
});*/

/*var connection = mysql.createPool({
  host     : "cis550example.cjzd6dnb6pnw.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "adminpassword",
  port     : "1521",
  database : "TESTDB"
});*/

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


function getCheapestFlightsOutOfCity(req, res) {
  // TODO: replace with real query
  /*var query = `
    WITH temp AS (
      SELECT movie_id, COUNT(genre) AS count
      FROM Genres
      WHERE genre IN (
        SELECT a.genre
        FROM Genres a JOIN Movies b
        ON a.movie_id = b.id
        WHERE b.title = 'Inception'
      )
      GROUP BY movie_id
    )
    SELECT b.title, a.movie_id AS id, b.rating, b.vote_count
    FROM temp a JOIN Movies b
    ON a.movie_id = b.id
    WHERE b.title != 'Inception' AND a.count >= (
      SELECT COUNT(*)
      FROM (
          SELECT 1 AS genre
          FROM Genres e JOIN Movies f
          ON e.movie_id = f.id
          WHERE f.title = 'Inception'
      ) c
    )
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 5
  `;*/
  var query = `
  SELECT CITY
  FROM AIRPORT
  LIMIT 5
  `
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
      connection.release();
    }
  });
};

function getCheapestAirbnbs(req, res) {
  // TODO: replace with real query
  var query = `
    SELECT b.title, b.rating, b.vote_count
    FROM Genres a JOIN Movies b ON a.movie_id = b.id
    WHERE a.genre = 'Comedy'
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getVacationRecs(req, res) {
  // TODO: replace with real query
  var query = `
    SELECT b.title, b.rating, b.vote_count
    FROM Genres a JOIN Movies b ON a.movie_id = b.id
    WHERE a.genre = 'Comedy'
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getCheapestFlightsToCity(req, res) {
  // TODO: replace with real query
  var query = `
    SELECT b.title, b.rating, b.vote_count
    FROM Genres a JOIN Movies b ON a.movie_id = b.id
    WHERE a.genre = 'Comedy'
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre
    FROM Genres
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var query = `
    SELECT b.title, b.rating, b.vote_count
    FROM Genres a JOIN Movies b ON a.movie_id = b.id
    WHERE a.genre = '${req.params.genre}'
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var query = `
    WITH temp AS (
      SELECT movie_id, COUNT(genre) AS count
      FROM Genres
      WHERE genre IN (
        SELECT a.genre
        FROM Genres a JOIN Movies b
        ON a.movie_id = b.id
        WHERE b.title = '${req.params.movieName}'
      )
      GROUP BY movie_id
    )
    SELECT b.title, a.movie_id AS id, b.rating, b.vote_count
    FROM temp a JOIN Movies b
    ON a.movie_id = b.id
    WHERE b.title != '${req.params.movieName}' AND a.count >= (
      SELECT COUNT(*)
      FROM (
          SELECT 1 AS genre
          FROM Genres e JOIN Movies f
          ON e.movie_id = f.id
          WHERE f.title = '${req.params.movieName}'
      ) c
    )
    ORDER BY b.rating DESC, b.vote_count DESC
    LIMIT 5
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
}

  // SELECT *
  // FROM(
  //   SELECT a.genre, AVG(b.rating) AS avg_rating
  //   FROM (
  //     SELECT id, rating
  //     FROM Movies
  //     WHERE FLOOR(release_year/10)*10) = ${req.params.decade}
  //   ) b RIGHT OUTER JOIN Genres a
  //   ON a.movie_id = b.id
  //   GROUP BY a.genre
  // )
  // ORDER BY avg_rating DESC, genre



/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var decade = Number(req.params.decade);
  console.log(decade);
  var query = `
  SELECT *
  FROM (
    SELECT b.genre, COALESCE(AVG(a.rating), 0) AS avg_rating
    FROM (
      SELECT id, rating
      FROM Movies
      WHERE release_year >= ${decade} AND release_year < ${decade + 10}
    ) a RIGHT OUTER JOIN Genres b
    ON a.id = b.movie_id
    GROUP BY b.genre
  ) temp
  ORDER BY avg_rating DESC, genre
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getVacationRecs: getVacationRecs,
  getCheapestAirbnbs: getCheapestAirbnbs,
  getCheapestFlightsOutOfCity: getCheapestFlightsOutOfCity,
  getCheapestFlightsToCity: getCheapestFlightsToCity,
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}
