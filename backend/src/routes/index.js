const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const { email, password, nombre, apepat, apemat } = req.body;
    const newUser = new User({email, password, nombre, apepat, apemat});
    await newUser.save();
		const token = await jwt.sign(
      {
        _id: newUser._id, 
        nombre: newUser.nombre, 
        apepat: newUser.apepat, 
        apemat: newUser.apemat 
      }, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\'t exists');

    const equals = bcrypt.compareSync( password, user.password );
    if (!equals) return res.status(401).send('Wrong Password');
    // if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign(
      {
        _id: user._id, 
        nombre: user.nombre, 
        apepat: user.apepat, 
        apemat: user.apemat 
      }, 'secretkey');

    return res.status(200).json({token});
});

module.exports = router;
