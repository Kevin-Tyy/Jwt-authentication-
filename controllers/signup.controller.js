const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.Schema")


const registerUser = async (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  
const user = await userSchema.findOne({email : email})
if(user) {
  res.status(200).send({ msg : "Email already used"})
  

}else{
  const user = await userSchema.findOne({username : username});
  if(user) {
    res.status(200).send({ msg : "Username not available" });
  }
  else{
    const newUser = new userSchema({
      username : username,
      email : email,
      password : password
    })
    newUser.save().then((data , err) =>{
      if(err){
        res.status(422).send({ msg : err.message });
      }
      else{
        res.status(422).send({ msg: "User created successfully", data: data });
        
      }
    })

  }
}



}




module.exports = {
  registerUser,
  
};


