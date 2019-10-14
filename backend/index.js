require('./db/mongoose')

const express = require('express')
const bodyParser = require('body-parser')

const emailRouter = require('./routers/emailNotification')

const cors = require('./middleware/cors')

const PORT = process.env.PORT || 3001
const app = express()

app.use(bodyParser.json())
app.use(cors)
app.use(emailRouter)

app.listen(PORT, () => {
    console.log('Backend server up and running')
})