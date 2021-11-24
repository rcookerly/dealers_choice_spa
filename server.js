const express = require('express');
const path = require('path');
const db = require('./db');

const { syncAndSeed, models: { Movie, Detail } } = db;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/movies', async(req, res, next) => {
  try {
    res.send(await Movie.findAll())
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/movies/:movieId/details', async(req, res, next) => {
  try {
    res.send(await Detail.findAll({where: {movieId: req.params.movieId}}));
  }
  catch(ex) {
    next(ex);
  }
});

const start = async() => {
  try {
    await syncAndSeed();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
  catch(ex) {
    console.log(ex);
    next(ex);
  }
};

start();
