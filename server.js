const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const pug = require('pug')

const app = express()

/* Templates */
const home = pug.compileFile(__dirname + '/src/templates/home.pug')
const faq = pug.compileFile(__dirname + '/src/templates/faq.pug')
const buy = pug.compileFile(__dirname + '/src/templates/buy.pug')
const features = pug.compileFile(__dirname + '/src/templates/features.pug')
const trial = pug.compileFile(__dirname + '/src/templates/trial.pug')
const download = pug.compileFile(__dirname + '/src/templates/download.pug')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/static'))


/* Routes */
app.get('/', function(req, res, next) {
  res.send( home({ title: 'Home' }) )
})

app.get('/faq', function(req, res, next) {
  res.send( faq({ title: 'FAQ' }) )
})

app.get('/buy', function(req, res, next) {
  res.send( buy({ title: 'Buy' }) )
})

app.get('/features', function(req, res, next) {
  res.send( features({ title: 'Features' }) )
})

app.get('/trial', function(req, res, next) {
  res.send( trial({ title: 'Trial' }) )
})

app.get('/download', function(req, res, next) {
  res.send( download({ title: 'Download' }) )
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
