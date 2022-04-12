import express from 'express';
const app = express();
import logger from 'morgan';
import {  sequelizeEcommerce } from "./sequelize";
import cors from 'cors'
import bodyParser from 'body-parser'

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const routes = require(__dirname + "/routes")
app.use(routes)

  // sequelizeEcommerce
  // .authenticate()
  // .then(() => {
  //   console.log("Connection has been established successfully database sql server Sql Ecommerce");
  // })
  // .catch(err => {
  //   console.error("Unable to connect to the database: Ecommerce", err);
  // });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
