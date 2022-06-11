const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const returnSignupPage = (req, res) => {
  res.render("signup");
};

const returnLoginPage = (req, res) => {
  res.render("login");
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = new Users({ email, password });
  try {
    //generate salt for the password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // create token
    const token = jwt.sign({ id: user._id }, "mern-secret", {
      expiresIn: 24 * 60 * 69,
    });

    // res.setHeader('setHeader','jwt', token)

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 60 * 1000,
    });
    // res.({id : user._id})
    res.redirect("/burgers");
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = new Users({ email, password });
  try {
    const userEmail = await Users.findOne({ email: email });
    console.log(userEmail);
    if(userEmail){
        // console.log("done")
        const passComp = await bcrypt.compare(password, user.password )
        console.log(passComp)
        //         if (passComp){
//             res.send("Auth Successful")
//             console.log(passComp)
        }
//         else{
//             res.send("Wrong username or password.");
//             console.error(passComp)
//         }
    
  } catch (error) {
    console.log(error);
  }
};

const logOutUser = (req, res) => {
  //code for logout
};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logOutUser,
}
