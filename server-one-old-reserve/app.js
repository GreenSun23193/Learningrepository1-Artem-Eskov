'use strict';
//import cats from './models/catModel.js';

const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//require('dotenv').config()
//console.log(process.env)

/*app.get('/', (req, res) => {
  res.send('Hello World! A')
})*/
/*
app.listen(port, () => {
  console.log()
})

app.use(express.static('public'));
app.use(express.static('uploads'));
app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
})

app.get('/cat', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
})

app.post('/cat', (req, res) => {
  res.send('With this endpoint you can add cats.')
})

app.put('/cat', (req, res) => {
  res.send('With this endpoint you can edit cats.')
})

app.delete('/cat', (req, res) => {
  res.send('With this endpoint you can delete cats.')
})

//const catModel = require('../models/catModel.js');
//const catModel = require('C:/Users/Artem/wop-assignments/server-one/catModel.js');
//const catModel = require('..wop-assignments/server-one/catModel.js');
//const catModel = require('.wop-assignments/server-one/catModel.js');
const catModel = require('./models/catModel.js');


const cats = catModel.cats;

app.get('/cat/:id', (req, res) => {
  res.send("You requested a cat whose id is " + req.params.id)
})

//app.get('http://localhost:3000/cat/3', (req, res) => {
//  res.send("You requested a cat whose id is 3")
//})*/

app.set('view engine', 'pug')

app.use(express.static('public'));
app.use(express.static('uploads'));

const router2 = require('./routes/catRoute.js')

const router4 = require('./routes/userRoute.js')

app.use('/', router2)

app.use('/', router4)

app.listen(port, () => {
  console.log()
})

console.log(`catserver run at http://localhost:3000`)

