const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log()
})
'use strict';
app.use(express.static('public'));
app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
});

console.log(`server run at http://localhost:3000`)
