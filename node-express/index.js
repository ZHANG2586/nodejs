// 使用express
const express = require('express'),
  http = require('http'),
  hostname = 'localhost',
  port = 3000,
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  app = express(),
  router = express.Router(),
  dishRouter = require('./routes/dishRouter'),
  promotion = require('./routes/promotion')

router.use('/bar', function (req, res) { // 匹配 /foo/bar
  res.send('/bar')
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/dishes', dishRouter)
app.use('/promotion', promotion)
app.use('/foo', router)


// app.all('/dishes', (req, res, next) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   next()
// })

// app.get('/dishes', (req, res, next) => {
//   res.end('will send all the dishes to you!')
// })

// app.post('/dishes', (req, res, next) => {
//   res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description)
// })

// app.put('/dishes', (req, res, next) => {
//   res.statusCode = 403
//   res.end('PUT operateion not supported on /dishes')
// })

// app.delete('/dishes', (req, res, next) => {
//   res.end('delete all the dishes')
// })

// app.get('/dishes/:dishId', (req, res, next) => {
//   res.end('will send details of the dish:' + req.params.dishId + ' to you!')
// })

// app.post('/dishes/:dishId', (req, res, next) => {
//   res.statusCode = 403
//   res.end(`Post operation not supported on /dishes/ ${req.params.dishId}`)
// })

// app.put('/dishes/:dishId', (req, res, next) => {
//   res.write(`Updating the dish: ${req.params.dishId}`)
//   res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`)
// })

// app.delete('/dishes/:dishId', (req, res, next) => {
//   res.end('/dishes/:dishId ' + req.body.dishId)
// })

app.use(express.static(__dirname+'/public'))

app.use((req, res, next) => {
  console.log(req.headers)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})

const server = http.createServer(app)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})