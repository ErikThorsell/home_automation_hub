const Pool = require('pg').Pool
const config = require('./config')

const pool = new Pool(config.credentials)

const getLatestMinute = (request, response) => {
  pool.query('WITH t AS (SELECT * FROM air_q_bedroom ORDER BY ts DESC LIMIT 60) SELECT * FROM t ORDER BY ts ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNLatestMinutes = (request, response) => {
  const N = parseInt(request.params.N) * 60
  pool.query('WITH t AS (SELECT * FROM air_q_bedroom ORDER BY ts DESC LIMIT $1) SELECT * FROM t ORDER BY ts ASC', [N], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLatestHour = (request, response) => {
  pool.query('SELECT t.id, t.ts, t.co2, t.voc FROM (SELECT *, row_number() OVER(ORDER BY id DESC) as row FROM air_q_bedroom LIMIT 3600) t WHERE t.row % 60 = 0 ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNLatestHours = (request, response) => {
  const N = parseInt(request.params.N) * 3600
  pool.query('SELECT t.id, t.ts, t.co2, t.voc FROM (SELECT *, row_number() OVER(ORDER BY id DESC) as row FROM air_q_bedroom LIMIT $1) t WHERE t.row % 60 = 0 ORDER BY id ASC', [N], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLatestDay = (request, response) => {
  pool.query('SELECT t.id, t.ts, t.co2, t.voc FROM (SELECT *, row_number() OVER(ORDER BY id DESC) as row FROM air_q_bedroom LIMIT 84600) t WHERE t.row % 1800 = 0 ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNLatestDays = (request, response) => {
  const N = parseInt(request.params.N) * 86400
  pool.query('SELECT t.id, t.ts, t.co2, t.voc FROM (SELECT *, row_number() OVER(ORDER BY id DESC) as row FROM air_q_bedroom LIMIT $1) t WHERE t.row % 1800 = 0 ORDER BY id ASC', [N], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getLatestMinute,
  getNLatestMinutes,
  getLatestHour,
  getNLatestHours,
  getLatestDay,
  getNLatestDays,
}

