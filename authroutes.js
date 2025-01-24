const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstname, lastname, gender, dob, email, password, mobile } = req.body;

  if (!firstname || !lastname || !gender || !dob || !email || !password || !mobile) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      gender,
      dob,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
