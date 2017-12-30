const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const pug = require('pug')

const app = express()

/* Templates */
const home = pug.compileFile(__dirname + '/src/templates/home.pug')
const faq = pug.compileFile(__dirname + '/src/templates/faq.pug')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/static'))


/* Routes */
app.get('/', function(req, res, next) {
  res.send( home({ title: 'Home' }) )
})

app.get('/faq', function(req, res, next) {
  res.send( services({ title: 'FAQ' }) )
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
