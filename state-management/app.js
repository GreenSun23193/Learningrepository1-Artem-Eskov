'use strict';
const express = require('express');
const app = express();
const port = 3000;

const username = 'foo';
const password = 'bar';

const pug = require('pug');

var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.use(express.static('public'));
app.use(express.static('uploads'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  console.log(req.params);
  res.cookie('color', req.params.clr, { secure: true });
  res.json({message: "cookie set"});
});

app.get('/getCookie', (req, res) => {
  console.log("Cookies that have not been signed");
  console.log(req.cookies);
  res.json({message: "cookie gotten", cookievalue: req.cookies});
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color')
  res.json({message: "cookie deleted"});
});

var session = require('express-session')

app.use(session({ secret: 'secretkey1', cookie: { secure: true }}))

app.get('/form', function(req, res, next) {
  res.setHeader('Content-Type', 'text/html')
  res.render("form");
})

app.get('/secret', function(req, res, next) {
  if (req.logged==false){
    res.redirect('/form')
  }
  res.setHeader('Content-Type', 'text/html')
  res.render("secret");
})

app.post('/login', function(req, res, next) {
  console.log("req")
  console.log(req.body);
  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

  console.log("req.body.username: " + req.body.username)
  console.log("username: " + username)

  console.log("req.body.password: " + req.body.password)
  console.log("password: " + password)

  if (req.body.username == username && req.body.password == password) {
    var logged =  true;
    res.redirect('/secret')
  }
  else {
    var logged = false;
    res.redirect('/form')
  }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
