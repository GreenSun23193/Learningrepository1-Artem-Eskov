'use strict';

const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

const https = require('https');
const http = require('http');
const fs = require('fs');
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')
const options = {
  key: sslkey,
  cert: sslcert
};

http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
  res.end();
}).listen(3000);

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.use(express.static('public'));
app.use(express.static('uploads'));

const routerAppCat = require('./routes/catRoute.js')

const routerAppUser = require('./routes/userRoute.js')

const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute.js');

routerAppCat.route('/')
  .get((req, res) => {
    res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
  });

app.use(passport.initialize());
app.use('/auth', authRoute);

app.use('/user', passport.authenticate('jwt', {session: false}), routerAppUser);
app.use('/cat', passport.authenticate('jwt', {session: false}), routerAppCat);

/*app.listen(port, () => {
  console.log()
})*/
https.createServer(options, app).listen(8000);

console.log(`catserver run at https://localhost:8000`)

