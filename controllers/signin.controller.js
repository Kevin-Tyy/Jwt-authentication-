const userSchema = require('../models/user.Schema');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');

const loginUser =  async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user  = await userSchema.findOne({ username: username });
    if(user){
        const hash_password = user.password;
        const isPasswordValid = bcrypt.compare(password, hash_password)

        if(isPasswordValid){
        
            jwt.sign(req.body, process.env.secret_key, {expiresIn: '1h'}, (err, token)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(token);
                    return res.status(200).send({ msg :`Password Correct... you are logged in and have access to home page and your token is:    ${token}` }).setHeader('Authorization' , 'Bearer '+ token);
                    
                }
            })
        }
        else{
            return res.status(200).send({ msg : "Incorrect password"});
        
        
        }
         
    }
    else{
        res.status(404).send({ msg : 'User not found'})
    }

}
module.exports = {
    loginUser
}

