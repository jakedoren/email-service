const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;

require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./router/email'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})  