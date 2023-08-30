const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  let { username, email, password } = req.body;
  username = username.trim();
  email = email.trim();
  password = password.trim();

  if (username === "" || email === "" || password === "") {
    res.json({
      status: "FAILED",
      message: "Empty Input Field",
    });
  } else if (!/^[a-zA-Z\s]*$/.test(username)) {
    res.json({
      status: "FAILED",
      message: "Invalid Username Entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid Email Entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too Short",
    });
  } else {
    User.findOne({ email }) // Use findOne instead of findOne to get a single document
      .then((result) => {
        if (result) {
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists",
          });
        } else {
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                username,
                email,
                password: hashedPassword,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup Successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An Error Occurred while saving user password",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An Error Occurred while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An Error occurred while checking for existing user",
        });
      });
  }
});

router.post("/signin", (req, res) => {
  let { email, password } = req.body; // Remove username
  email = email.trim();
  password = password.trim();

  if (email === "" || password === "") {
    // Use strict equality (===)
    res.json({
      status: "FAILED",
      message: "Empty Credentials Supplied",
    });
  } else {
    User.findOne({ email }) // Use findOne instead of findOne
      .then((data) => {
        if (!data) {
          res.json({
            status: "FAILED",
            message: "Invalid Credentials Entered",
          });
        } else {
          const hashedPassword = data.password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                res.json({
                  status: "SUCCESS",
                  message: "Signin Successful", // Fixed typo
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid Password Entered",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An Error Occurred while comparing passwords",
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An Error Occurred while checking for existing user",
        });
      });
  }
});

module.exports = router;
