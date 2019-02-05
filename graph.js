const plotly = require('plotly')

function draw(raw_data) {
  const data = [
    {
      x: raw_data.map(r => r.ts.toString()),
      y: raw_data.map(r => r.co2),
      type: "scatter",
    }
  ]
  var graphOptions = {filename: "basicline", fileopt: "overwrite"}
  return plotly.plot(data, graphOptions, function(err, msg) {
    console.log(msg)
  })
}

module.exports = {draw}
