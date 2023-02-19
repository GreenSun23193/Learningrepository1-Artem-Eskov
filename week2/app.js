'use strict';

const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
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

/*app.get('/', (req, res) => {
  res.render('index.pug', { title: 'Title', heading: 'Click on the cat', name: 'Name', age: 'Age: 7', weight: 'Weight 5kg' })
});*/

app.use(passport.initialize());
app.use('/auth', authRoute);

//app.use('/', routerAppCat)

// app.use('/', routerAppUser)

//app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), routerAppUser);
app.use('/cat', passport.authenticate('jwt', {session: false}), routerAppCat);

app.listen(port, () => {
  console.log()
})

console.log(`catserver run at http://localhost:3000`)

