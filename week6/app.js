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

app.use('/thumbnails', express.static('thumbnails'));
app.use('/uploads', express.static('uploads'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.use(express.static('public'));

const routerAppFile = require('./routes/fileRoute.js')

const routerAppUser = require('./routes/userRoute.js')

const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute.js');

app.use(passport.initialize());
app.use('/auth', authRoute);

app.use('/user', passport.authenticate('jwt', {session: false}), routerAppUser);
app.use('/file', passport.authenticate('jwt', {session: false}), routerAppFile);

https.createServer(options, app).listen(8000);

console.log(`filesaveserver run at https://localhost:8000`)

