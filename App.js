const express = require('express');
const dotenv = require('dotenv');
const app = express();


dotenv.config();





  
const routes = require('./routes/user.route');

const db = require('./config/db.config');
db.connect()
const PORT = process.env.PORT


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', routes);



app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});