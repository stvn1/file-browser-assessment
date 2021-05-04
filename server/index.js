const express = require("express");
const cors = require('cors')

const PORT = process.env.PORT || 3001;


var router = require('./routes/index.js')

const app = express();
app.use(cors())


app.use('/',router)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});