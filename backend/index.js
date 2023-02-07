const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors') //CORS is some policy which will throw error so we added to prevent


connectToMongo();
const app = express()
const port = 5500 


app.use(cors())
app.use(express.json())

app.get('/api/addnotes', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })

//Available Routes
app.use('/api/auth', require('./routes/auth')) //We could have written app.get for each req res but to make it structured we used app.use and used router.get in router 
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
    console.log(`iNotes Backend app listening on port http://localhost:${port}`)
})

