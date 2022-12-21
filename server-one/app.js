'use strict';
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! A')
})

app.listen(port, () => {
  console.log()
})

app.use(express.static('public'));
app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});

app.set('view engine', 'pug')

app.get('/qqq', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
})

console.log(`server run at http://localhost:3000`)
