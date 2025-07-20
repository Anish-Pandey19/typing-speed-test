// server.js
// server.js
// const express = require('express')
// const cors = require('cors')
// const path = require('path')
// const app = express()

// app.use(cors())           // Enable CORS
// app.use(express.static(path.resolve(__dirname))) // Serve files

// const PORT = 8000
// app.listen(PORT, () => {
//   console.log(`Serving on http://localhost:${PORT}`)
// })
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(cors())

// Serve MP3 files statically
app.use(express.static(path.resolve(__dirname)))

// Generate index dynamically at "/"
app.get('/', (req, res) => {
  const dir = path.resolve(__dirname)
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).send('Error reading directory')
    let links = files
      .filter(f => f.endsWith('.mp3'))
      .map(f => `<a href="${encodeURIComponent(f)}">${f}</a><br>`)
      .join('')
    res.send(`<!DOCTYPE html><html><body>${links}</body></html>`)
  })
})

const PORT = 8000
app.listen(PORT, () => {
  console.log(`Serving on http://localhost:${PORT}`)
})
