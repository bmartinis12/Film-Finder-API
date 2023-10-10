const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Users } = require('../models/user.model')

// Register user controller 

const registerUser = async (req, res) => {
 try {
    let { username, email, password } = req.body;
    email = email.toLowerCase();
    username = username.toLowerCase();

    if(!username || !email || !password ){
        res.status(400).json({ error: 'All feilds must be filled out'});
    }

    const emailAvailable = await Users.findOne({ email });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Users({
        username,
        email,
        password: passwordHash
    });

    const savedUser = await newUser.save();
    if(savedUser) {
        res.status(201).json(savedUser.username);
    }
 } catch (err) {
    res.status(500).json({ error: err.message });
 }
}

// Login user

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        if(!email || !password){
            res.status(400).json({ error: 'All feilds must be filled out'})
        }

        const user = await Users.findOne({ email });
        if(!user) {
            res.status(400).json({ error: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid password.'});

        const token = jwt.sign({ id: user._id }, process.env.ACCESSTOKEN);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { registerUser, loginUser };