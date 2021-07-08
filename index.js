const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config()

app.use(express.json())
app.use('/', require('./router/email'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})  