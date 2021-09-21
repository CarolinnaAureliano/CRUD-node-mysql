var createError = require('http-errors');
var express = require('express');
var path = require('path');

const port = 4001;

var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var produtosRouter = require('./routes/produtos');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//cookies/login 
// app.use(session({ 
//   cookie: { maxAge: 60000 },
//   store: new session.MemoryStore,
//   saveUninitialized: true,
//   resave: 'true',
//   secret: 'secret'
// }))

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtosRouter);

  // set locals, only providing error in development 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

//delete 
app.get("/deletarProduto/:id", (req, res, next) => {
  var query = "DELETE FROM produtos WHERE id = '" + id + "'";
con.query(query, function (err, result) {
  if (err) throw err;
  console.log("Excluido onde id:" + id);
});
  res.redirect("/index");
});

var usersRouter = require('./routes/produtos');
;
app.use('/produtos', usersRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`server at ${port}!`)
});