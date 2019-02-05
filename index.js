const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 8000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/getLatestMinute', db.getLatestMinute)
app.get('/getNLatestMinutes/:N', db.getNLatestMinutes)
app.get('/getLatestHour', db.getLatestHour)
app.get('/getNLatestHours/:N', db.getNLatestHours)
app.get('/getLatestDay', db.getLatestDay)
app.get('/getNLatestDays/:N', db.getNLatestDays)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

