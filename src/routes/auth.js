const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    //Validate data before make a user
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send({error: error.details[0].message});

    //Checking if the user already exist
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send({ error: 'Email already exists:' });

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

//Login
router.post('/login', async (req, res) => {

    //Validate data
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message });

    //Checking if the user already exist
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send({ error: 'Email or password is wrong' });

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({ error: 'Invalid password' });

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ token: token, user: user._id, name: user.name });

});

module.exports = router;
