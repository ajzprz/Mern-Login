const User = require("../models/User");
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
  const user = new User({ email, password });
  try {
    //generate salt for the password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // create token
    const token = jwt.sign({ id: user._id }, "mern-secret", { expiresIn: 24 * 60 * 60 });

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
  const user = new User({ email, password });
  console.log(email, password);
  try {
    let compEmail = await User.find({ email: email }, async (err, user) => {
      if (err) {
        console.err("user not found")
      }
      if (!user[0]) {
        console.log("user not found")
      }
      else {
        const compPassword = await bcrypt.compare(password, user[0].password)
        if (compPassword) {
          console.log("Paasowrd Match")
          const token = jwt.sign({ id: user._id }, "mern-secret", {
            expiresIn: 24 * 60 * 69,
          });

          // res.setHeader('setHeader','jwt', token)

          res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 60 * 1000,
          });
          // res.({id : user._id})
          res.json(user);
        }
        else {
          res.send("incorrect email or password")
        }
      }
    })
  } catch (error) {
    console.log("Email or password incorrect")
  }
}

const logOutUser = (req, res) => {
  //code for logout
  try {
    const token = jwt.sign({id: " "}, "mern-secret", { expiresIn: 1 });
    res.cookie("jwt", token,{
      maxAge: 1
    })
    res.redirect("/");
  } catch (error) {
    console.log(error)
  }

};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logOutUser,
};
