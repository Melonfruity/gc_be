const express = require("express");
const cors = require("cors");
const http = require('http');
const PORT = 8000;

const { info, errm } = require('./utils/logger');

const {
  requestLogger,
  unknownEndpoint,
	errorHandler,
	queryParser,
} = require('./utils/middleware');

const app = express()
const server = http.Server(app);

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);
// app.use(queryParser);

const rootRouter = require("./controllers/root");
app.use('/', rootRouter)

app.use(unknownEndpoint);
app.use(errorHandler);

server.listen(PORT, () => {

})