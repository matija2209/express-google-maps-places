const express = require('express')
const https = require('https')
const http = require('http');
const fs = require('fs')
const google_maps = require('./routes/google_maps')
const dotenv = require('dotenv');
dotenv.config();

// use middleware
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{  
  res.send("<h1>Hello</h1>")
})

app.use('/api/google_maps',google_maps)


const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
})

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});