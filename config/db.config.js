
const mongoose = require('mongoose');

const url = process.env.URL;

const connect = async () => {

    try {
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.once('open', ()=>{
            console.log("Connection established");
        })
        
    } catch (error) {
        console.log(error);
    }   
    

}    

module.exports = {connect};