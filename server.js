const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const pug = require('pug')

const app = express()

/* Templates */
const home = pug.compileFile(__dirname + '/src/templates/home.pug')
const faq = pug.compileFile(__dirname + '/src/templates/faq.pug')
const buy = pug.compileFile(__dirname + '/src/templates/buy.pug')
const guide = pug.compileFile(__dirname + '/src/templates/features.pug')
const trial = pug.compileFile(__dirname + '/src/templates/trial.pug')
const download = pug.compileFile(__dirname + '/src/templates/download.pug')
const releases = pug.compileFile(__dirname + '/src/templates/releases.pug')
const support = pug.compileFile(__dirname + '/src/templates/support.pug')

const affiliate = pug.compileFile(__dirname + '/src/templates/affiliate.pug')
const terms = pug.compileFile(__dirname + '/src/templates/terms.pug')
const privacyPolicy = pug.compileFile(__dirname + '/src/templates/privacy-policy.pug')


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

app.get('/guide', function(req, res, next) {
  res.send( guide({ title: 'UserGuide' }) )
})

app.get('/trial', function(req, res, next) {
  res.send( trial({ title: 'Trial' }) )
})

app.get('/download', function(req, res, next) {
  res.send( download({ title: 'Download' }) )
})

app.get('/releases', function(req, res, next) {
  res.send( releases({ title: 'Releases' }) )
})

app.get('/support', function(req, res, next) {
  res.send( support({ title: 'Support' }) )
})



app.get('/affiliate', function(req, res, next) {
  res.send( affiliate({ title: 'Affiliate' }) )
})
app.get('/terms', function(req, res, next) {
  res.send( terms({ title: 'Terms&Conditions' }) )
})
app.get('/privacy-policy', function(req, res, next) {
  res.send( privacyPolicy({ title: 'PrivacyPolicy' }) )
})


app.listen(process.env.PORT || 3001, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3001))
})
