const port = process.env.PORT || 3000;
const express = require('express');
const getContent = require('./middlewares/getContentMiddleware');
const gamesRoute = require('./routes/gamesRoute');
const oddsRoute = require('./routes/oddsRoute');
const predictors = require('./config/predictors');

const app = express();

app.get('/games', getContent('http://www.madeinfoot.com/live/match-en-direct.php'), gamesRoute);
// ex date: 2018-02-01
app.get('/games/:date', getContent('http://www.madeinfoot.com/live/match-en-direct.php?date_match={date}'), gamesRoute);
app.get('/odds', getContent('http://www.zulubet.com/'), oddsRoute);
// ex date: 01-02-2018
app.get('/odds/:date', getContent('http://www.zulubet.com/tips-{date}.html'), oddsRoute);

predictors.map(predictor => app.get(predictor.url, getContent(predictor.content), predictor.route));

app.listen(port, () => {
  console.log('Server listen on :', port);
});
